const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'icon.library.atom-icons.cjs');
const targetFile = path.join(__dirname, 'icon.library.atom.only-folders.js');

const data = require(sourceFile);

const records = data[0];

console.log('Data length:', data.length);
console.log('Data[0] length:', data[0].length);
console.log('First record length:', records[0].length);
console.log('Third element:', records[0][2]);

const filteredRecords = records.filter(record => {
    const regex = record[2];
    if (regex instanceof RegExp) {
        return /^\^\w/.test(regex.source);
    }
    return false;
});

console.log('Total records:', records.length);
console.log('Filtered records:', filteredRecords.length);

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
