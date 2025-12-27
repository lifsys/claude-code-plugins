"""
Summary Proliferation Rule - Blocks summary files outside .claude-notes.md

Enforces Rule 1 from 208-SOP: Session summaries ONLY in .claude-notes.md
"""

import re
from pathlib import Path
from typing import Dict


class SummaryProliferationRule:
    """Block summary file creation outside .claude-notes.md."""

    def __init__(self):
        self.name = "summary_proliferation"
        self.version = "1.0.0"
        self.severity = "CRITICAL"

        # Patterns that indicate summary files
        self.summary_patterns = [
            r".*[Ss]ummary.*\.md$",
            r".*[Ss]ummary.*\.txt$",
            r"^summaries/",
            r".*session.*summary.*",
            r".*SUMMARY\.",
            r".*summary-.*"
        ]

    def is_summary_file(self, file_path: str) -> bool:
        """Check if file path matches summary patterns."""
        for pattern in self.summary_patterns:
            if re.match(pattern, file_path):
                return True
        return False

    def check(self, context: Dict) -> Dict:
        """
        Check if write operation is creating a summary file.

        Returns:
            {
                "allowed": bool,
                "violation": Optional[Dict],
                "message": str
            }
        """
        tool_name = context.get("tool_name", "")

        if tool_name != "Write":
            return {"allowed": True, "message": "Not a write operation"}

        file_path = context.get("parameters", {}).get("file_path", "")

        if not file_path:
            return {"allowed": True, "message": "No file path specified"}

        # Get relative path
        try:
            if file_path.startswith("/"):
                cwd = Path.cwd()
                file_path = str(Path(file_path).relative_to(cwd))
        except ValueError:
            pass

        # Allow .claude-notes.md explicitly
        if file_path.endswith(".claude-notes.md") or file_path == ".claude-notes.md":
            return {"allowed": True, "message": "Session journal allowed"}

        # Check if file is a summary file
        if self.is_summary_file(file_path):
            return {
                "allowed": False,
                "violation": {
                    "code": "A-009",
                    "category": "A",
                    "message": f"Summary file proliferation: {file_path}",
                    "file": file_path,
                    "remediation": "Write session summaries to .claude-notes.md only"
                },
                "message": f"❌ BLOCKED: Summary files not allowed outside .claude-notes.md\n" +
                          f"File: {file_path}\n" +
                          f"Rule: 208-SOP Rule 1 (Session Journal Only)\n" +
                          f"Action: Write your summary to .claude-notes.md instead"
            }

        return {"allowed": True, "message": "Not a summary file"}


def register_rule():
    """Register this rule with cc-auditor."""
    return SummaryProliferationRule()


if __name__ == "__main__":
    rule = SummaryProliferationRule()

    test_cases = [
        {"tool_name": "Write", "parameters": {"file_path": ".claude-notes.md"}},
        {"tool_name": "Write", "parameters": {"file_path": "session-summary.md"}},
        {"tool_name": "Write", "parameters": {"file_path": "SUMMARY.md"}},
        {"tool_name": "Write", "parameters": {"file_path": "summaries/2025-11-05.md"}},
        {"tool_name": "Write", "parameters": {"file_path": "README.md"}},
    ]

    for test in test_cases:
        result = rule.check(test)
        print(f"\n{'='*60}")
        print(f"File: {test['parameters']['file_path']}")
        print(f"Allowed: {result['allowed']}")
        print(f"Message: {result['message']}")
