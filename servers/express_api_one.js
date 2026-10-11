const express = require('express');
const app = express()
app.use(express.json());
const port = 3001
const tasks = require('../data/store.js')
// Проверка, что сервер жив
app.get('/health', (req, res) => {
    res.send(`express_api_one started on port: ${port}`)
})
// Получить все задачи
app.get('/api/tasks', async (req, res) => {
    try {
        const data = await tasks.readAll();
        res.send(data.tasks);
    } catch (err) {
        res.status(500).json({ error: 'Не удалось прочитать задачи' });
    }
})
// Получить одну задачу по ID
app.get('/api/tasks/:id', async (req, res) => {
    const data = await tasks.readAll();
    const oneTask = data.tasks.find(t => t.id === Number(req.params.id))
    if (!oneTask) {
        res.status(404).json({ error: 'Не удалось найти задачу' });
    }
    res.send(oneTask)
})
// Создать новую задачу
app.post('/api/tasks', async (req, res) => {
    const { title, completed = false } = req.body ?? {};

    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Пустой заголовок или не строка' });
    }
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'completed должен быть boolean' });
    }

    const data = await tasks.readAll();
    const newTask = { id: data.nextId, title: title.trim(), completed };
    data.tasks.push(newTask);
    data.nextId++;
    await tasks.writeAll(data);

    res.status(201).json(newTask);
})
// Старт сервера
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})