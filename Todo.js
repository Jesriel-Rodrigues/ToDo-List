let form = document.querySelector('form')
const lista = document.getElementById('lista-Tarefas')
const buttons = document.querySelectorAll('.excluir')
let listaTarefas = []

form.addEventListener('submit', function(event) {
    event.preventDefault()
    const InputTarefa = event.target[0]
    const tarefaTexto = InputTarefa.value
    if (InputTarefa.value != '') {
        criaTarefa(tarefaTexto, 'check')
        InputTarefa.value = ''
        InputTarefa.focus()
    }
})

function Tarefas(texto, status, id){
    this.tarefa = texto
    this.checkbox = status
    this.idTarefa = id
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
    
}

const atualizaTarefas = ()=>{
    lista.innerHTML = ''
    listaTarefas.forEach(criaItem)
}
const excluirItem = (event)=>{
    const elemento = event.target
    const item = elemento.parentElement
    listaTarefas.forEach((tarefa, index, lista)=>{
        if (tarefa.idTarefa == item.id) {
            lista.splice(index,1)
            atualizaTarefas()
        }
    })
}

document.querySelector('ul').addEventListener('click', excluirItem)

// atualizaTarefas()

