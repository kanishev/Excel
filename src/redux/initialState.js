import {storage} from "../core/util"
import {defaultStyles, defaultTitle} from '../../src/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  currentHeader: defaultTitle
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('table-resize') ? normalize(storage('table-resize')) : defaultState