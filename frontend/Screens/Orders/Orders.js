import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { Container } from "native-base";

import OrderCard from './OrderCard';
import FriendOrderCard from './FriendOrderCard';

import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import baseURL from "../../assets/common/baseUrl";

var { height } = Dimensions.get("window");

const Orders = (props) => {
  const [loading, setLoading] = useState(false);
  const [myOrdersToggle, setMyOrdersToggle] = useState(true);

  const [orders, setOrders] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  const handleMyOrdersToggle = () => {
    setMyOrdersToggle(!myOrdersToggle);
  }

  useFocusEffect(
    useCallback(() => {

        // Orders
        axios.get(`${baseURL}orders`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Api call error - orders')
        })

        //Businesses
        axios.get(`${baseURL}businesses`)
        .then((res) => {
          setBusinesses(res.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log('Api call error - businesses')
        })

        return () => {
          setOrders([]);
          setBusinesses([]);
        };

      }, [])
  )

  return (
      <SafeAreaView>
        <ScrollView>
            <View>
              <View style={styles.headerContainer}>
                  <Text style={styles.header}>My Orders</Text>
              </View>
              <View style={{ backgroundColor: "white", marginTop: 10 }}>
                <Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 25, marginTop: 15 }}>Current</Text>
                {
                  orders.map(order => {
                    return <OrderCard businesses={businesses} navigation={props.navigation} order={order} />
                  })
                }
              </View>
              <View style={{ backgroundColor: "white", marginTop: 10 }}>
                <Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 25, marginTop: 15 }}>Completed</Text>
                {
                  orders.map(order => {
                    return <OrderCard businesses={businesses} navigation={props.navigation} order={order} />
                  })
                }
              </View>
            </View>
        </ScrollView>
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: height
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    paddingVertical: 15
  },
  header: {
    fontWeight: "bold",
    fontSize: 24
  }
});

export default Orders;