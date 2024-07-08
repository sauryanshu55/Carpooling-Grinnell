import {
    View,
    Text,
    Button
} from 'react-native'

export function HomeScreen({navigation}){
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Home</Text>
            <Button title='Go to details page' onPress={()=>navigation.navigate('Details')}/>
        </View>
      );
  }
  