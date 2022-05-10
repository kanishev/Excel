import { ExcelComponent } from "@core/ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  get template() {
    return JSON.stringify(this.state);
  }

  initState(initialState) {
    this.state = { ...initialState };
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    this.$root.html(this.template);
  }
}
