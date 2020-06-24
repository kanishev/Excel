import {$} from '@core/dom'
import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/table.functions";
import {TableSelection} from '@/components/table/TableSelection';
import {shouldSelect} from '@/components/table/table.functions';
import {matrix, nextSelecotor} from './table.functions';

export class Table extends ExcelComponent{

    static className = 'excel__table'

    constructor($root, options){
        super($root,{
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })

    }

    selectCell($cell){
        this.selection.select($cell)
        this.$emit('table:text', $cell)
    }

    toHTML(){
       return createTable(20)
    }

    init(){
        super.init()
        const elem = this.$root.find('[data-id="0:0"]')
        this.selection = new TableSelection()
        this.selectCell(elem)
        this.$on('formula:text', (data) => {this.selection.native.text(data)}) 
        this.$on('formula:done', () => {
            this.selection.native.focus()
        })
    }

    onMousedown(event){
        event.preventDefault()
        if (shouldResize(event)){
          resizeHandler(this.$root)      
        }
        if (shouldSelect(event)){
            const $target = $(event.target)    
            if (event.shiftKey){               
                const nodes = matrix($target, this.selection.native).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(nodes)
            }
            else {
                this.selection.select($target)
            }
        }
       
    }
    
    onKeydown(event){
        const keys = ['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']
        
        if (keys.includes(event.key) && !event.shiftKey){
            event.preventDefault()
            const key = event.key
            const current = this.selection.native.id(true)
            const newcell = this.$root.find(nextSelecotor(key, current))
            this.selectCell(newcell)
        } 
        
    }

    onInput(event){
        this.$emit('table:text', $(event.target))
    }
   
} 

