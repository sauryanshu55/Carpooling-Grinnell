import { View, Text, ScrollView } from 'react-native'
import { AddButton } from './components/ButtonUtilties'
import { useState, useEffect } from 'react';
import { listIdleRides } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { RideCard } from './components/RideCard'

export function HomeScreen({ navigation }) {
  // SET STATES AND HOOKS
  const [rides, setRides] = useState(null);
  const [loading, setLoading] = useState(true);

  // CLIENT
  const client = generateClient();

  // FETCH RIDES
  useEffect(() => {
    async function fetchRides() {
      try {
        const rideData = await client.graphql({
          query: listIdleRides,
        });
        console.log(rideData)
        setRides(rideData.data.listRideDetails.items)
      }
      catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    }
    fetchRides();
  }, []);


  return (
    <PaperProvider theme={theme}>
      {loading ? (
        <Text>Loading</Text>
      ) : rides && rides.length > 0 ? (
        <ScrollView>
          {rides.map((ride, index) => (
            <RideCard
              key={index}
              date={formatDateTime(ride.dateTime).date}
              time={formatDateTime(ride.dateTime).time}
              location={
                (ride.destination.address.toLowerCase().slice(0,5) == ride.destination.name.toLowerCase().slice(0,5) ?
                  ride.destination.address 
                  :
                  `${ride.destination.name}\n${ride.destination.address}`
                )
              }
              price={ride.offer}
              requestedBy={ride.user.name}
              duration={ride.duration}
              additionalInfo={ride.needReturnRide ? `Need ride back to Grinnll. \n Wait at stop for ${ride.waitTime} mins.` : ""}
              flexibleBy={ride.isFlexible ? `Flexible with time ± ${ride.byFlexible} mins` : ``}
            />
          ))}
        </ScrollView>
      ) : (
        <Text>No rides found</Text>
      )}


      <View style={{ flex: 1, justifyContent: 'center' }}>
        <AddButton />
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const dayOfMonth = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[date.getMonth()];

  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 

  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${monthName} ${dayOfMonth}`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return { date: formattedDate, time: formattedTime };
}

