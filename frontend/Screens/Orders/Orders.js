import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { Container } from "native-base";

import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../Redux/userSlice';

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
  const [ordersCount, setOrdersCount] = useState(0);

  const userId = useSelector(selectUserId);

  const handleMyOrdersToggle = () => {
    setMyOrdersToggle(!myOrdersToggle);
  }

  useFocusEffect(
    useCallback(() => {

        // Orders
        axios.get(`${baseURL}orders/${userId}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Api call error - getting orders')
        })

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
    <View style={{backgroundColor: "white"}}>
      <SafeAreaView>
        <ScrollView>
            <View>
              <View style={styles.headerContainer}>
                  <Text style={styles.header}>My Orders</Text>
              </View>
              <View style={{ backgroundColor: "white", marginTop: 10 }}>
                <Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 17 }}>Current</Text>
                { orders.filter(order => order.status === "Pending").map(order => {
                  return <OrderCard
                    date={order.dateOrdered}
                    coverImage={order.business.coverImage}
                    navigation={props.navigation}
                    totalPrice={order.totalPrice}
                    businesses={businesses}
                    business={order.business.name}
                    totalQuantity={order.totalQuantity}
                    order={order}
                    ordersCount={ordersCount} />
                })
                }
              </View>
              <View style={{ backgroundColor: "white", marginTop: 10 }}>
                <Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 17, marginTop: 10 }}>Completed</Text>
                { orders.filter(order => order.status !== "Pending").map(order => {
                  return <OrderCard
                    date={order.dateOrdered}
                    coverImage={order.business.coverImage}
                    navigation={props.navigation}
                    totalPrice={order.totalPrice}
                    businesses={businesses}
                    business={order.business.name}
                    totalQuantity={order.totalQuantity}
                    order={order}
                    ordersCount={ordersCount} />
                })
                }
              </View>
            </View>
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
    paddingVertical: 10
  },
  header: {
    fontWeight: "bold",
    fontSize: 24
  }
});

export default Orders;