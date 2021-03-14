import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Cart from '../Screens/Products/ProductContainer';

const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}