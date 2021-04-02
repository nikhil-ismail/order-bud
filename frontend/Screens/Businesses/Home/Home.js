import React, { useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import Header from "./Header";
import Banner from "../../../Shared/Banner";
import SearchBar from "../../../Shared/SearchBar";

import CategoryFilter from "./CategoryFilter";
import BusinessCard from "./BusinessCard";
import HomeFilter from "./HomeFilter";
import ViewCartButton from "../Cart/ViewCartButton";

import baseURL from "../../../assets/common/baseUrl";

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
        <SafeAreaView>
          <ScrollView>
            <Header delivery={delivery} toggleDelivery={toggleDelivery} />
            <Banner />
            <CategoryFilter navigation={props.navigation} businesses={businesses} categories={categories} />
            <SearchBar placeholder="Search..." handleFilter={handleFilter} showFilterIcon={true} />
            <View style={styles.listContainer}>
              {showFilter &&
                <HomeFilter showFilter={showFilter} handleFilter={handleFilter} />
              }
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
          // Loading
          <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
            <ActivityIndicator size="large" color="green" />
          </Container>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 4,
    marginTop: 10,
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