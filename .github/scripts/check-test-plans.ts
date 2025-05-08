import * as fs from 'fs';
import * as path from 'path';

// Define paths for test plans
const filesToCheck: Record<string, string> = {
  "Edge Case Tests (`test-plan/edge-cases.md`)": "test-plan/edge-cases.md",
  "Counter Scenario Tests (`test-plan/counter-tests.md`)": "test-plan/counter-tests.md",
};

// Build the checkbox section
let checks = Object.entries(filesToCheck)
  .map(([label, filePath]) => {
    const exists = fs.existsSync(path.resolve(filePath));
    return `- [${exists ? 'x' : ' '}] ${label}`;
  })
  .join('\n');

// Define README path
const readmePath = path.resolve('README.md');
let readmeContent = fs.readFileSync(readmePath, 'utf-8');

// Markers in README
const markerStart = '<!-- TEST-PLAN-CHECKS-START -->';
const markerEnd = '<!-- TEST-PLAN-CHECKS-END -->';
const sectionRegex = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, 'm');
const newSection = `${markerStart}\n${checks}\n${markerEnd}`;

// Replace or insert the section
if (sectionRegex.test(readmeContent)) {
  readmeContent = readmeContent.replace(sectionRegex, newSection);
} else {
  readmeContent += `\n\n${newSection}`;
}

fs.writeFileSync(readmePath, readmeContent, 'utf-8');
console.log('✅ README.md has been updated with test plan checkmarks.');
