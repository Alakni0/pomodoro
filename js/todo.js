const todoButton = document.getElementById('button-todo');
const todoPanel = document.getElementById('todo-panel');
const closeTodoButton = document.getElementById('button-close-todo');
const addTodoButton = document.getElementById('button-add-todo');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoButton.addEventListener('click', () => {
    todoPanel.classList.add('show');
});

closeTodoButton.addEventListener('click', () => {
    todoPanel.classList.remove('show');
});

addTodoButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');

    li.setAttribute('draggable', 'true');
    li.classList.add('draggable');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    });

    const span = document.createElement('span');
    span.innerText = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.classList.add('delete-task-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    todoInput.value = '';

    li.addEventListener('dragstart', () => {
        li.classList.add('dragging');
    });

    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
    });

    todoList.addEventListener('dragover', (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(todoList, e.clientY);
    const draggable = document.querySelector('.dragging');

    if (afterElement == null) {
        todoList.appendChild(draggable);
    } else {
        todoList.insertBefore(draggable, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
}