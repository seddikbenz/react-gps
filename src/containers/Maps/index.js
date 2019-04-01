import React, { Component } from "react";
import { observer } from "mobx-react";
import { StyleSheet, View } from "react-native-web";

import { Map, LayersControl, TileLayer, Marker, Popup } from "react-leaflet";
import {
  BlueMarker,
  GreenMarker,
  RedMarker,
  YellowMarker,
  GrayMarker
} from "../../components/IconsMarker";
import Menu from "./Menu";
import store from "../../stores";
import { colors } from "../../constants";

const osm = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const googleSatelite =
  "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga";
const googleRoad =
  "http://mt1.google.com/vt/lyrs=m@113&hl=en&&x={x}&y={y}&z={z}";

const { BaseLayer, Overlay } = LayersControl;

class Maps extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 36.08,
      lng: 4.76,
      zoom: 11
    };
    this.updateCarsLastPositionIntervalID = 0;
  }
  componentDidMount() {
    store.mapStore.getCarsLastPosition();
    this.updateCarsLastPositionIntervalID = setInterval(
      this.updateCarsLastPosition,
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateCarsLastPositionIntervalID);
  }

  zoomOut() {
    const map = store.mapStore.mapRef.current;
    if (map != null) {
      map.leafletElement.zoomOut();
    }
  }

  updateCarsLastPosition() {
    store.mapStore.updateCarsLastPosition();
  }

  renderIconMarker(car) {
    if (store.mapStore.selectedId === car.id) {
      return GreenMarker;
    }
    if (car.state === "on" && car.speed !== "0") {
      return GreenMarker;
    }
    return BlueMarker;
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          animate={true}
          zoomControl={false}
          onContextmenu={() => this.zoomOut()}
          ref={store.mapStore.mapRef}
          center={store.mapStore.mapCenter}
          zoom={store.mapStore.mapZoom}
          onClick={() => (store.mapStore.showListCars = false)}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org">OpenStreetMap</a>'
                url={osm}
              />
            </BaseLayer>
            <BaseLayer name="GoogleMap.Road">
              <TileLayer
                attribution='&copy; <a href="http://maps.google.com">google maps road</a>'
                url={googleRoad}
              />
            </BaseLayer>
            <BaseLayer name="GoogleMap.Satelite">
              <TileLayer
                attribution='&copy; <a href="http://maps.google.com">google maps satelite</a>'
                url={googleSatelite}
              />
            </BaseLayer>
          </LayersControl>
          {store.mapStore.cars.map((car, index) => {
            if (car.positions.length !== 0) {
              return (
                <Marker
                  onClick={() => (store.mapStore.selectedId = car.id)}
                  key={index}
                  position={{
                    lat: car.positions[0].lat,
                    lng: car.positions[0].lng
                  }}
                  icon={this.renderIconMarker(car)}
                >
                  <Popup>
                    <b>Matricule:</b> {car.numberplate}
                    <br /> <b>Code:</b> {car.code}
                    <br /> <b>Vitesse:</b> {car.speed ? car.speed : 0} km/h
                    <b>, State:</b> {car.state ? car.state : "off"}
                    <br /> <b>Lat:</b> {car.positions[0].lat}
                    <br /> <b>Lng:</b> {car.positions[0].lng}
                    <br /> <b>Dernière mise à jour:</b>{" "}
                    {car.positions[0].updated_at}
                  </Popup>
                </Marker>
              );
            }
          })}
        </Map>
        <Menu />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    width: "100%",
    flex: 1
  }
});

export default observer(Maps);
