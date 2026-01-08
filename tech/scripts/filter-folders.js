import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the original folder icons
import folderIcons from '../folders/folder-icons-from-html.js';

// Filter out records where icon contains 'file'
const folderIconsOnlyFolders = folderIcons.filter(icon => !icon.icon.includes('file'));

// Prepare the content for the output file
const content = `// Auto-generated folder icons from HTML
// Total folder icons found: ${folderIcons.length}
// Total folder icons converted: ${folderIconsOnlyFolders.length}

const folderIconsOnlyFolders = ${JSON.stringify(folderIconsOnlyFolders, null, 2)};
export default folderIconsOnlyFolders;
`;

// Write to the output file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, '../folders/folder-icons-from-html-only-folders.js');
fs.writeFileSync(outputPath, content, 'utf8');

console.log(`Filtered ${folderIconsOnlyFolders.length} folder icons out of ${folderIcons.length} total icons.`);
