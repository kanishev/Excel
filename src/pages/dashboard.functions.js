import {storage} from "../core/util"

export function toHTML(key){
    const model = storage(key)
    const id = key.split('/')[1]

    return `
    <li class="db__record">
    <a href="#excel/${id}">${model.currentHeader}</a>
    <strong>${new Date(model.date).toLocaleDateString()}
            ${new Date(model.date).toLocaleTimeString()}
    </strong>
    </li>
    `
}


function getAllKeys(){

    const keys = []
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        if (!key.includes('excel')){
            continue
        }
        keys.push(key)   
    }
    return keys
}


export function createRecordsTable(){
    const keys = getAllKeys()
  
    if (!keys.length){
        return `<h1>Пока что записей нет</h1>`
    }

    return `<div class="db__list-header">
    <span>Название: </span>
    <span>Дата открытия</span>
    </div>

    <ul class="db__list">
    ${keys.map(toHTML).join('')}
    </ul>`
}