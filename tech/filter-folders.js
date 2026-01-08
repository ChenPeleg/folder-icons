import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const sourceFile = path.join(process.cwd(), 'icon.library.atom-icons.js');
const targetFile = path.join(process.cwd(), 'icon.library.atom.only-folders.js');

const data = require(sourceFile);

const records = data[0];

const filteredRecords = records.filter(record => {
    const regex = record[2];
    if (regex instanceof RegExp) {
        return /^\^\w/.test(regex.source);
    }
    return false;
});

function serializeValue(value) {
    if (value instanceof RegExp) {
        return `new RegExp(${JSON.stringify(value.source)}, ${JSON.stringify(value.flags)})`;
    } else {
        return JSON.stringify(value);
    }
}

function serializeRecord(record) {
    return '[' + record.map(serializeValue).join(', ') + ']';
}

const outputRecords = filteredRecords.map(serializeRecord).join(',\n');

const output = `module.exports = [
${outputRecords},
${JSON.stringify(data[1], null, 4)},
${JSON.stringify(data[2], null, 4)},
${JSON.stringify(data[3], null, 4)},
${JSON.stringify(data[4], null, 4)},
${JSON.stringify(data[5], null, 4)}
];`;

fs.writeFileSync(targetFile, output);

console.log('Filtered file created:', targetFile);
