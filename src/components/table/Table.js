import {$} from '@core/dom'
import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/table.functions";
import {TableSelection} from '@/components/table/TableSelection';
import {shouldSelect} from '@/components/table/table.functions';
import {matrix, nextSelecotor} from './table.functions';
import * as actions from '@/redux/actions'
import {defaultStyles} from '../../constants';
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
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        console.log(styles)
        this.$dispatch(actions.changeStyles(styles))
    }


    async tablerResizer(event){
        try {
            const data = await resizeHandler(this.$root, event)  
            this.$dispatch(actions.tableResize(data))
        }
        catch {
            console.warn('Warning, data Error!')
        }
    }

    updateTextInStore(value){
        this.$dispatch(actions.changeText({
            id: this.selection.native.id(),
            value
        }))
    }

    // ------------------------------------------------------------------------------------------------ //

    toHTML(){
       return createTable(25, this.store.getState())
    }

    prepare(){
        this.selection = new TableSelection()
    }

    init(){
        super.init()
        const elem = this.$root.find('[data-id="0:0"]')
        this.selectCell(elem)

        this.$on('formula:text', data => { 
        this.selection.native.text(data)
        this.updateTextInStore(data)
        }) 
        
        this.$on('formula:done', () => {
            this.selection.native.focus()
        })

        this.$on('toolbarStyle', style => {
            this.selection.selectStyle(style)
        })
    }

    onMousedown(event){
        event.preventDefault()
        if (shouldResize(event)){
            this.tablerResizer(event)
        }
        if (shouldSelect(event)){
            const $target = $(event.target)    
            if (event.shiftKey){               
                const nodes = matrix($target, this.selection.native).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(nodes)
            }
            else {
                this.selectCell($target)
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
        this.updateTextInStore($(event.target).text())
        
       
    }
   
} 

