import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Dimensions, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import baseURL from "../../../assets/common/baseUrl";

import SearchBar from '../../../Shared/SearchBar';
import SearchFilter from './SearchFilter';

var { width } = Dimensions.get("window")

const SearchResults = (props) => {

  const [showFilter, setShowFilter] = useState(false);

  const { category } = props.route.params;

  const handleFilter = () => {
    setShowFilter(!showFilter);
  }
    
    return (
        <SafeAreaView>
          <ScrollView>
            <View style={{marginTop: 15}}>
              <SearchBar placeholder={category} handleFilter={handleFilter} showFilterIcon={true} />
              {showFilter &&
                  <SearchFilter showFilter={showFilter} handleFilter={handleFilter} />
              }
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>80 results for "{category}"</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "white",
    paddingLeft: 19,
    paddingBottom: 18,
    paddingTop: 5
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  }
})

export default SearchResults;