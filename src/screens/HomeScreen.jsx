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
              date=""
              time=""
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

function formatDateTime(datetime) {
  const optionsDate = { month: 'long', day: 'numeric' };
  const optionsTime = { hour: 'numeric', minute: 'numeric' };

  const formattedDate = datetime.toLocaleDateString('en-US', optionsDate)
    .replace(/(\d+)/, (match) => {
      const day = parseInt(match);
      const suffix = 
        day === 1 ? 'st' :
        day === 2 ? 'nd' :
        day === 3 ? 'rd' : 'th';
      return match + suffix;
    });

  const formattedTime = datetime.toLocaleTimeString('en-US', optionsTime);

  return { date: formattedDate, time: formattedTime };
}
