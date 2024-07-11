import { useState } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native'
import DatePicker from 'react-native-date-picker'

export function DetailsScreen({navigation}){

    const [date,setDate]=useState(new Date())

    return (
        <Text>
            {/* Date and Time */}
            <DatePicker date={date} onDateChange={setDate}/>    
            <Text>{date.toTimeString()}</Text>
        </Text>
      );
  }
  