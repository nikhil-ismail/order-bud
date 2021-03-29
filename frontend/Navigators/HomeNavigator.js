import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../Screens/Businesses/Home/Home";
import BusinessPage from "../Screens/Businesses/Business/BusinessPage";
import Checkout from "../Screens/Businesses/Checkout/Checkout";
import Login from '../Screens/User/Login';
import Search from '../Screens/Businesses/Search/Search';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Search Results'
                component={Search}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Business Page'
                component={BusinessPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Checkout'
                component={Checkout}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}