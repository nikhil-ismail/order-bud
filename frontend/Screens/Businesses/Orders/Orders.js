import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Touchable } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import baseURL from "../../../assets/common/baseUrl";
import { TouchableOpacity } from "react-native-gesture-handler";

import OrderCard from './OrderCard';
import FriendOrderCard from './FriendOrderCard';

const Orders = (props) => {
  const [loading, setLoading] = useState(false);
  const [myOrdersToggle, setMyOrdersToggle] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const handleMyOrdersToggle = () => {
    setMyOrdersToggle(!myOrdersToggle);
  }

  return (
    <>
      {loading == false ? (
        <SafeAreaView>
          <ScrollView>
            { myOrdersToggle ?
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Orders</Text>
                    <View style={styles.ordersToggle}>
                        <TouchableOpacity style={styles.myOrdersSelected}>
                            <Text style={styles.ordersToggleSelected}>My Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleMyOrdersToggle} style={styles.friendsOrderUnSelected}>
                            <Text style={styles.ordersToggleUnSelected}>Friend Orders</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: "white", marginTop: 20}}>
                    <Text style={{fontSize: 21, fontWeight: "bold", marginLeft: 25, marginTop: 15}}>Current</Text>
                    <OrderCard />
                </View>
                <View style={{backgroundColor: "white", marginTop: 10}}>
                    <Text style={{fontSize: 21, fontWeight: "bold", marginLeft: 25, marginTop: 15}}>Completed</Text>
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </View>
            </View>
            :
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Orders</Text>
                    <View style={styles.ordersToggle}>
                        <TouchableOpacity onPress={handleMyOrdersToggle} style={styles.myOrdersUnSelected}>
                            <Text style={styles.ordersToggleUnSelected}>My Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.friendsOrderSelected}>
                            <Text style={styles.ordersToggleSelected}>Friend Orders</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: "white", marginTop: 20}}>
                    <FriendOrderCard />
                    <FriendOrderCard />
                    <FriendOrderCard />
                    <FriendOrderCard />
                    <FriendOrderCard />
                </View>
            </View>
            }
          </ScrollView>
        </SafeAreaView>
      ) : (
          // Loading
          <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
            <ActivityIndicator size="large" color="green" />
          </Container>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15
  },
  ordersToggle: {
    flexDirection: "row",
    marginTop: 20
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
    marginHorizontal: 15,
    marginVertical: 25
  },
  ordersToggleUnSelected: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 15,
    marginVertical: 25
  }
});

export default Orders;