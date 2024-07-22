import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text, Button } from 'react-native-paper'
import { GooglePlaceDetail, GooglePlacesAutocomplete, } from "react-native-google-places-autocomplete";
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import { keys } from '../../keys'
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 41.74923097567978,
  longitude: -92.72014428505408,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const grinnellCoords = {
  latitude: 41.74923097567978,
  longitude: -92.72014428505408
}

function InputAutocomplete({ label, placeholder, onPlaceSelected, }) {


  return (
    <>
      <Text>{label}</Text>

      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}

        query={{
          key: keys.google_maps,
          language: "en",
        }}
      />

    </>
  );
}

function calculateTripCost(distance) {
  const averageGasMileage = 25;
  const averageGasPrice = 3.5;
  const gallonsNeeded = distance / averageGasMileage;
  const totalCost = gallonsNeeded * averageGasPrice;

  return totalCost;
}

export function MapScreen({ route }) {
  const [origin, setOrigin] = useState();
  const [destinationCoords, setDestinationCoords] = useState();
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0)
  const [destination, setDestination] = useState(null)
  const mapRef = useRef(null);

  const navigation = useNavigation()

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
      setPrice(calculateTripCost(args.distance));
    }
  };

  const traceRoute = () => {
    if (origin && destinationCoords) {
      mapRef.current?.fitToCoordinates([origin, destinationCoords], { edgePadding });
    }
  };

  const onPlaceSelected = (details, flag) => {
    setOrigin(grinnellCoords)
    setDestination(details)

    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };

    setDestinationCoords(position);
    moveTo(position);
    setShowDirections(true)
    traceRoute()
  };

  const handleSelect = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}>

        {origin && <Marker coordinate={origin} />}

        {destinationCoords && <Marker coordinate={destinationCoords} />}

        {showDirections && origin && destinationCoords && (
          <MapViewDirections
            origin={origin}
            destination={destinationCoords}
            apikey={keys.google_maps}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>

        <InputAutocomplete
          label="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />

        {!destinationCoords ?
          (
            <Button
              mode="contained"
              onPress={traceRoute}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Search
            </Button>
          ) :
          <Button
            mode="contained"
            onPress={handleSelect}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Confirm
          </Button>
        }

        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
            <Text>Gas price: ~ ${price.toFixed(2)}</Text>
          </View>
        ) : null}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});