// filter-only-folders.script.js
// A Node.js script that reads folder-icons-from-html.js and filters out
// all records that have "file" in their icon property path (e.g., "/icons/files/...")
// Only records with folder icons (e.g., "/icons/icons/folders/...") are kept.
//
// Output: tech/folders/folder-icons-from-html-only-folders.js

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

class FolderIconFilter {
  constructor(options = {}) {
    this.srcPath = options.srcPath || path.join('tech', 'folders', 'folder-icons-from-html.js');
    this.outPath = options.outPath || path.join('tech', 'folders', 'folder-icons-from-html-only-folders.js');
  }

  // Read and import the source file
  async readSourceFile() {
    try {
      const content = await fs.readFile(this.srcPath, 'utf8');
      return content;
    } catch (err) {
      throw new Error(`Failed to read file ${this.srcPath}: ${err.message}`);
    }
  }

  // Parse the JavaScript array from the source file content
  parseSourceArray(content) {
    try {
      // Extract the array content between "const folderIcons = [" and "];"
      const arrayMatch = content.match(/const\s+folderIcons\s*=\s*\[([\s\S]*?)\];/);
      if (!arrayMatch) {
        throw new Error('Could not find folderIcons array in source file');
      }

      const arrayContent = arrayMatch[1];
      const items = [];
      
      // Parse each object in the array
      // Match pattern: { name: "...", pattern: ..., folderNames: ..., icon: "...", type: ... },
      const objectRegex = /\{\s*name:\s*([^,]+),\s*pattern:\s*([^,]+),\s*folderNames:\s*([^,]+),\s*icon:\s*([^,]+),\s*type:\s*([^}]+)\s*\}/g;
      
      let match;
      while ((match = objectRegex.exec(arrayContent)) !== null) {
        const parseValue = (val) => {
          val = val.trim();
          if (val === 'null') return null;
          if (val.startsWith('"') && val.endsWith('"')) {
            return val.slice(1, -1); // Remove quotes
          }
          return val;
        };

        const obj = {
          name: parseValue(match[1]),
          pattern: parseValue(match[2]),
          folderNames: parseValue(match[3]),
          icon: parseValue(match[4]),
          type: parseValue(match[5]),
        };
        
        items.push(obj);
      }

      return items;
    } catch (err) {
      throw new Error(`Failed to parse source array: ${err.message}`);
    }
  }

  // Filter items to keep only folder icons (exclude file icons)
  filterFolderIcons(items) {
    const filtered = items.filter(item => {
      // Exclude items with icon paths containing "/icons/files/"
      if (item.icon && typeof item.icon === 'string' && item.icon.includes('/icons/files/')) {
        return false;
      }
      // Keep everything else (including null icons, or icons with "/icons/icons/folders/")
      return true;
    });

    return {
      total: items.length,
      filtered: filtered.length,
      excluded: items.length - filtered.length,
      items: filtered
    };
  }

  // Format the output file contents
  formatOutput(items, stats) {
    const lines = [];
    lines.push('// Auto-generated folder icons (filtered - folders only)');
    lines.push('// Original total: ' + stats.total);
    lines.push('// Excluded file icons: ' + stats.excluded);
    lines.push('// Remaining folder icons: ' + stats.filtered);
    lines.push('');
    lines.push('const folderIcons = [');

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
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
      console.log('Reading source file:', this.srcPath);
      const content = await this.readSourceFile();
      
      console.log('Parsing folder icons array...');
      const items = this.parseSourceArray(content);
      console.log(`Parsed ${items.length} items`);
      
      console.log('Filtering to keep only folder icons...');
      const result = this.filterFolderIcons(items);
      console.log(`Kept ${result.filtered} folder icons, excluded ${result.excluded} file icons`);
      
      console.log('Formatting output...');
      const outContent = this.formatOutput(result.items, result);
      
      console.log('Writing output file:', this.outPath);
      await this.writeOutput(outContent);
      
      console.log('Done!');
      console.log(`Output written to ${this.outPath}`);
    } catch (err) {
      console.error('Error:', err.message);
      process.exitCode = 1;
    }
  }
}

// If this file is invoked directly, run the filter
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const filter = new FolderIconFilter({
    srcPath: path.join('tech', 'folders', 'folder-icons-from-html.js'),
    outPath: path.join('tech', 'folders', 'folder-icons-from-html-only-folders.js'),
  });
  filter.run();
}

export default FolderIconFilter;
