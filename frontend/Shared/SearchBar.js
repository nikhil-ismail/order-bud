import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from 'react-native-elements';

const SearchBar = (props) => {
    return(
        <View>
          {props.showFilterIcon ?
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchBarFilterIcon} placeholder="Search..." />
              <TouchableOpacity onPress={props.handleFilter} style={styles.filterBtn}>
                <Icon name="sliders-h" type="font-awesome-5" size={30} />
              </TouchableOpacity>
            </View>
            :
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchBar} placeholder="Search..." />
            </View>
          }
        </View>
    )
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    marginVertical: 20,
    height: 50,
    flexDirection: "row"
  },
  searchBarFilterIcon: {
    width: '85%',
    height: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRightWidth: 1,
    borderRightColor: "#ededed"
  },
  searchBar: {
    width: '100%',
    height: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRightWidth: 1,
    borderRightColor: "#ededed"
  },
  filterBtn: {
    width: '15%',
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
  }
})

export default SearchBar;