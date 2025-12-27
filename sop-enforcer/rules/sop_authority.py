"""
SOP Authority Rule - Enforces 208-SOP-SESSION-DOCUMENTATION-AUTHORITY

Blocks unauthorized documentation writes based on session type and file pattern.
"""

from pathlib import Path
from typing import Dict, List, Optional
import json
import os


class SOPAuthorityRule:
    """Enforce documentation authority per 208-SOP."""

    def __init__(self):
        self.name = "sop_authority"
        self.version = "1.0.0"
        self.severity = "CRITICAL"

        # Authority matrix from 208-SOP
        self.authority_matrix = {
            "strategos-session": {
                "CLAUDE.md": True,
                "specs/core/*.md": True,
                "specs/*.md": True,
                "docs/*.md": True,
                ".claude-notes.md": True,
                "proposals/*.md": True,
                "content/drafts/*.md": True
            },
            "feature-dev": {
                "CLAUDE.md": False,
                "specs/core/*.md": False,
                "specs/*.md": "PROPOSE",  # Can draft, requires review
                "docs/*.md": "DRAFT",     # Can draft, requires approval
                ".claude-notes.md": True,
                "proposals/*.md": True,
                "content/drafts/*.md": True
            },
            "code-reviewer": {
                "CLAUDE.md": False,
                "specs/core/*.md": False,
                "specs/*.md": False,
                "docs/*.md": False,
                ".claude-notes.md": True,
                "proposals/*.md": "DRAFT",
                "content/drafts/*.md": True
            },
            "prb-member": {
                "CLAUDE.md": False,
                "specs/core/*.md": False,
                "specs/*.md": False,
                "docs/*.md": False,
                ".claude-notes.md": True,
                "proposals/*.md": True,
                "content/drafts/*.md": False
            }
        }

    def get_session_type(self) -> str:
        """Identify current session type from agent card."""
        try:
            # Check for session card in today's sessions
            sessions_dir = Path.home() / ".claude" / "agent-cards" / "sessions"
            if sessions_dir.exists():
                today = Path.home() / ".claude" / "agent-cards" / "sessions"
                session_files = sorted(today.glob("*.json"), reverse=True)

                if session_files:
                    with open(session_files[0]) as f:
                        data = json.load(f)
                        return data.get("session_metadata", {}).get("parent_agent", "strategos-session")

            # Default to strategos-session
            return "strategos-session"
        except Exception:
            return "strategos-session"

    def matches_pattern(self, file_path: str, pattern: str) -> bool:
        """Check if file path matches authority pattern."""
        from fnmatch import fnmatch
        return fnmatch(file_path, pattern)

    def get_file_authority(self, file_path: str, session_type: str) -> Optional[str]:
        """Get authority level for file (True|False|PROPOSE|DRAFT)."""
        if session_type not in self.authority_matrix:
            # Unknown session type - block by default
            return False

        authority = self.authority_matrix[session_type]

        for pattern, level in authority.items():
            if self.matches_pattern(file_path, pattern):
                return level

        # No matching pattern - block by default
        return False

    def check(self, context: Dict) -> Dict:
        """
        Check if write operation is authorized.

        Called by cc-auditor before Write tool execution.

        Returns:
            {
                "allowed": bool,
                "violation": Optional[Dict],
                "message": str
            }
        """
        tool_name = context.get("tool_name", "")

        # Only check Write operations
        if tool_name != "Write":
            return {"allowed": True, "message": "Not a write operation"}

        file_path = context.get("parameters", {}).get("file_path", "")

        if not file_path:
            return {"allowed": True, "message": "No file path specified"}

        # Get relative path from repo root
        try:
            if file_path.startswith("/"):
                cwd = Path.cwd()
                file_path = str(Path(file_path).relative_to(cwd))
        except ValueError:
            pass  # Not relative to cwd, use as-is

        # Determine session type
        session_type = self.get_session_type()

        # Check authority
        authority = self.get_file_authority(file_path, session_type)

        if authority is True:
            # Full authority
            return {"allowed": True, "message": f"Authorized: {session_type} has full authority for {file_path}"}

        elif authority == "PROPOSE":
            # Can draft in proposals/ or drafts/
            if "proposals/" in file_path or "content/drafts/" in file_path:
                return {"allowed": True, "message": f"Drafting allowed: {file_path}"}
            else:
                return {
                    "allowed": False,
                    "violation": {
                        "code": "B-008",
                        "category": "B",
                        "message": f"Unauthorized modification: {session_type} can propose changes, not modify directly",
                        "file": file_path,
                        "session_type": session_type,
                        "remediation": f"Move to proposals/ or content/drafts/ directory"
                    },
                    "message": f"❌ BLOCKED: {session_type} must propose changes in proposals/ directory"
                }

        elif authority == "DRAFT":
            # Can draft only
            if "content/drafts/" in file_path:
                return {"allowed": True, "message": f"Drafting allowed: {file_path}"}
            else:
                return {
                    "allowed": False,
                    "violation": {
                        "code": "B-008",
                        "category": "B",
                        "message": f"Unauthorized modification: {session_type} can draft only",
                        "file": file_path,
                        "session_type": session_type,
                        "remediation": f"Move to content/drafts/ directory"
                    },
                    "message": f"❌ BLOCKED: {session_type} must draft in content/drafts/ directory"
                }

        else:  # False or None
            # No authority
            return {
                "allowed": False,
                "violation": {
                    "code": "A-008",
                    "category": "A",
                    "message": f"Rogue documentation creation: {session_type} has no authority for {file_path}",
                    "file": file_path,
                    "session_type": session_type,
                    "remediation": "Requires user directive or strategos-session authorization"
                },
                "message": f"❌ BLOCKED: {session_type} has no authority to modify {file_path}\n" +
                          f"Reference: 208-SOP-SESSION-DOCUMENTATION-AUTHORITY"
            }


# cc-auditor hook registration
def register_rule():
    """Register this rule with cc-auditor."""
    return SOPAuthorityRule()


# For testing
if __name__ == "__main__":
    rule = SOPAuthorityRule()

    # Test cases
    test_cases = [
        {
            "tool_name": "Write",
            "parameters": {"file_path": "CLAUDE.md"},
            "session_type": "strategos-session"
        },
        {
            "tool_name": "Write",
            "parameters": {"file_path": "CLAUDE.md"},
            "session_type": "feature-dev"
        },
        {
            "tool_name": "Write",
            "parameters": {"file_path": "specs/core/999-SOP-NEW.md"},
            "session_type": "code-reviewer"
        },
        {
            "tool_name": "Write",
            "parameters": {"file_path": ".claude-notes.md"},
            "session_type": "code-reviewer"
        }
    ]

    for test in test_cases:
        result = rule.check(test)
        print(f"\n{'='*60}")
        print(f"Session: {test.get('session_type', 'unknown')}")
        print(f"File: {test['parameters']['file_path']}")
        print(f"Allowed: {result['allowed']}")
        print(f"Message: {result['message']}")
        if "violation" in result:
            print(f"Violation: {result['violation']['code']} - {result['violation']['message']}")
