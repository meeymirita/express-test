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
app.get('/api/tasks/:id', (req, res) => {
    res.send(tasks.filter((t) => t.id === Number(req.params.id)));
})
// Создать новую задачу
app.post('/api/tasks', (req, res) => {
    tasks.push({id: tasks.length + 1, title: req.body.title, completed: req.body.completed})
    res.json(tasks);
})
// Старт сервера
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})