import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import User from '../Screens/User/User'

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="User"
                component={User}
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