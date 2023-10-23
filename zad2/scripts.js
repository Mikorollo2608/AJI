"use strict"
let todoList = []; //declares a new array for Your todo list

$('#inputSearch').on('input', (event) => {
    updateTodoList();
})
$("#inputSearchDateStart").on('input', (event) => {
    updateTodoList();
})
$("#inputSearchDateEnd").on('input', (event) => {
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

    let tableBody = $("#todoListView tbody");
    tableBody.children().remove();

    //add all elements
    let filterInput = $("#inputSearch").val();
    let dateStart = $("#inputSearchDateStart").val() == "" ? null : new Date( $("#inputSearchDateStart").val());
    let dateEnd = $("#inputSearchDateEnd").val() == "" ? null : new Date( $("#inputSearchDateEnd").val());
    for (let todo in todoList) {
        if (
            ((filterInput== "") ||
            (todoList[todo].title.includes(filterInput)) ||
            (todoList[todo].description.includes(filterInput))) && (checkDate(dateStart, dateEnd, todoList[todo].dueDate == "" ? null : new Date( todoList[todo].dueDate)))
        ) {
            let newRow = $("<tr></tr>");
            let newTitle = $("<td></td>");
            let newDescription = $("<td></td>");
            let newPlace = $("<td></td>");
            let newDueDate = $("<td></td>");
            let buttonWrap= $("<td></td>");
            newTitle.text(todoList[todo].title);
            newDescription.text(todoList[todo].description);
            newPlace.text(todoList[todo].place);
            newDueDate.text(formatDate(todoList[todo].dueDate));
            let newDeleteButton = $("<input></input>");
            newDeleteButton.attr("type", "button");
            newDeleteButton.val("x");
            newDeleteButton.attr("class","btn btn-primary");
            newDeleteButton.on("click",
                function () {
                    deleteTodo(todo);
                });
            newRow.append(newTitle);
            newRow.append(newDescription);
            newRow.append(newPlace);
            newRow.append(newDueDate);
            buttonWrap.attr("class","align-middle text-center");
            buttonWrap.append(newDeleteButton);
            newRow.append(buttonWrap);
            tableBody.append(newRow);
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
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputPlace = $("#inputPlace");
    let inputDate = $("#inputDate");
    //get the values from the form
    let newTitle = inputTitle.value();
    let newDescription = inputDescription.value();
    let newPlace = inputPlace.value();
    let newDate = inputDate.value() == "" ? "" : new Date(inputDate.value());
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