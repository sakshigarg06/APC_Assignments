const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.querySelector('input');
const add = document.getElementById('add');

const check = "fa-check-circle";
const unCheck = "fa-circle-thin";
const line_through = "lineThrough";

const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

let LIST = [];
let id = 0;

add.addEventListener("click", (e) => {
    const toDo = input.value;
    addToDo(toDo, id, false, false, false, false, false);
});

input.addEventListener("keypress", (e) => {
    if (e.which === 13){
        const toDo = input.value;
        addToDo(toDo, id, false, false, false, false, false);
    }
});

function addToDo(toDo, id, up, down, done, edit, trash){

    if (trash){
        return;
    }

    if (toDo){
        LIST.push(
            {
                name: toDo,
                id: id,
                up: false,
                down: false,
                done: false,
                edit: false,
                trash: false
            }
        );
        input.value = "";
        id++;

        const DONE = done ? check : unCheck;
        const LINE = done ? line_through : "";
    
        const text = `<li class="item">
                        <i class="co fa fa-circle-thin ${DONE}" id="${id}" job="complete"></i>
                        <p class="text ${LINE}"> ${toDo} </p>
                        <input type="text">
                        <div class="icons">
                            <i class="fas fa-arrow-up" id="${id}"" job="moveUp"></i>
                            <i class="fas fa-arrow-down" id="${id}"" job="moveDown"></i>
                            <i class="fas fa-edit" id="${id}"" job="edit"></i>
                            <i class="de fa fa-trash-o" id="${id}" job="delete"></i>
                        </div>
                    </li>`;
    
        const position = "beforeend";

        list.insertAdjacentHTML(position, text);
    }
    else {
        alert("Add a To-Do!");
    }
}

function complete(element){
    element.classList.toggle(check);
    element.classList.toggle(unCheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function remove(element){
    element.parentNode.parentNode.remove();
    LIST[element.id].trash = true;
}

function edit(element){
    let listItem = element.parentNode.parentNode;
    let editInput = listItem.querySelector('input[type=text]');
    let label = listItem.querySelector("p");
    let containsClass = listItem.classList.contains("editMode");

    if (containsClass){
        label.innerText = editInput.value;
    }
    else{
        editInput.value = label.innerText;
    }

    listItem.classList.toggle("editMode");
}

function moveUp(element){
    var wrapper = element.parentNode.parentNode;

	if (wrapper.previousElementSibling)
		wrapper.parentNode.insertBefore(wrapper, wrapper.previousElementSibling);
}

function moveDown(element){
    var wrapper = element.parentNode.parentNode;

	if (wrapper.nextElementSibling)
		wrapper.parentNode.insertBefore(wrapper.nextElementSibling, wrapper);
}

list.addEventListener("click", (e) => {
    let element = e.target;
    const job = e.target.attributes.job.value;
    if (job == "complete"){
        complete(element);
    }
    else if (job == "delete"){
        remove(element);
    }
    else if (job == "edit"){
        edit(element);
    }
    else if (job == "moveUp"){
        moveUp(element);
    }
    else if (job == "moveDown"){
        moveDown(element);
    }
});