export class TableSelection{
  
  static className = 'selected'

  constructor(){
    this.group = [],
    this.native = null
  }

  select($el){
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.native = $el
  }

  clear(){
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  get selectedIds(){
    return this.group.map($el => $el.id())
  }

  selectGroup($els){
    this.clear()
    this.group = $els
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  selectStyle(style){
    this.group.forEach($el => $el.css(style))
  }

}