const fs = require('fs').promises;
async function readAll() {
    try {
        const data = await fs.readFile('./data/tasks.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения JSON-файла:', err);
        throw err;
    }
}

async function writeAll(data) {
    await fs.writeFile('./data/tasks.json', JSON.stringify(data, null, 4), 'utf-8');
}

module.exports ={ readAll, writeAll };

