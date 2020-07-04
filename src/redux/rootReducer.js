import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES} from "./types"

export function rootReducer(state, action) { 
  let prevState 
  let field
  switch (action.type){
    case TABLE_RESIZE:
    field = action.data.type === 'col' ? 'colState' : 'rowState'
    return {...state, [field]: value(state,field, action)}

    case CHANGE_TEXT:
      field = 'dataState'
  
      return {...state,
         currentText: action.data.value,
         [field]: value(state,field, action)
        }

    default: return state

    case CHANGE_STYLES: 
    return {...state, currentStyle: action.data}
  }
}  


function value(state, field, action){
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}