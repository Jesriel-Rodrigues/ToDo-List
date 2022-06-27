let form = document.querySelector('form')
const lista = document.getElementById('lista-Tarefas')
const buttons = document.querySelectorAll('.excluir')
let listaTarefas = []

form.addEventListener('submit', function(event) {
    event.preventDefault()
    const InputTarefa = event.target[0]
    const tarefaTexto = InputTarefa.value
    if (InputTarefa.value != '') {
        criaTarefa(tarefaTexto, false)
        InputTarefa.value = ''
        InputTarefa.focus()
    }
})

function Tarefas(texto, status, id){
    this.tarefa = texto
    this.checkbox = status
    this.idTarefa = id

    this.setCheckbox = ()=>{
        this.checkbox = this.checkbox != true ? true:false
        atualizaTarefas()
    }
}


const criaTarefa = (tarefaTexto, status)=>{
    const id = listaTarefas.length
    const novaTarefa = new Tarefas(tarefaTexto, status, id)
    listaTarefas.push(novaTarefa)
    atualizaTarefas()
}


const criaItem = (tarefa)=>{
    const inputCheckBox = document.createElement('input')
    inputCheckBox.type = 'checkbox'
    inputCheckBox.checked = tarefa.checkbox
    inputCheckBox.classList.add('checkbox')
    
    const divItem = document.createElement('div')
    divItem.classList.add('item')
    divItem.innerText = tarefa.tarefa
    
    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('excluir')
    button.innerText = 'X'
    
    const item = document.createElement('li')
    item.id = tarefa.idTarefa
    item.appendChild(inputCheckBox)
    item.appendChild(divItem)
    item.appendChild(button)
    lista.appendChild(item)

    if(inputCheckBox.checked){
        divItem.classList.add('marcado')
    }
}

const atualizaTarefas = ()=>{
    lista.innerHTML = ''
    listaTarefas.forEach(criaItem)
}

const excluirItem = (index, lista)=>{
    lista.splice(index,1)
    atualizaTarefas()
}

const marcaTarefa = (tarefa)=>{
    tarefa.setCheckbox()
}


const eventoClick = (event)=>{
    const elemento = event.target
    const item = elemento.parentElement
    listaTarefas.forEach((tarefa, index, lista)=>{
        const tarefaClicada = tarefa.idTarefa == item.id
        if (tarefaClicada && elemento.type == 'button') {
            excluirItem(index, lista)
        }else if(tarefaClicada && elemento.type == 'checkbox'){
            marcaTarefa(tarefa)
        }
    })
}


document.querySelector('ul').addEventListener('click', eventoClick)

