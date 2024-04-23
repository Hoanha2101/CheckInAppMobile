import React,{ Component } from 'react';
import {
    View,
    Text,
    SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import WheelOfFortune from 'react-native-wheel-of-fortune';

import CheckInPage from './checkin_page';
import InputPage from './input_page';
import GiftBox from './giftbox';
import ShowInfoPage from './show_info';
import SignUpAdvisePage from './signupadvise'

const Stack = createNativeStackNavigator();

export default RootComponent = function () {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CheckInPage" screenOptions={{headerShown: false}}>
                <Stack.Screen name="CheckInPage" component={CheckInPage}/>
                <Stack.Screen name="SignUpAdvisePage" component={SignUpAdvisePage}/>
                <Stack.Screen name="InputPage" component={InputPage}/>
                <Stack.Screen name="GiftBox" component={GiftBox}/>
                <Stack.Screen name="ShowInfoPage" component={ShowInfoPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}