import {defaultTitle} from "../../constants"

export function createHeader(state){
    const title = state.currentHeader || defaultTitle

    return `
    <input type="text" class="input" value="${title}">
    <div>
    <div class="button" data-button="delete"><span class="material-icons" data-button="delete">delete_forever</span>
    </div>
    <div class="button" data-button="exit"><span class="material-icons" data-button="exit">exit_to_app </span>
    </div>
    </div>
    `
}

