import React, { useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Text, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';
import { selectUserDetails } from '../../../Redux/userSlice';

import Header from "./Header";
import Banner from "./Banner";

import CategoryFilter from "./CategoryFilter";
import BusinessCard from "./BusinessCard";
import HomeFilter from "./HomeFilter";
import ViewCartButton from "../Cart/ViewCartButton";
import SearchBar from "../Search/SearchBar";

import baseURL from "../../../assets/common/baseUrl";

const { width, height } = Dimensions.get("window")

const ProductContainer = (props) => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false);
  const [delivery, setDelivery] = useState(true)

  const cart = useSelector(selectCartItems);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  }

  const toggleDelivery = () => {
    setDelivery(!delivery);
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
          console.log('Api call error - businesses')
        })

      // Categories
      axios.get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data)
        })
        .catch((error) => {
          console.log('Api call error - categories')
        })

      return () => {
        setBusinesses([]);
        setCategories([]);
      };
    }, [])
  )

  return (
    <>
      {loading === false ? (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <Header
              delivery={delivery}
              toggleDelivery={toggleDelivery}
              navigation={props.navigation}
            />
            <ScrollView>
              <Banner />
              <CategoryFilter
                navigation={props.navigation}
                businesses={businesses}
                categories={categories}
              />
              <SearchBar
                placeholder="Search..."
                handleFilter={handleFilter}
                showFilterIcon={true}
                navigation={props.navigation}
                parent="home"
              />
              <View style={styles.separator} />
              <Text style={styles.header}>Your Local Dispensaries</Text>
              <View style={styles.listContainer}>
                {businesses.map(business => {
                  if (delivery && business.delivery || !delivery && business.pickup) {
                    return (
                      <BusinessCard key={business.name} business={business} navigation={props.navigation} />
                    )
                  }
                })}
              </View>
            </ScrollView>
          {
            cart.length > 0 &&
            <ViewCartButton navigation={props.navigation} />
          }
        </SafeAreaView>
      ) : (
          <View style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
            <ActivityIndicator size="large" color="green" />
          </View>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: "center",
    elevation: 8,
    paddingVertical: 15
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    backgroundColor: "#ededed",
    height: 15
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
    marginLeft: (width - 0.925 * width) / 2
  }
});

export default ProductContainer;