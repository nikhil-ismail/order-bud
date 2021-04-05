import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../Screens/User/User';
import Friends from '../Screens/User/Friends/Friends';
import Payment from '../Screens/User/Payment';
import PersonalInformation from '../Screens/User/PersonalInformation/PersonalInformation';
import Addresses from '../Screens/User/Addresses/Addresses';
import Notifications from '../Screens/User/Notifications';
import Privacy from '../Screens/User/Privacy';
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
                name="Friends"
                component={Friends}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Payment"
                component={Payment}
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
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Privacy"
                component={Privacy}
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