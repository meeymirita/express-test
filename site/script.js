$(function () {
    loadTasks();
});
function loadTasks() {
    const taskContainer = $('#taskList');
    $.get(`/api/tasks/`, async function (resp) {
        if (resp.length < 1) {
            taskContainer
                .text('Нет задач, нужно добавить')
                .addClass('empty-state')
        } else {
            taskContainer.empty();
            $.each(resp, function(_, task) {
                taskContainer.append(`
                    <div class="task-item ${task.completed ? 'completed' : ''}" id="${task.id}">
                            <input
                                type="checkbox"
                                class="task-check"
                                ${task.completed ? 'checked' : ''}
                                aria-label="Отметить задачу выполненной"
                            >
                            <span class="task-title">${task.title}</span>
                            <span class="status">${task.completed ? 'Выполнена' : 'Активная'}</span>
                            <button type="button" class="icon-btn" title="Редактировать">✎</button>
                            <button type="button" class="icon-btn delete-btn" title="Удалить">♲</button>
                        </div>
                    `);
            });

        }
    });
}