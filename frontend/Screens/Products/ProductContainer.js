import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Animated, FlatList } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from '@react-navigation/native'
import baseUrl from "../../assets/common/baseUrl"
import axios from 'axios';
import { Icon, BottomSheet, withTheme } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import baseURL from "../../assets/common/baseUrl";

var { height, width } = Dimensions.get('window')

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showAddToCart, setShowAddToCart] = useState(false);

  const showBottomSheet = () => {
    setShowAddToCart(!showAddToCart);
  }

  const goToCheckout = () => {
    setShowAddToCart(!showAddToCart);
    props.navigation.navigate('Checkout');
  }

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
        <Container style={{ justifyContent: "center" }}>
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
                {
                  showAddToCart &&
                  <BottomSheet
                    isVisible={showAddToCart}
                    containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0)' }}
                  >
                    <View style={styles.bottomSheet}>
                      <View style={styles.cartHeaderContainer}>
                        <TouchableOpacity style={styles.cartBackBtn} onPress={showBottomSheet}>
                          <Icon name="arrow-left" type="font-awesome-5" color="black" size={17.5} />
                        </TouchableOpacity>
                        <Text style={styles.yourOrderHeader}>Your Order</Text>
                      </View>
                      <FlatList
                        data={[{ id: 1, name: "Blue Dream", price: 55.00 }, { id: 2, name: "Jack Herer Pre-Rolls (3-pack)", price: 35.00 }]}
                        renderItem={({ item }) => (
                          <Swipeable
                            keyExtractor={(item) => item.id}
                            renderRightActions={() => (
                              <TouchableOpacity onPress={() => alert("Deleted")}>
                                <View style={styles.rightAction}>
                                  <Animated.Text style={[styles.actionText]}>Delete</Animated.Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          >
                            <View style={styles.itemContainer}>
                              <Text style={styles.cartItemText}>{item.name}</Text>
                              <Text style={styles.cartItemText}>${item.price}</Text>
                            </View>
                          </Swipeable>
                        )}
                      />
                      <View style={{ alignItems: "center" }}>
                        <TouchableOpacity style={styles.checkoutBtn} onPress={goToCheckout}>
                          <View style={styles.cartIcon}>
                            <Icon name="shopping-cart" type="font-awesome-5" color="white" size={22} />
                            <View style={styles.cartNumItemsContainer}>
                              <Text style={styles.cartNumItems}>2</Text>
                            </View>
                          </View>
                          <Text style={styles.viewCartText}>Continue</Text>
                          <Text style={styles.viewCartText}>$90.00</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </BottomSheet>
                }
              </ScrollView>
            )}
          <TouchableOpacity style={styles.viewCart} onPress={showBottomSheet}>
            <View style={styles.cartIcon}>
              <Icon name="shopping-cart" type="font-awesome-5" color="white" size={22} />
              <View style={styles.cartNumItemsContainer}>
                <Text style={styles.cartNumItems}>2</Text>
              </View>
            </View>
            <Text style={styles.viewCartText}>View Cart</Text>
            <Text style={styles.viewCartText}>$90.00</Text>
          </TouchableOpacity>
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
  },
  viewCart: {
    position: "absolute",
    backgroundColor: "green",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "95%",
    bottom: 15,
    left: (width - 0.95 * width) / 2
  },
  viewCartText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10
  },
  cartNumItems: {
    color: "green",
    fontWeight: "bold",
  },
  cartIcon: {
    flexDirection: "row"
  },
  cartNumItemsContainer: {
    backgroundColor: "white",
    height: 18,
    width: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -5,
    marginLeft: -6
  },
  cartBackBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    marginBottom: 15
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 2.5,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  cartItemText: {
    fontSize: 16
  },
  proceedToCheckout: {
    backgroundColor: "green",
    width: "90%",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  proceedCheckoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22
  },
  rightAction: {
    backgroundColor: "red",
    marginVertical: 2.5,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  checkoutBtn: {
    backgroundColor: "green",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "95%",
    marginTop: 20
  },
  yourOrderHeader: {
    fontSize: 28,
    fontWeight: "bold"
  },
  cartHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default ProductContainer;