import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { generateClient } from 'aws-amplify/api';
import { createRideDetails } from '../graphql/mutations';
import { Button, Switch, TextInput, Title, Subheading, Text, Checkbox } from 'react-native-paper';
import { useRoute } from '@react-navigation/native'


export function DetailsScreen({ navigation }) {

  // SET STATES
  const [date, setDate] = useState(new Date())
  const [isFlexible, setIsFlexible] = useState(false)
  const [byFlexible, setByFlexible] = useState("");
  const [needReturnRide, setNeedReturnRide] = useState(false);
  const [waitTime, setWaitTime] = useState(0)
  const [offer, setOffer] = useState(0)

  const toggleIsFlexibleSwitch = () => setIsFlexible(previousState => !previousState);
  const handleByFlexibleTimeChange = (text) => { setByFlexible(text.replace(/[^0-9]/g, "")) };
  const handleWaitTimeChange = (text) => { setWaitTime(text.replace(/[^0-9]/g, "")) };
  const handleOfferChange = (text) => { setOffer(text.replace(/[^0-9]/g, "")) };

  const route = useRoute();
  const destination = route.params?.selectedDestination
  const oneWayGasPrice = route.params?.gasPrice.toFixed(2)
  const duration = route.params?.duration

  // CLIENT
  const client = generateClient();

  // SAVE
  const save = async () => {
    try {
      const destinationObject = {
        address: destination?.formatted_address,
        name: destination?.name,
        latitude: destination?.geometry.location.lat,
        longitude: destination?.geometry.location.lng
      }

      const rideDetails = {
        dateTime: date.toISOString(),
        isFlexible: isFlexible,
        byFlexible: isFlexible ? parseInt(byFlexible) : null,
        needReturnRide: needReturnRide,
        waitTime: needReturnRide ? parseInt(waitTime) : null,
        duration: Math.floor(duration),
        offer: offer,
        destination: destinationObject
      }
      console.log(rideDetails)
      const result = await client.graphql({
        query: createRideDetails,
        variables: { input: rideDetails }
      })

      console.log("SAVED")
    } catch (error) {
      console.log("ERROR: " + error)
    }
  }

  // RETURN COMPONENT
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Title style={styles.title}>Request a Ride</Title>
        {/* Choose Destination Button */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('MapScreen')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Choose Destination
        </Button>

        {/* Display Destination */}
        {destination && (
          <>
            <View style={styles.formGroup}>
              <Subheading>{destination.formatted_address}</Subheading>
              <Subheading>{destination.name}</Subheading>
            </View>
          </>
        )}


        {/* Date and Time */}
        <View style={styles.formGroup}>
          <Subheading>Select a Date and Time</Subheading>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="datetime"
          />
        </View>

        {/* Flexible Checkbox */}
        <View style={styles.formGroup}>
          <Subheading>Are you flexible with the time you're requesting?</Subheading>
          <View style={styles.switchContainer}>
            <Switch value={isFlexible} onValueChange={toggleIsFlexibleSwitch} />
            <Subheading style={styles.switchLabel}>
              {isFlexible ? 'Yes' : 'No'}
            </Subheading>
          </View>
        </View>

        {/* Flexible By */}
        {isFlexible && (
          <View style={styles.formGroup}>
            <Subheading>By how much are you flexible?</Subheading>
            <TextInput
              mode="outlined"
              onChangeText={handleByFlexibleTimeChange}
              value={byFlexible}
              keyboardType="numeric"
              placeholder=" 15 mins"
              style={styles.input}
            />
          </View>
        )}

        {/* Need Ride back */}
        <View style={styles.Checkbox}>
          {destination?.name && (
            <>
              <Subheading>Do you need a ride back from {destination.name}?</Subheading>
              <Checkbox
                status={needReturnRide ? 'checked' : 'unchecked'}
                onPress={() => {
                  setNeedReturnRide(!needReturnRide);
                  setWaitTime(0);
                }}
              />
            </>
          )}
        </View>

        {/* Wait Time */}
        <View style={styles.formGroup}>
          {needReturnRide ?
            <>
              <Subheading>How many minutes to wait at {destination?.name} before heading back?</Subheading>
              <TextInput
                mode="outlined"
                onChangeText={handleWaitTimeChange}
                value={waitTime}
                keyboardType="numeric"
                placeholder=" 15 mins"
                style={styles.input}
              />
            </>
            : null}
        </View>

        {/* Reccommended Offer */}
        {destination ?
          <>
            <Subheading>Reccomended offer</Subheading>
            {needReturnRide ?
              <>
                <Text>Gas Price x 2 (To and From): ${oneWayGasPrice * 2}</Text>
                <Text>We reccomend you offer at least ${oneWayGasPrice * 2}.</Text>
              </>
              :
              <>
                <Text>Gas Price: ${oneWayGasPrice}</Text>
                <Text>We reccomend you offer at least ${oneWayGasPrice}.</Text>
              </>
            }

            {(waitTime > 0) ?
              <Text>Since you're also asking for the student to wait at {destination?.name}, please take note of their valuable time and add some gratuity! 😊</Text>
              : null}
          </>
          : null}

        {/* Offer */}
        <View style={styles.formGroup}>
          {destination ?
            <>
              <Subheading>How much are you offering to pay?</Subheading>
              <TextInput
                mode="outlined"
                onChangeText={handleOfferChange}
                value={offer}
                keyboardType="numeric"
                placeholder={`$${needReturnRide ? oneWayGasPrice * 2 : oneWayGasPrice}`}
                style={styles.input}
              />
              <Text>Make your fellow Grinnellian's day by offering a generous amount, more than the covering the gas😊</Text>
            </>
            : null}
        </View>

        {/* Request Button */}
        <Button
          mode="contained"
          onPress={save}
          disabled={!destination}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Request Ride
        </Button>

      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  switchLabel: {
    marginLeft: 8,
  },
  input: {
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});