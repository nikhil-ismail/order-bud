import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
import baseUrl from "../../assets/common/baseUrl"
import axios from 'axios';
import { Icon } from 'react-native-elements'

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import baseURL from "../../assets/common/baseUrl";

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true)

  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);
        setActive(-1);

        // Products
        axios
          .get(`${baseURL}products`)
          .then((res) => {
            setProducts(res.data);
            setProductsFiltered(res.data);
            setProductsCtg(res.data);
            setInitialState(res.data);
            setLoading(false)
          })
          .catch((error) => {
            console.log('Api call error')
          })

        // Categories
        axios
          .get(`${baseURL}categories`)
          .then((res) => {
            setCategories(res.data)
          })
          .catch((error) => {
            console.log('Api call error')
          })

        return () => {
          setProducts([]);
          setProductsFiltered([]);
          setFocus();
          setCategories([]);
          setActive();
          setInitialState();
        };
      },
      [],
    )
  ))

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
          setProductsCtg(
            products.filter((i) => i.category._id === ctg),
            setActive(true)
          ),
        ];
    }
  };

  return (
    <>
      {loading == false ? (
        <Container>
          {focus == true ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered} />
          ) : (
              <ScrollView>
                <SafeAreaView>
                  <Banner />
                </SafeAreaView>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
                <View style={styles.listContainer}>
                  <View style={styles.deliverPickup}>
                    <TouchableOpacity style={styles.deliverPickupDetails}>
                      <Text style={styles.deliverPickupDetailsText}>Deliver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deliverPickupDetails}>
                      <Text style={styles.deliverPickupDetailsText}>400B Albert Street</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deliverPickupDetails}>
                      <Text style={styles.deliverPickupDetailsText}>Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.searchContainer}>
                    <TextInput style={styles.searchBar} placeholder="Search..."></TextInput>
                    <TouchableOpacity style={styles.filterBtn}>
                      <Icon name="sliders-h" type="font-awesome-5" size={30} />
                    </TouchableOpacity>
                  </View>
                  {productsCtg.map((item) => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={item.name}
                        item={item}
                      />
                    )
                  })}
                </View>
              </ScrollView>
            )}
        </Container>
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ededed",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 8,
  },
  deliverPickup: {
    width: '90%',
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  deliverPickupDetails: {
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 7.5,
    borderRadius: 15,
    backgroundColor: "green"
  },
  deliverPickupDetailsText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  searchContainer: {
    width: '95%',
    marginVertical: 20,
    height: 50,
    flexDirection: "row"
  },
  searchBar: {
    width: '85%',
    height: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRightWidth: 1,
    borderRightColor: "#ededed"
  },
  filterBtn: {
    width: '15%',
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductContainer;
