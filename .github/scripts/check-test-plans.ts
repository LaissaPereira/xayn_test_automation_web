import * as fs from 'fs';
import * as path from 'path';

// Define paths for test plans
const filesToCheck: Record<string, string> = {
  "Edge Case Tests (`test-plan/edge-cases.md`)": "test-plan/edge-cases.md",
  "Counter Scenario Tests (`test-plan/counter-tests.md`)": "test-plan/counter-tests.md",
};

// Initialize the check results
let checks = "";

// Check if the test plan files exist and prepare the checkboxes
for (const [label, filePath] of Object.entries(filesToCheck)) {
  const fullPath = path.resolve(filePath);
  const exists = fs.existsSync(fullPath);
  checks += `- [${exists ? "x" : " "}] ${label}\n`;
}

// Path to README
const readmePath = 'README.md';

// Read the README file content
let readmeContent = fs.readFileSync(readmePath, 'utf-8');

// Markers in README where the checklist will be inserted
const markerStart = "<!-- TEST-PLAN-CHECKS-START -->";
const markerEnd = "<!-- TEST-PLAN-CHECKS-END -->";

// Create the new section to insert
const newSection = `${markerStart}\n${checks}${markerEnd}`;

// Regular expression to match the section if it already exists
const regex = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, 'm');

// Replace or append the section
if (readmeContent.match(regex)) {
  // If the section already exists, replace it
  readmeContent = readmeContent.replace(regex, newSection);
} else {
  // If it doesn't exist, append the new section
  readmeContent += `\n\n${newSection}`;
}

// Write the updated README back to the file
fs.writeFileSync(readmePath, readmeContent);

console.log('README.md has been updated with the test plan checkmarks.');
