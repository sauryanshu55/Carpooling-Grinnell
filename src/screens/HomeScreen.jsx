import {
    View,
    Text,
    Button
} from 'react-native'
import {
    AddButton
} from './ButtonUtilties'

export function HomeScreen({navigation}){
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Home</Text>
            <AddButton/>
        </View>
      );
  }
  