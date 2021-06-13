import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../Screens/User/User';
import PersonalInformation from '../Screens/User/PersonalInformation/PersonalInformation';
import Addresses from '../Screens/User/Addresses/Addresses';
import EnterAddress from "../Screens/Businesses/Home/EnterAddress";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="User"
                component={Profile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Personal Information"
                component={PersonalInformation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Addresses"
                component={Addresses}
                options={{
                    headerShown: false
                }}
            /> 
            <Stack.Screen 
                name="Enter Address"
                component={EnterAddress}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}