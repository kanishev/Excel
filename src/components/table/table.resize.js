import {$} from '@core/dom'
export function resizeHandler($root){
 
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const cells = $root.findAll(`[data-type="${$parent.data.col}"]`)
  const type = $resizer.data.resize
  const side = type === "col" ? "bottom" : "right"
  let value


  $resizer.css({
      opacity: 1,
      [side]: "-5000px",
      zIndex: 111
  })
  document.onmousemove = e => {
      if (type === 'col'){
          const delta = e.pageX - coords.right
          value = coords.width + delta
          $resizer.css({right: -delta + 'px'})                      
      }
      else {
          const delta = e.pageY - coords.bottom
          value = coords.height + delta
          $resizer.css({bottom: -delta + 'px'})                      
      }
  }
  document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null
      if (type === 'col'){
          $parent.css({width: value + 'px'})
          cells.forEach(el => {el.style.width = value + 'px'})
      } 
      else {    
          $parent.css({height: value + 'px'})
      }

      $resizer.css({
          opacity: 0,
          right: 0,
          bottom: 0
      })
  }

}