import { useState } from 'react';
import {View,Text,Button,Switch, TextInput} from 'react-native'
import DatePicker from 'react-native-date-picker'

export function DetailsScreen({navigation}){

    const [date,setDate]=useState(new Date())
    const [isFlexible,setIsFlexible]=useState(false)
    const toggleIsFlexibleSwitch = () => setIsFlexible(previousState => !previousState);
    const [byFlexible, setByFlexible] = useState(""); 
    const handleByFlexibleTimeChange = (text) => { setByFlexible(text.replace(/[^0-9]/g, ""))}; 

    
    return (
        <View>
            {/* Date and Time */}
            <DatePicker date={date} onDateChange={setDate}/>    

            {/* Flexible Checkbox */}
            <Switch value={isFlexible} onValueChange={toggleIsFlexibleSwitch}/>

            {/* Flexible By */}
            {isFlexible ? (
                <TextInput 
                    onChangeText={handleByFlexibleTimeChange} value={byFlexible} keyboardType="numeric" placeholder="15 mins"
                />
            ) : null}        
        </View>
    );
}
  