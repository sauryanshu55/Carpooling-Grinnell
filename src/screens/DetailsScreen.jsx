import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { generateClient } from 'aws-amplify/api';
import { createRideDetails } from '../graphql/mutations';
import { Button, Switch, TextInput, Title, Subheading, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native'

export function DetailsScreen({ navigation }) {

  // SET STATES
  const [date, setDate] = useState(new Date())
  const [isFlexible, setIsFlexible] = useState(false)
  const toggleIsFlexibleSwitch = () => setIsFlexible(previousState => !previousState);
  const [byFlexible, setByFlexible] = useState("");
  const handleByFlexibleTimeChange = (text) => { setByFlexible(text.replace(/[^0-9]/g, "")) };

  const route = useRoute();
  const destination = route.params?.selectedDestination

  // CLIENT
  const client = generateClient();

  // SAVE
  const save = async () => {
    try {
      const rideDetails = {
        dateTime: date.toISOString(),
        isFlexible: isFlexible,
        byFlexible: isFlexible ? parseInt(byFlexible) : null
      }

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
          <Subheading>{destination.formatted_address}</Subheading>
          <Subheading>{destination.name}</Subheading>
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

      {/* Request Button */}
      <Button
        mode="contained"
        onPress={save}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Request Ride
      </Button>

    </View>
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