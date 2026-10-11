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
app.patch('/api/manage/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { completed } = req.body ?? {};
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'completed должен быть boolean' });
    }
    const data = await tasks.readAll();
    const task = data.tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }
    task.completed = completed;
    await tasks.writeAll(data);

    res.json(task);
})
// Удалить задачу
app.delete('/api/manage/tasks/:id', async (req, res) => {
    const data = await tasks.readAll();
    const id = Number(req.params.id);
    const index = data.tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }
    data.tasks.splice(indexz, 1)
    await tasks.writeAll(data);
    return  res.status(204).end()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})