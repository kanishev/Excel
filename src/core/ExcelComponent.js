import { DOMListener } from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    (this.name = options.name || ""),
      (this.emitter = options.emitter),
      (this.subscribe = options.subscribe || []),
      (this.store = options.store),
      (this.unsubs = []),
      this.prepare();
  }

  prepare() {}

  toHTML() {
    return "";
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  $on(data, fn) {
    const unsub = this.emitter.subscribe(data, fn);
    this.unsubs.push(unsub);
  }

  $emit(data, ...args) {
    this.emitter.emit(data, ...args);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMlisteners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
