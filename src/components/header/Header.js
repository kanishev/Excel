import {$} from '@core/dom'
import {ExcelComponent} from "@core/ExcelComponent";
import {createHeader} from "./createHeader";
import * as actions from '@/redux/actions'
import {debounce} from '../../core/util';

export class Header extends ExcelComponent {

    static className = 'excel__header'
    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['input'],
            ...options

        })
    }

    prepare(){
       this.onInput = debounce(this.onInput) 
    }

    toHTML(){
       return createHeader(this.store.getState())
    }

    onInput(event){
        console.log(this)
        const text = $(event.target).text()
        this.$dispatch(actions.changeHeader(text))
    }
}