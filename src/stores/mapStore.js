import { observable, reaction, action, decorate } from "mobx";
import agent from "../agent";
import commonStore from "./commonStore";
import React from "react";
import store from "./index";
import toastStore from "./toastStore";

class mapStore {
  mapRef = React.createRef();
  mapZoom = 5;
  mapCenter = {
    lat: 30.08,
    lng: 4.76
  };
  showMenu = false;
  cars = [
    {
      id: 1,
      numberplate: "0001-00-16",
      code: "",
      gps_code: "",
      company_id: "",
      positions: [
        {
          lat: 36.16,
          lng: 4.84
        }
      ]
    },
    {
      id: 2,
      numberplate: "0002-00-16",
      code: "",
      gps_code: "",
      company_id: "",
      positions: [
        {
          lat: 36.06,
          lng: 4.94
        }
      ]
    },
    {
      id: 3,
      numberplate: "0001-00-16",
      code: "",
      gps_code: "",
      company_id: "",
      positions: [
        {
          lat: 36.06,
          lng: 4.84
        }
      ]
    }
  ];
  loading = false;
  selectedId;
  showListCars = false;
  getCarsLastPosition() {
    this.loading = true;
    return agent.Car.getCarsLastPosition()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.cars = data.data;
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body);
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  updateCarsLastPosition() {
    return agent.Car.getCarsLastPosition()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.cars = data.data;
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body);
      })
      .finally(action(() => {}));
  }

  zoomTo(id, position) {
    const map = store.mapStore.mapRef.current;
    if (map != null) {
      map.leafletElement.flyTo(position, 17);
      this.selectedId = id;
    }
  }
}

mapStore = decorate(mapStore, {
  showMenu: observable,
  mapRef: observable,
  mapZoom: observable,
  mapCenter: observable,
  cars: observable,
  showListCars: observable,
  selectedId: observable,
  loading: observable,
  zoomTo: action
});

export default new mapStore();
