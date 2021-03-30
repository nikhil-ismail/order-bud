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
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {myOrdersToggle ?
            <View>
              <View style={styles.headerContainer}>
                <View style={styles.ordersToggle}>
                  <TouchableOpacity style={styles.myOrdersSelected}>
                    <Text style={styles.ordersToggleSelected}>My Orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleMyOrdersToggle} style={styles.friendsOrderUnSelected}>
                    <Text style={styles.ordersToggleUnSelected}>Friend Orders</Text>
                  </TouchableOpacity>
                </View>
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
            :
            <View>
              <View style={styles.headerContainer}>
                <View style={styles.ordersToggle}>
                  <TouchableOpacity onPress={handleMyOrdersToggle} style={styles.myOrdersUnSelected}>
                    <Text style={styles.ordersToggleUnSelected}>My Orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.friendsOrderSelected}>
                    <Text style={styles.ordersToggleSelected}>Friend Orders</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ backgroundColor: "white", marginTop: 20 }}>
                <FriendOrderCard businesses={businesses} navigation={props.navigation} />
                <FriendOrderCard businesses={businesses} navigation={props.navigation} />
                <FriendOrderCard businesses={businesses} navigation={props.navigation} />
                <FriendOrderCard businesses={businesses} navigation={props.navigation} />
                <FriendOrderCard businesses={businesses} navigation={props.navigation} />
              </View>
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    </View>
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
    paddingBottom: 15
  },
  ordersToggle: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10
  },
  myOrdersSelected: {
    backgroundColor: "rgba(0, 128, 0, 0.75)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 1,
    borderRightColor: "grey"
  },
  myOrdersUnSelected: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 1,
    borderRightColor: "grey"
  },
  friendsOrderSelected: {
    backgroundColor: "rgba(0, 128, 0, 0.75)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  friendsOrderUnSelected: {
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  ordersToggleSelected: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 10,
    marginVertical: 10
  },
  ordersToggleUnSelected: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 10,
    marginVertical: 10
  }
});

export default Orders;