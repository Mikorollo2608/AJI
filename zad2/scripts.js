"use strict"
let todoList = []; //declares a new array for Your todo list

document.getElementById("inputSearch").addEventListener('input', (event) => {
    updateTodoList();
})
document.getElementById("inputSearchDateStart").addEventListener('input', (event) => {
    updateTodoList();
})
document.getElementById("inputSearchDateEnd").addEventListener('input', (event) => {
    updateTodoList();
})
const BASE_URL = "https://api.jsonbin.io/v3/b/652a9a5254105e766fc22f25";
const SECRET_KEY = "$2a$10$SGD.e3rRcjqkai46wYTGQ.dNFSMZ8jma57aeSqn/Kp1EirwMrowrG";
$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: BASE_URL,
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'X-Master-Key': SECRET_KEY
    },
    success: (data) => {
        //console.log(data);
        todoList = data.record;
        updateTodoList();
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
});
let updateTodoList = function () {

    let todoListDiv =
        document.getElementById("todoListView").lastElementChild;

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    let filterInput = document.getElementById("inputSearch");
    let dateStart = document.getElementById("inputSearchDateStart").value == "" ? null : new Date( document.getElementById("inputSearchDateStart").value);
    let dateEnd = document.getElementById("inputSearchDateEnd").value == "" ? null : new Date( document.getElementById("inputSearchDateEnd").value);
    for (let todo in todoList) {
        if (
            ((filterInput.value == "") ||
            (todoList[todo].title.includes(filterInput.value)) ||
            (todoList[todo].description.includes(filterInput.value))) && (checkDate(dateStart, dateEnd, todoList[todo].dueDate == "" ? null : new Date( todoList[todo].dueDate)))
        ) {
            let newRow = document.createElement("tr");
            let newTitle = document.createElement("td");
            let newDescription = document.createElement("td");
            let newPlace = document.createElement("td");
            let newDueDate = document.createElement("td");
            let buttonWrap= document.createElement("td");
            newTitle.textContent = todoList[todo].title;
            newDescription.textContent = todoList[todo].description;
            newPlace.textContent = todoList[todo].place;
            newDueDate.textContent = formatDate(todoList[todo].dueDate);
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.className="btn btn-primary";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(todo);
                });
            newRow.appendChild(newTitle);
            newRow.appendChild(newDescription);
            newRow.appendChild(newPlace);
            newRow.appendChild(newDueDate);
            buttonWrap.className="align-middle text-center";
            buttonWrap.appendChild(newDeleteButton);
            newRow.appendChild(buttonWrap);
            todoListDiv.appendChild(newRow);
        }
    }
}
let deleteTodo = function (index) {
    todoList.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateTodoList();
    updateJSONbin();
}

let addTodo = function () {
    //get the elements in the form
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");
    //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = inputDate.value == "" ? "" : new Date(inputDate.value);
    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
    //add item to the list
    todoList.push(newTodo);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateTodoList();
    updateJSONbin();
}
let updateJSONbin = function () {
    $.ajax({
        url: BASE_URL,
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': SECRET_KEY
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

let formatDate = function (date) {
    if(date == null || date == "") return "";
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return String(day).concat("/").concat(month).concat("/").concat(year);
}

let checkDate = function (start, end, date){
    if(start === null && end === null) return true;
    else if(date===null) return false;
    else if(start === null) return date<end;
    else if(end === null) return date>start;
    else return date>start && date<end;
}