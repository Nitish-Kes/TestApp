import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined
};

export type RootStackComponent<RouteName extends keyof RootStackParamList> =
  React.FC<{
    navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
    route: RouteProp<RootStackParamList, RouteName>;
  }>;