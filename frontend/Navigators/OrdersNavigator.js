import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Orders/Orders";
import BusinessPage from "../Screens/Businesses/Business/BusinessPage";
import Receipt from '../Screens/Orders/Receipt';
import RateOrder from '../Screens/Orders/RateOrder';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Orders'
                component={Orders}
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
                name='Receipt'
                component={Receipt}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Rate Order'
                component={RateOrder}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function OrdersNavigator() {
    return <MyStack />;
}