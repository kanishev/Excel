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