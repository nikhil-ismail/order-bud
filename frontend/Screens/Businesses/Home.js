import React, { useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import Header from "../../Shared/Header";
import Banner from "../../Shared/Banner";
import SearchBar from "../../Shared/SearchBar";
import ViewCartButton from "../../Shared/ViewCartButton";

import CategoryFilter from "./CategoryFilter";
import BusinessCard from "./BusinessCard";
import Cart from "./Cart";

import baseURL from "../../assets/common/baseUrl";


const ProductContainer = (props) => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showAddToCart, setShowAddToCart] = useState(false);

  const showBottomSheet = () => {
    setShowAddToCart(!showAddToCart);
  }

  const goToCheckout = () => {
    setShowAddToCart(!showAddToCart);
    props.navigation.navigate('Checkout');
  }

  useFocusEffect(
    useCallback(() => {

        // Businesses
        axios.get(`${baseURL}businesses`)
        .then((res) => {
          setBusinesses(res.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log('Api call error')
        })

        // Categories
        axios.get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data)
        })
        .catch((error) => {
          console.log('Api call error')
        })

        return () => {
          setBusinesses([]);
          setCategories([]);
        };
      }, [])
  )

  const viewCartBtn = {
    position: "absolute",
    bottom: 15
  }

  return (
    <>
      {loading == false ? (
        <SafeAreaView>
          <ScrollView>
            <Header />
            <Banner />
            <CategoryFilter categories={categories} />
            <View style={styles.listContainer}>
              <SearchBar />
              {businesses.map(business => {
                return (
                  <BusinessCard key={business.name} business={business} navigation={props.navigation} />
                )
              })}
            </View>
            {
              showAddToCart &&
              <Cart showBottomSheet={showBottomSheet} showAddToCart={showAddToCart} goToCheckout={goToCheckout}/>
            }
          </ScrollView>
          <ViewCartButton parentStyle={viewCartBtn} showBottomSheet={showBottomSheet} />
        </SafeAreaView>
      ) : (
          // Loading
          <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
            <ActivityIndicator size="large" color="red" />
          </Container>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 4,
    alignItems: "center",
    backgroundColor: "#ededed",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 8,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductContainer;