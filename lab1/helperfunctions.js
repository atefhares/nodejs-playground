const fs = require('fs');
//---------------------------------------------------------------------------------------

const filePath = "./todo.json";

//---------------------------------------------------------------------------------------

function readTodos(pathName) {
    const todoList = fs.readFileSync(pathName, 'utf8');
    return JSON.parse(todoList)
}

function writeTodos(data) {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(filePath, jsonData)
}

//---------------------------------------------------------------------------------------

function add(options) {
    let data = {};
    data.title = options.title;

    if (options.checked != undefined)
        data.checked = options.checked;
    else
        data.checked = false;

    let todoList = readTodos(filePath);
    data.id = getLastId(todoList);

    todoList.push(data);

    writeTodos(todoList);
}

function edit(data) {
    let todoList = readTodos(filePath);
    isUpdated = false;
    todoList.forEach((ele, index) => {
        if (ele.id == data.id) {
            editObject(todoList, data, index);
            console.log(`Element ${data.id} updated`);
            writeTodos(todoList);
            isUpdated = true;
        }
    });
    if (!isUpdated)
        console.log(`Element ${data.id} not Exist`);
}

function changeCheck(data, ischecked) {
    let todoList = readTodos(filePath);
    isUpdated = false;
    todoList.forEach((ele, index) => {
        if (ele.id == data.id) {
            data.checked = ischecked;
            editObject(todoList, data, index);
            console.log(`Element ${data.id} checked`);
            writeTodos(todoList);
            isUpdated = true;
        }
    });
    if (!isUpdated)
        console.log(`Element ${data.id} not Exist`);
}

getLastId = (data) => {
    return !data.length ? 1 : data[data.length - 1].id + 1;
};

editObject = (oldObj, newObj, index) => {
    if (newObj.title !== undefined)
        oldObj[index].title = newObj.title;

    if (newObj.checked !== undefined)
        oldObj[index].checked = newObj.checked;

    console.log(oldObj);
    writeTodos(oldObj);
};

function remove(data) {
    let todoList = readTodos(filePath);
    isRemoved = false;
    todoList.forEach((ele, index) => {
        if (ele.id == data.id) {
            todoList.splice(index, 1);
            writeTodos(todoList);
            console.log(`Element ${data.id} removed`)
            isRemoved = true;
        }
    });
    if (!isRemoved)
        console.log(`Element ${data.id} not Exist`);
}

function list() {
    console.log(readTodos(filePath));
}

function checkedTodo() {
    const todoList = readTodos(filePath);
    console.log(todoList.filter((item) => item.checked === true));
}

function uncheckedTodo() {
    const todoList = readTodos(filePath);
    console.log(todoList.filter((item) => item.checked === false));
}

module.exports = {
    add,
    edit,
    remove,
    list,
    checkedTodo,
    uncheckedTodo,
    changeCheck
};