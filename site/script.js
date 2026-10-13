$(function () {
    fetchTasks();

    $('#taskButton').click(function( e ) {
        e.preventDefault();
        let title = $('#taskInput').val().trim();
        $.ajax({
            url: '/api/tasks', method: 'post', contentType: 'application/json',
            data: JSON.stringify({title: title}),
            success: function (data) {
                fetchTasks();
                $('#taskInput').val('');
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR, exception)
            }
        });
    });
});

let tasks = [] ;
function fetchTasks() {
    const taskContainer = $('#taskList');
    $.get(`/api/tasks/`, async function (resp) {
        tasks = resp;
        updateStats(tasks);
        if (tasks.length < 1 ) {
            taskContainer
                .text('Нет задач, нужно добавить')
                .addClass('empty-state')
        } else {
            renderTasks(tasks)
        }
    });
}
function renderTasks(tasks) {
    const taskContainer = $('#taskList');
    taskContainer.empty().removeClass('empty-state');
    $.each(tasks, function(_, task) {
        const item = $(`
            <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''} aria-label="Отметить задачу выполненной" >
            <span class="task-title"></span>
            <span class="status">${task.completed ? 'Выполнена' : 'Активная'}</span>
            <button type="button" class="icon-btn" title="Редактировать">✎</button>
            <button type="button" class="icon-btn delete-btn" title="Удалить">♲</button>
            </div>
        `);
        item.attr('data-id', task.id)
        item.find('.task-title').text(task.title);
        taskContainer.append(item)
    });
}
function updateStats(tasks){
    const totalCount = $('#totalCount');
    const completedCount = $('#completedCount');
    const activeCount = $('#activeCount');
    totalCount.text(Number(tasks.length));
    completedCount.text(Number(tasks.filter(t => t.completed).length));
    activeCount.text(Number(tasks.length - tasks.filter(t => t.completed).length));
}
