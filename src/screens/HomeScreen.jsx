import {View, Text, FlatList} from 'react-native'
import {AddButton} from './ButtonUtilties'
import { useState,useEffect } from 'react';
import { listRideDetails } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';

export function HomeScreen({navigation}){
    // SET STATES AND HOOKS
    const [rides, setRides]=useState([])
    useEffect(() => {
        fetchRides();
    }, []);

    // CLIENT
    const client=generateClient()

    // FETCH RIDES
    async function fetchRides(){
        try{
            const rideData= await client.graphql({
                query: listRideDetails
            })
            setRides(rideData.data.listRideDetails.items)

        } catch(error){
            
        }
    }

    // COMPONENTS
    const renderRides=({item})=>{
        <View>
            <Text>Date and Time: {item.dateTime}</Text>
            <Text>Is Flexible: {item.isFlexible}</Text>
            <Text>Flexible by: {item.byFlexible}</Text>
        </View>
    }

    function RideItem({ ride }) {
        return (
          <View>
            <Text>{ride.dateTime}</Text>
            <Text>Flexible: {ride.isFlexible ? 'Yes' : 'No'}</Text>
            {/* Display other ride details using Text components */}
          </View>
        );
      }
      
      return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text>Home</Text>
              <View>
                {rides.map(ride => (
                    <RideItem key={ride.id} ride={ride} />
                ))}
              </View>
              <AddButton />
          </View>
      );
  }