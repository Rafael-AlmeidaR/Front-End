localStorage.list = localStorage.getItem("list") ? localStorage.list : "[]";
let list = JSON.parse(localStorage.list);
for(let i = 0; (i < list.length); i++)
{   document.getElementById("list").innerHTML += makeHTML(list[i]);
};
sortList()  
document.getElementById("startDate").value = new Date().toISOString().split('T')[0];

function addTask()
{   let task = new Task(document.getElementById("name").value, document.getElementById("startDate").value, document.getElementById("endDate").value, document.getElementById("description").value, list.length)
    document.getElementById("name").value = "";    
    document.getElementById("startDate").value = new Date().toISOString().split('T')[0];
    document.getElementById("endDate").value = "";
    document.getElementById("description").value = "";
    document.getElementById("list").innerHTML += makeHTML(task);
    list.push(task);
    localStorage.list = JSON.stringify(list);
    sortList()
}

class Task
{   constructor(name, startDate, endDate, description, id)
    {   this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.id = id;
        this.finalizated = false;
    }
}
function makeHTML(task)
{   return `<div id="d${task.id}" class="task" style="opacity: ${task.finalizated ? .5 : 1}">
            <div><input type ="checkbox" onclick="finalizated(${task.id})" ${task.finalizated ? "checked" : ""}></input> 
            Nome: ${task.name} </div>
            <p>Data de início: ${task.startDate} </p>
            <p>Data do fim: ${task.startDate} </p>
            <p>Descrição: ${task.description} </p>
            <button id="d${task.id}b" onclick="Delete(${task.id})">Deletar</button>
            </div>
            `
}

function Delete(id)
{   list.splice(id, 1);
    localStorage.list = JSON.stringify(list);
    document.getElementById("list").innerHTML = "";
    for(let i = 0; (i < list.length); i++)
    {   if(i >= id)
        {   list[i].id --;
        }
        document.getElementById("list").innerHTML += makeHTML(list[i]);
    };
    sortList()
}
function finalizated(id)
{   list[id].finalizated = !list[id].finalizated;
    document.getElementById("d"+id).style.opacity = list[id].finalizated ? .5 : 1;
    sortList()
}

function sortList()
{   list.sort((a, b) => {
        if (a.finalizated !== b.finalizated) return a.finalizated - b.finalizated;
        return new Date(a.startDate) - new Date(b.startDate);
    });
   
    list.forEach((task, index) => task.id = index);

   
    document.getElementById("list").innerHTML = "";
    list.forEach(task => {
        document.getElementById("list").innerHTML += makeHTML(task);
    });
 
    localStorage.list = JSON.stringify(list);
}
