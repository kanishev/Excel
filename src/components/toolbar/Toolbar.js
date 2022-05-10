import { createToolbar } from "./toolbar.tamplate";
import { $ } from "@/core/dom";
import { ExcelStateComponent } from "@/core/ExcelStateComponent";
import { defaultStyles } from "../../constants";

export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click", "mousedown"],
      subscribe: ["currentStyles"],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === "button") {
      const value = JSON.parse($target.data.meta);
      this.$emit("toolbarStyle", value);
    }
  }

  onMousedown(event) {
    event.preventDefault();
  }
}
