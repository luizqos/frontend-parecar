import React from "react";
import { StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = React.memo(
  ({
    markers,
    initialRegion,
    findRegion,
    searchedLocation,
    toggleModalEstacionamento,
  }) => {
    return (
      <MapView
        style={{ flex: 1, borderRadius: 20, ...StyleSheet.absoluteFillObject }}
        region={findRegion ? findRegion : initialRegion}
        zoomEnabled={true}
        showsUserLocation={true}
        loadingEnabled={false}
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{
              latitude: parseFloat(m.latitude),
              longitude: parseFloat(m.longitude),
            }}
            onPress={() => toggleModalEstacionamento(m)}
          >
            <Image
              source={require("../../assets/img/pinIcon.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
          </Marker>
        ))}
        {searchedLocation && (
          <Marker
            coordinate={{
              latitude: searchedLocation.lat,
              longitude: searchedLocation.lng,
            }}
          >
            <Image
              source={require("../../assets/img/pinIconAddress.png")}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
          </Marker>
        )}
      </MapView>
    );
  }
);

export default Map;
