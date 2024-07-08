import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParameterList={
    Home: undefined,
    Details: undefined
}

export type HomeScreenNavigationProp=NativeStackScreenProps<RootStackParameterList,'Home'>;
export type DetailsScreenNavigationProp=NativeStackScreenProps<RootStackParameterList,'Details'>;

export type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
  };
  
export type DetailsScreenProps = {
    navigation: DetailsScreenNavigationProp;
 };