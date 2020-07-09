import {defaultStyles, defaultTitle} from '../../src/constants';
import {clone} from '../core/util';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  currentHeader: defaultTitle,
  date: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})


export function normalizeInitialState(state){
  return state ? normalize(state) : clone(defaultState)
}

