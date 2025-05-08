const fs = require('fs');
const path = require('path');

const cypressOutputPath = path.join(__dirname, 'cypress_output.txt');
const readmePath = path.join(__dirname, 'README.md');

// Read the Cypress output file
const cypressOutput = fs.readFileSync(cypressOutputPath, 'utf-8');

// Regex to extract summary numbers (adjust if needed)
const summaryRegex = /(\d+)\s+tests?\s+passed.*?(\d+)\s+failed.*?(\d+)\s+skipped.*?(\d+)\s+total/i;
const match = cypressOutput.match(summaryRegex);

let summary = 'No Cypress test results found.';

if (match) {
  const [, passed, failed, skipped, total] = match;
  summary = `
### Cypress Test Summary

- **Total Tests**: ${total}
- **Passed**: ${passed}
- **Failed**: ${failed}
- **Skipped**: ${skipped}
  `.trim();
}

// Read the README file
let readmeContent = fs.readFileSync(readmePath, 'utf-8');

// Markers for updating test result section
const markerStart = '<!-- TEST-RESULT-START -->';
const markerEnd = '<!-- TEST-RESULT-END -->';

const newSection = `${markerStart}\n${summary}\n${markerEnd}`;
const regex = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, 'm');

if (regex.test(readmeContent)) {
  readmeContent = readmeContent.replace(regex, newSection);
} else {
  readmeContent += `\n\n${newSection}`;
}

fs.writeFileSync(readmePath, readmeContent, 'utf-8');
console.log('✅ README.md updated with Cypress test results.');
