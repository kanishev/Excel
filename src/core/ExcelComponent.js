import {DOMListener} from '@core/DOMListener'


export class ExcelComponent extends DOMListener{

    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || '',
        this.emitter = options.emitter,
        this.unsubs = []
    }

    toHTML(){
        return ''
    }

    $on(data, fn){
        this.emitter.subscribe(data, fn) 
        this.unsubs.push(fn)
    }

    $emit(data, ...args){
        this.emitter.emit(data, ...args)
    }

    init(){
        this.initDOMListeners()
    }

    destroy(){
        this.removeDOMlisteners()
        this.unsubs.forEach(unsub => unsub())
    }
}