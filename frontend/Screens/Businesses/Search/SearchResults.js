import React, { useState, useCallback } from "react";
import { StyleSheet, Dimensions, Text, View, ActivityIndicator, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import baseURL from "../../../assets/common/baseUrl";

import SearchBar from "./SearchBar";
import SearchFilter from './SearchFilter';
import BusinessCard from '../Home/BusinessCard';
import MenuCard from '../Business/MenuCard';
import ViewCartButton from "../Cart/ViewCartButton";
import Item from '../Item/Item';

const { width, height } = Dimensions.get("window")

const SearchResults = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [showItemModal, setShowItemModal] = useState(false);
  const [query, setQuery] = useState(props.route.params.query);

  const cart = useSelector(selectCartItems);

  const numMatches = !loading && results.businessMatches.length + results.productMatches.length;

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
    }, [query])
  )

  return (
    <>
      {
        loading === false ?
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <SafeAreaView style={{flex: 1}}>
              <SearchBar
                placeholder={query}
                handleFilter={handleFilter}
                showFilterIcon={true}
                navigation={props.navigation}
                parent="results"
                handleQuery={setQuery}
              />
              {
                showFilter && <SearchFilter showFilter={showFilter} handleFilter={handleFilter} />
              }
              <ScrollView>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{numMatches} {numMatches === 1 ? "Result" : "Results"} For "{query}"</Text>
                </View>
                <View style={{backgroundColor: "#ededed"}}>
                  {
                    results.businessMatches.length > 0 &&
                    <View style={{backgroundColor: "white", marginTop: 10, paddingVertical: 20}}>
                      <View style={styles.matchesHeaderContainer}>
                        <Text style={styles.matchesHeader}>Business Matches</Text>
                      </View>
                      <ScrollView
                        horizontal={results.productMatches.length === 0 ? false : true}
                      >
                        {
                          (
                            results.businessMatches.map(business => {
                              return (
                                <View
                                  style={[
                                    { alignItems: "center" },
                                    (results.productMatches.length === 0 || results.businessMatches.length === 1) 
                                    ? { width: width } : { width: 0.9 * width }
                                  ]}
                                >
                                  <BusinessCard key={business.name} business={business} navigation={props.navigation} />
                                </View>
                              )
                            })
                          )
                        }
                      </ScrollView>
                    </View>
                  }
                  {
                    results.productMatches.length > 0 &&
                    <View style={results.businessMatches.length > 0 && {marginTop: 15}}>
                      <View style={[styles.matchesHeaderContainer, { marginBottom: -1, paddingTop: 20 }]}>
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
                </View>
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
          </View>
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
    paddingBottom: 10,
    paddingLeft: 25,
  },
  matchesHeader: {
    fontWeight: "bold",
    fontSize: 24,
    color: "grey"
  }
})

export default SearchResults;