import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from "./types";
import SignIn from "../screens/signin/SignIn";
import { getData } from "../utils/DataUtils";
import Home from "../screens/home/Home";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const [initialRoute, setInitialRoute] = useState<any>('SignIn')

    useEffect(()=>{
        const checkLoginStatus = async () => {
            try {
              const isLoggedIn = await getData('isLoggedIn'); 
              setInitialRoute(isLoggedIn ? 'Home' : 'SignIn');
            } catch (e) {
              console.error('Error reading async data', e);
            } finally {
              setIsLoading(false); 
            }
          };
      
          checkLoginStatus();
    },[])

    if(isLoading){
    return ( 
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )}

    return(
        <NavigationContainer>
         <Stack.Navigator 
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: true }}
         >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Home" component={Home}/>
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})