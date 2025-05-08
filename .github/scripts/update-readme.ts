import * as fs from 'fs';
import * as path from 'path';

// Path to the Cypress output (cypress_output.txt)
const cypressOutputPath = 'cypress_output.txt';

// Read the Cypress output file
const cypressOutput = fs.readFileSync(cypressOutputPath, 'utf-8');

// Extract relevant data (using a regular expression for simple summary extraction)
const summaryRegex = /(\d+) tests? passed.*?(\d+) failed.*?(\d+) skipped.*?(\d+) total/i;
const match = cypressOutput.match(summaryRegex);

let summary = 'No Cypress test results found.';

if (match) {
  const [_, passed, failed, skipped, total] = match;
  summary = `
### Cypress Test Summary

- **Total Tests**: ${total}
- **Passed**: ${passed}
- **Failed**: ${failed}
- **Skipped**: ${skipped}
  `;
}

// Path to README.md
const readmePath = 'README.md';

// Read the README file content
let readmeContent = fs.readFileSync(readmePath, 'utf-8');

// Markers for inserting the Cypress test summary
const markerStart = "<!-- TEST-RESULT-START -->";
const markerEnd = "<!-- TEST-RESULT-END -->";

// Create the new section for the test summary
const newSection = `${markerStart}\n${summary}${markerEnd}`;

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

console.log('README.md has been updated with the Cypress test results.');
