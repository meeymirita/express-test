const express = require('express');
const app = express()
const port = 3002;
app.use(express.json());
const tasks = require('../data/store.js')

// Проверка, что сервер жив
app.get('/health', (req, res) => {
    res.send(`express_api_two started on port: ${port}`)
})

// Получить все задачи тест стора
app.get('/api/manage/tasks', async (req, res) => {
    try {
        const data = await tasks.readAll();
        res.send(data.tasks);
    } catch (err) {
        res.status(500).json({ error: 'Не удалось прочитать задачи' });
    }
})

// Изменить статус задачи
app.patch('/api/manage/tasks/:id', (req, res) => {
    let index = tasks.findIndex(t => t.id === Number(req.params.id));
    tasks[index].completed = req.body.completed;
    res.send(tasks)
})
// Удалить задачу
app.delete('/api/manage/tasks/:id', (req, res) => {
    let index = tasks.findIndex(t => t.id === Number(req.params.id));
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    res.send(tasks);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})