import React, { useState, useCallback } from "react";
import { StyleSheet, Dimensions, Text, View, ActivityIndicator, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import baseURL from "../../../assets/common/baseUrl";

import SearchBar from '../../../Shared/SearchBar';
import SearchFilter from './SearchFilter';
import BusinessCard from '../Home/BusinessCard';
import MenuCard from '../Business/MenuCard';
import ViewCartButton from "../Cart/ViewCartButton";
import Item from '../Item/Item';

const { width } = Dimensions.get("window")

const SearchResults = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [showItemModal, setShowItemModal] = useState(false);

  const { query } = props.route.params;

  const cart = useSelector(selectCartItems);

  let numMatches = !loading && results.businessMatches.length + results.productMatches.length;

  const handleFilter = () => {
    setShowFilter(!showFilter);
  }

  const handleShowItemModal = (product) => {
    setProduct(product)
    setShowItemModal(true);
  }

  const handleRemoveItemModal = () => {
    setProduct();
    setShowItemModal(false);
  }

  useFocusEffect(
    useCallback(() => {
      axios.get(`${baseURL}search/?searchTerm=${query}`)
        .then(res => {
          setResults(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log("API call error - search results")
        })

      return () => {
        setResults({
          businessMatches: [],
          productMatches: []
        });
      }
    }, [])
  )

  return (
    <>
      {
        loading === false ?
          <SafeAreaView>
            <ScrollView>
              <SearchBar placeholder={query} handleFilter={handleFilter} showFilterIcon={true} />
              {
                showFilter && <SearchFilter showFilter={showFilter} handleFilter={handleFilter} />
              }
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{numMatches} {numMatches === 1 ? "result" : "results"} for "{query}"</Text>
              </View>
              {
                results.businessMatches.length > 0 &&
                <View>
                  <View style={styles.matchesHeaderContainer}>
                    <Text style={styles.matchesHeader}>Business Matches</Text>
                  </View>
                  <ScrollView
                    horizontal={results.productMatches.length === 0 ? false : true}
                    contentContainerStyle={{ paddingLeft: 10 }}
                  >
                    {
                      (
                        results.businessMatches.map(business => {
                          console.log(business);
                          return (
                            <BusinessCard key={business.name} business={business} navigation={props.navigation} />
                          )
                        })
                      )
                    }
                  </ScrollView>
                </View>
              }
              {
                results.productMatches.length > 0 &&
                <View>
                  <View style={[styles.matchesHeaderContainer, { marginTop: 10, marginBottom: -1 }]}>
                    <Text style={styles.matchesHeader}>Product Matches</Text>
                  </View>
                  <View>
                    {
                      results.productMatches.map(product => {
                        return (
                          <MenuCard
                            product={product}
                            handleShowItemModal={handleShowItemModal}
                          />
                        )
                      })
                    }
                  </View>
                </View>
              }
            </ScrollView>
            <Item
              showItemModal={showItemModal}
              product={product}
              handleRemoveItemModal={handleRemoveItemModal}
              navigation={props.navigation}
            />
            {
              cart.length > 0 &&
              <ViewCartButton navigation={props.navigation} />
            }
          </SafeAreaView>
          :
          <View style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
            <ActivityIndicator size="large" color="green" />
          </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "white",
    paddingLeft: 25,
    paddingBottom: 18,
    paddingTop: 5
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  matchesHeaderContainer: {
    width: width,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 25
  },
  matchesHeader: {
    fontWeight: "bold",
    fontSize: 24,
    color: "grey"
  }
})

export default SearchResults;