import { toInlineStyles } from "../../core/util";
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createRow(index, cols, state) {
  const height = getHeight(state, index);
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : "";
  return `
    <div class="row" data-type="resizable" data-row="${index}"style="height:${height}">
      <div class="row-info">
        ${index ? index : ""}
        ${resize}
      </div>
      <div class="row-data">${cols}</div>
    </div>
  `;
}

function createColumn({ col, index, width }) {
  return `
      <div class="column" data-type="resizable" data-col="${index}" style="width:${width}" >
        ${col}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `;
}

function createCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    const width = getWidth(state.colState, col);
    const text = state.dataState[id];
    return `
    <div class="cell"
    contenteditable data-type="${col}"
    data-id="${row}:${col}"
    data-value="${text || ""}"
    data-check="cell"
    style="${styles}; width:${width}">${parse(text) || ""}</div>`;
  };
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}
export function createTable(countRow = 15, state) {
  const nums = CODES.Z - CODES.A + 1;
  const row = [];

  const cols = new Array(nums)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createColumn)
    .join("");

  row.push(createRow("", cols, {}));

  for (let i = 0; i < countRow; i++) {
    const cell = new Array(nums).fill("").map(createCell(state, i)).join("");

    row.push(createRow(i + 1, cell, state.rowState));
  }

  return row.join("");
}
