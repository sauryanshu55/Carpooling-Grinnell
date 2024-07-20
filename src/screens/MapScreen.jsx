import React from "react";
import { View , Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";

export function MapScreen(){
  return (
    <View style={styles.container}>
      <MapView 
          style={styles.map} 
          initialRegion={{
                latitude:41.7499993956888,
                longitude:-92.7209455949381,
                latitudeDelta: 1,
                longitudeDelta: 1,
          }}>
      </MapView>
</View> 
  )
}

const styles = StyleSheet.create({
  container: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});