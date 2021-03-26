import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Icon } from 'react-native-elements'

// Stacks
import HomeNavigator from "./HomeNavigator";
import OrdersNavigator from "./OrdersNavigator";
import LearnNavigator from "./LearnNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {

  const isAdmin = false;


  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "green",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" type="font-awesome-5" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="receipt" type="font-awesome-5" color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="book-open" type="font-awesome-5" color={color} size={30} />
            </View>
          ),
        }}
      />
      
      {isAdmin == true ? (
        <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
      ): null }
      
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user-circle" type="font-awesome-5" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;