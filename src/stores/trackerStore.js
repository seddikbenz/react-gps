import {observable, reaction, action, decorate} from "mobx";
import agent from "../agent";
import commonStore from "./commonStore";
import toastStore from "./toastStore";

class trackerStore {
  selectedId = 0;
  tracker = {
    id: 0,
    code: "",
    car_id: ""
  };
  trackers = [];
  loading = false;

  getTracker(id) {
    this.loading = true;
    return agent.Tracker.getTracker(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.tracker = data.data
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body)
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  getAll() {
    this.loading = true;
    return agent.Tracker.all()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.trackers = data.data;
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body)
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  create() {
    this.loading = true;
    return agent.Tracker.create(this.tracker)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toastStore.success(data.message)
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body)
      })
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }

  delete(id) {
    this.loading = true;
    return agent.Tracker.delete(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toastStore.success(data.message)
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body)
      })
      .finally(action(() => this.getAll()));
  }

  update() {
    this.loading = true;
    return agent.Tracker.update(this.tracker)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toastStore.success(data.message)
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body)
      })
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }

  ping(id, position) {
    //this.loading = true;
    return agent.Tracker.ping(id, position)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          //this.tracker = data.data
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body)
      })
      .finally(
        action(() => {
          //this.loading = false;
        })
      );
  }
}

trackerStore = decorate(trackerStore, {
  selectedId: observable,
  tracker: observable,
  trackers: observable,
  loading: observable,
  message: observable,
});

export default new trackerStore();
