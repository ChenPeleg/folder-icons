// convert-html-folders.script.js
// A small Node.js script that converts folder icon HTML fragments
// (from tech/folders/folder-icons-as-html-from-site.html) into a
// JavaScript array of objects saved to tech/folders/folder-icons-from-html.js
//
// This script is written as an ES Module and is written to be clear and robust. It performs the following
// steps inside HtmlFolderConverter class methods:
//  - readFirstLines: read the first N lines (used for quick preview)
//  - readFile: read the entire source HTML file
//  - parseFolderItems: extract folder icon entries and convert them into objects
//  - formatOutput: format the folderIcons array as requested (one-line objects, blank line between)
//  - writeOutput: write the resulting JS file
//  - run: orchestrates the above and reports counts

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

class HtmlFolderConverter {
  constructor(options = {}) {
    this.srcPath = options.srcPath || path.join('tech', 'folders', 'folder-icons-as-html-from-site.html');
    this.outPath = options.outPath || path.join('tech', 'folders', 'folder-icons-from-html.js');
    this.previewLines = options.previewLines || 40;
  }

  // Read the first N lines of the source file (preview step)
  async readFirstLines() {
    try {
      const content = await fs.readFile(this.srcPath, 'utf8');
      const lines = content.split(/\r?\n/).slice(0, this.previewLines);
      return lines.join('\n');
    } catch (err) {
      throw new Error(`Failed to read first lines of ${this.srcPath}: ${err.message}`);
    }
  }

  // Read the full file content
  async readFile() {
    try {
      return await fs.readFile(this.srcPath, 'utf8');
    } catch (err) {
      throw new Error(`Failed to read file ${this.srcPath}: ${err.message}`);
    }
  }

  // Unescape some HTML entities commonly used in attributes
  unescapeAttr(str) {
    if (!str) return str;
    return str.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<');
  }

  // Parse folder icon entries from the HTML content
  // Returns { found: number, converted: number, items: Array }
  parseFolderItems(content) {
    const items = [];
    let found = 0;
    let converted = 0;

    // We'll iterate over opening <div ...> tags and look for those
    // with class containing "icon-item" and data-category="folders"
    const openTagRegex = /<div\b([^>]*?)>/g;
    let match;
    while ((match = openTagRegex.exec(content)) !== null) {
      const attrs = match[1];
      if (!/class=(['\"])?.*?icon-item.*?\1/.test(attrs)) continue;
      if (!/data-category=(['\"])folders\1/.test(attrs)) continue;

      found += 1;

      // Extract data-association attribute if present
      const assocMatch = attrs.match(/data-association=(['\"])([\s\S]*?)\1/);
      let assocRaw = assocMatch ? assocMatch[2] : null;
      if (assocRaw === 'null' || assocRaw === null) {
        // No association JSON available. Attempt to build a minimal object
        const nameMatch = attrs.match(/data-name=(['\"])(.*?)\1/);
        const name = nameMatch ? this.unescapeAttr(nameMatch[2]) : null;

        // Try to find a nearby img tag (search a short window after the opening tag)
        const snippet = content.substr(match.index, 400);
        const imgMatch = snippet.match(/<(?:img|svg)[^>]*?(?:data-src|src)=(['\"])(.*?)\1/);
        const icon = imgMatch ? this.unescapeAttr(imgMatch[2]) : null;

        const obj = {
          name: name || null,
          iconColor: null,
          priority: null,
          pattern: null,
          folderNames: null,
          icon: icon,
          type: null,
        };
        items.push(obj);
        // we count this as converted to include it in output, but it's minimal
        converted += 1;
        continue;
      }

      // Unescape and parse the JSON inside data-association
      try {
        const assocJsonText = this.unescapeAttr(assocRaw);
        const assoc = JSON.parse(assocJsonText);

        // Normalize keys: folder icons may use folderNames or folderName; we pick folderNames if present
        const obj = {
          name: assoc.name ?? null,
          iconColor: assoc.iconColor ?? null,
          priority: assoc.priority ?? null,
          pattern: assoc.pattern ?? null,
          folderNames: assoc.folderNames ?? assoc.folderNames ?? null,
          icon: assoc.icon ?? null,
          type: assoc.type ?? null,
        };

        items.push(obj);
        converted += 1;
      } catch (err) {
        // If parsing fails, include a placeholder entry with raw association for debugging
        const raw = this.unescapeAttr(assocRaw);
        items.push({ name: null, iconColor: null, priority: null, pattern: null, folderNames: null, icon: null, type: null, _assocRaw: raw });
      }
    }

    return { found, converted, items };
  }

  // Format the output file contents following the rules:
  // - const folderIcons = [
  // - each object on a single line
  // - a blank line between objects
  // - trailing comment with counts
  formatOutput(items, counts) {
    const lines = [];
    lines.push('// Auto-generated folder icons from HTML');
    lines.push('// Total folder icons found: ' + counts.found);
    lines.push('// Total folder icons converted: ' + counts.converted);
    lines.push('');
    lines.push('const folderIcons = [');

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      // Build one-line object representation. Use JSON.stringify for values but keep keys unquoted.
      const parts = [];
      const add = (k, v) => {
        if (v === null || v === undefined) {
          parts.push(`${k}: null`);
        } else if (typeof v === 'number' || typeof v === 'boolean') {
          parts.push(`${k}: ${v}`);
        } else {
          // escape backslashes and double quotes in string values
          const s = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          parts.push(`${k}: "${s}"`);
        }
      };

      add('name', it.name ?? null);
      add('iconColor', it.iconColor ?? null);
      add('priority', it.priority ?? null);
      add('pattern', it.pattern ?? null);
      add('folderNames', it.folderNames ?? null);
      add('icon', it.icon ?? null);
      add('type', it.type ?? null);

      const objLine = '  { ' + parts.join(', ') + ' },';
      lines.push(objLine);
      // add a blank line between objects
      lines.push('');
    }

    lines.push('];');
    lines.push('');
    lines.push('export default folderIcons;');

    return lines.join('\n');
  }

  async writeOutput(content) {
    try {
      // Ensure output directory exists
      await fs.mkdir(path.dirname(this.outPath), { recursive: true });
      await fs.writeFile(this.outPath, content, 'utf8');
    } catch (err) {
      throw new Error(`Failed to write output to ${this.outPath}: ${err.message}`);
    }
  }

  async run() {
    try {
      console.log('Reading first', this.previewLines, 'lines of source file for preview...');
      const preview = await this.readFirstLines();
      // Optionally log preview to help debugging; commented out to keep terminal clean
      // console.log(preview);

      const full = await this.readFile();
      const { found, converted, items } = this.parseFolderItems(full);

      const outContent = this.formatOutput(items, { found, converted });
      await this.writeOutput(outContent);

      console.log(`Done. Found ${found} folder icon entries, converted ${converted} items.`);
      console.log(`Output written to ${this.outPath}`);
    } catch (err) {
      console.error('Error:', err.message);
      process.exitCode = 1;
    }
  }
}

// If this file is invoked directly, run the conversion
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const conv = new HtmlFolderConverter({
    srcPath: path.join('tech', 'folders', 'folder-icons-as-html-from-site.html'),
    outPath: path.join('tech', 'folders', 'folder-icons-from-html.js'),
    previewLines: 40,
  });
  conv.run();
}

export default HtmlFolderConverter;
