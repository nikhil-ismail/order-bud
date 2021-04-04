import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from 'react-native-elements';

const SearchBar = (props) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (props.parent === "results") {
      props.handleQuery(query);
    }
    setQuery('')
    props.navigation.navigate("Search Results", { query })
  }

  return (
    <View style={styles.container}>
      {props.showFilterIcon ?
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBarFilterIcon}
            placeholder={props.placeholder}
            name="search"
            value={query}
            onChangeText={text => setQuery(text)}
            onSubmitEditing={handleSubmit}
            autoCapitalize={false}
          />
        </View>
        :
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBarFilterIcon}
            placeholder={props.placeholder}
            name="search"
            value={query}
            onChangeText={text => setQuery(text)}
            onSubmitEditing={handleSubmit}
            autoCapitalize={false}
          />
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
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRightWidth: 1,
    borderRightColor: "#ededed"
  },
  searchBar: {
    width: '100%',
    height: 50,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  filterBtn: {
    width: '15%',
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    backgroundColor: "#ededed"
  }
})

export default SearchBar;