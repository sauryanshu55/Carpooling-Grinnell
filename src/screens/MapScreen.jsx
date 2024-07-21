import React, { useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { keys } from '../../keys';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LAT = 28.46254;
const INITIAL_LNG = -81.397272;
const INITIAL_POSITION = {
  latitude: 41.7499993956888,
  longitude: -92.7209455949381,
  latitudeDelta: 1,
  longitudeDelta: 1,
}



export function MapScreen() {
  const [searchText, setSearchText] = useState('')
  const [results, setResuts] = useState([])
  const map = useRef(null)

  const searchPlaces = async () => {
    if (!searchText.trim().length) return;
    const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchText.trim()
    const location = `${INITIAL_LAT},${INITIAL_LNG}&radius=2000`
    const url = `${googleApisUrl}?query=${input}&${location}&key=${keys.google_maps}`

    try {
      const resp = await fetch(url)
      const json = await resp.json()

      if (json && json.results) {
        const coords = []
        for (const item of json.results) {
          coords.push({ latitude: item.geometry.location.lat, longitude: item.geometry.location.lng })
        }
        setResuts(json.results)

        if (coords.length) {

          map.current?.fitToCoordinates(coords,
            {
              edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
              },
              animated: true
            })
          Keyboard.dismiss()
        }
      }


    }
    catch (e) {
      console.error(e)
    }
  };

  return (
    <View style={styles.container}>

      {/* MAP VIEW */}
      <MapView style={styles.map} initialRegion={INITIAL_POSITION} ref={map}>
        {results.length ? results.map((item, i) => {
          const coord = { latitude: item.geometry.location.lat, longitude: item.geometry.location.lng }
          return <Marker key={`search-item-${i}`} coordinate={coord} title={item.name} description='' />
        }) : null}
      </MapView>

      {/* SEARCH BOX */}
      <View style={styles.searchBox}>

        <Text style={styles.searchBoxField}>Where do you want to go?</Text>

        <TextInput style={styles.searchBoxField} onChangeText={setSearchText} autoCapitalize='sentences' />

        <TouchableOpacity style={styles.buttonContainer} onPress={searchPlaces}>
          <Text style={styles.buttonLabel}>Search</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%'
  },
  searchBox: {
    position: 'absolute',
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    marginTop: 60
  },

  searchBoxField: {
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 18,
    marginBottom: 0,
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#26f",
    borderRadius: 8,
  },

  buttonLabel: {
    fontSize: 18,
    color: 'white',
  }
});
