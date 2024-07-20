import { useState } from 'react';
import {View,Text,Button,Switch, TextInput} from 'react-native'
import DatePicker from 'react-native-date-picker'
import { generateClient } from 'aws-amplify/api';
import { createRideDetails } from '../graphql/mutations';
import { ChooseDestinationButton } from './ButtonUtilties';

export function DetailsScreen({navigation}){

    // SET STATES
    const [date,setDate]=useState(new Date())
    const [isFlexible,setIsFlexible]=useState(false)
    const toggleIsFlexibleSwitch = () => setIsFlexible(previousState => !previousState);
    const [byFlexible, setByFlexible] = useState(""); 
    const handleByFlexibleTimeChange = (text) => { setByFlexible(text.replace(/[^0-9]/g, ""))}; 
    const [unit, setUnit]=useState('mins')

    // CLIENT
    const client=generateClient();

    // SAVE
    const save=async()=>{
        try{
            const rideDetails={
                dateTime: date.toISOString(),
                isFlexible: isFlexible,
                byFlexible: isFlexible? parseInt(byFlexible): null
            }
            
            const result= await client.graphql({
                query: createRideDetails,
                variables: { input: rideDetails}
            })
            
            console.log("SAVED")
        } catch(error){
            console.log("ERROR: " + error)
        }
    }
    
    // RETURN COMPONENT
    return (
        <View>
            {/* Date and Time */}
            <DatePicker date={date} onDateChange={setDate}/>    

            {/* Flexible Checkbox */}
            <Switch value={isFlexible} onValueChange={toggleIsFlexibleSwitch}/>

            {/* Flexible By */}
            {isFlexible && (
                <TextInput 
                    onChangeText={handleByFlexibleTimeChange} value={byFlexible} keyboardType="numeric" placeholder="15 mins"
                />
            )}

            {/* Choose Destination */}
            <ChooseDestinationButton/>

            {/* Reuest Button */}
            <Button title='Request Ride' onPress={save}/>

        </View>
    );
}
  