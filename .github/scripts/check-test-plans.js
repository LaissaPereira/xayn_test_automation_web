const fs = require("fs");

const filesToCheck = {
  "Edge Case Tests (`test-plan/edge-cases.md`)": "test-plan/edge-cases.md",
  "Counter Scenario Tests (`test-plan/counter-tests.md`)": "test-plan/counter-tests.md",
};

let checks = "";

for (const [label, path] of Object.entries(filesToCheck)) {
  const exists = fs.existsSync(path);
  checks += `- [${exists ? "x" : " "}] ${label}\n`;
}

let readme = fs.readFileSync("README.md", "utf-8");

const markerStart = "<!-- TEST-PLAN-CHECKS-START -->";
const markerEnd = "<!-- TEST-PLAN-CHECKS-END -->";
const newSection = `${markerStart}\n${checks}${markerEnd}`;

const regex = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "m");
if (readme.match(regex)) {
  readme = readme.replace(regex, newSection);
} else {
  readme += `\n\n${newSection}`;
}

fs.writeFileSync("README.md", readme);
