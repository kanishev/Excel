import {storage} from "../core/util"
import {defaultStyles} from '../../src/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles
}

export const initialState = storage('table-resize') ? storage('table-resize') : defaultState