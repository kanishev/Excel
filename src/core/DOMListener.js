import {recreate} from "./util";

export class DOMListener{
    constructor($root, listeners = []){
        if (!$root){
            throw new Error(`No $root provided for DOMLitener!`);       
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners(){
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            const name = this.name || ''
            if (!this[method]){
                throw new Error(`Method ${method} is not emplemented in ${name} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        } )
    }

    removeDOMlisteners(){
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(data){
    return 'on' + recreate(data)
}