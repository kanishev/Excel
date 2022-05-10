import { $ } from "@core/dom";
import { ExcelComponent } from "@core/ExcelComponent";
import { createHeader } from "./createHeader";
import * as actions from "@/redux/actions";
import { debounce } from "../../core/util";
import { ActiveRoute } from "../../core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["input", "click"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput);
  }

  toHTML() {
    return createHeader(this.store.getState());
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$dispatch(actions.changeHeader(text));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === "delete") {
      const decidion = window.confirm(
        "Вы действительно хотите удалить эту таблицу?"
      );
      if (decidion) {
        localStorage.removeItem(`excel/${ActiveRoute.param}`);
        ActiveRoute.navigate("");
      }
    } else if ($target.data.button === "exit") {
      ActiveRoute.navigate("");
    }
  }
}
