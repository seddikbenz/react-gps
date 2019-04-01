import { observable, reaction, action, decorate } from "mobx";

class toastStore {
  toasts = [];
  success(text) {
    const toast = {
      id: new Date().getTime(),
      text: text,
      type: "success"
    }
    this.toasts.push(toast)
    setTimeout(() => this.dismiss(toast.id), 4000)
  }
  error(text) {
    const toast = {
      id: new Date().getTime(),
      text: text,
      type: "error"
    }
    this.toasts.push(toast)
    setTimeout(() => this.dismiss(toast.id), 4000)
  }
  dismiss(toastId){
    this.toasts = this.toasts.filter((t) => t.id !== toastId)
  }
}

toastStore = decorate(toastStore, {
  toasts: observable,
  success: action,
  error: action,
  dismiss: action,
});

export default new toastStore();
