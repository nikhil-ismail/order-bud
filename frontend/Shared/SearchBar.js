import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from 'react-native-elements';

const SearchBar = (props) => {
    return(
        <View style={styles.container}>
          {props.showFilterIcon ?
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchBarFilterIcon} placeholder={props.placeholder} />
              <TouchableOpacity onPress={props.handleFilter} style={styles.filterBtn}>
                <Icon name="sliders-h" type="font-awesome-5" size={30} />
              </TouchableOpacity>
            </View>
            :
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchBar} placeholder={props.placeholder} />
            </View>
          }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: -5,
    backgroundColor: "white",
    alignItems: "center"
  },
  searchContainer: {
    marginVertical: 15,
    height: 50,
    flexDirection: "row",
    backgroundColor: "#ededed",
    borderRadius: 15,
    width: "95%"
  },
  searchBarFilterIcon: {
    width: '85%',
    height: 50,
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  filterBtn: {
    width: '15%',
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
    backgroundColor: "#ededed"
  }
})

export default SearchBar;