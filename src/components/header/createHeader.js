import {defaultTitle} from "../../constants"

export function createHeader(state){
    const title = state.currentHeader || defaultTitle

    return `
    <input type="text" class="input" value="${title}">
    <div>
    <div class="button"><span class="material-icons">delete_forever</span>
    </div>
    <div class="button"><span class="material-icons">exit_to_app </span>
    </div>
    </div>
    `
}

