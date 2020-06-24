class Dom {
    constructor(selector){
        this.$el = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector
    }
   
    html(html){
       if (typeof html === 'string'){
           this.$el.innerHTML = html
           return this
       }
       return this.$el.outerHTML.trim()
   
    }

    text(text){
        if (typeof text === 'string'){
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input'){
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }
   
    clear(){
       this.html('')
       return this
    }
   
    on(method, fn){
        this.$el.addEventListener(method, fn)
    }

    off(method, fn){
        this.$el.removeEventListener(method, fn)
    }

    id(par){
        if (par){
            const array = this.data.id.split(':')
            return {
                row: +array[0],
                col: +array[1]
            }
        }
        return this.data.id
        
    }
    append(node){
       if (node instanceof Dom){
            node = node.$el
        }
       if (Element.prototype.append){
           this.$el.append(node)
       } else {
           this.$el.appendChild(node)
       }
       return this
    }

    closest(content){
        return $(this.$el.closest(content))
    }

    getCoords(){
        return this.$el.getBoundingClientRect()
    }

    get data(){
        return this.$el.dataset
    }
    
    find(selector){
        return $(this.$el.querySelector(selector))
    }

    findAll(selector){
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}){
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    addClass(className){
        this.$el.classList.add(className)
        return this
    }

    removeClass(className){
        this.$el.classList.remove(className)
        return this
    }

    focus(){
        this.$el.focus()
        return this
    }

   }
   
export function $(selector){
    return new Dom(selector)
}
   
$.create = (tagname, classes = '') => {
    const el = document.createElement(tagname)
    if (classes){
        el.classList.add(classes)
    }
    return $(el)
}