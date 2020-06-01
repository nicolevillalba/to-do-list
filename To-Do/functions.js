const todoInput = document.querySelector('.to-do-input');
const todoButton = document.querySelector('.to-do-button');
const todoList = document.querySelector('.to-do-list');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCompleted)

function addTodo(event) {
    event.preventDefault();
    // Create List 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('to-do-item');
    todoDiv.appendChild(newTodo);
    // Local Storage
    saveTodosLocal(todoInput.value);
    //Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class= "fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    // Append to List
    todoList.appendChild(todoDiv);
    //Clear search bar input
    todoInput.value="";
}

function deleteCompleted(e){
    const itemOfList = e.target
    //delete To-do
    if (itemOfList.classList[0] === 'delete-button'){
        const todo = itemOfList.parentElement;
        removeTodosLocal(todo);
        todo.remove();

    }
    if (itemOfList.classList[0] === 'completed-button'){
        const todo = itemOfList.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveTodosLocal(todo){
    //does to-do exist already?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos= JSON.parse(localStorage.getItem('todos'));
    } 
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos= JSON.parse(localStorage.getItem('todos'));
    } 
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('to-do-item');
        todoDiv.appendChild(newTodo);
        //Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("completed-button");
        todoDiv.appendChild(completedButton);
        //Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class= "fas fa-trash"></i>';
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);
        // Append to List
        todoList.appendChild(todoDiv);
    })
}

function removeTodosLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos= JSON.parse(localStorage.getItem('todos'));
    } 
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}