import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, SafeAreaView, TextInput, Modal, Pressable, TouchableOpacity } from "react-native";
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
  const [loading, setLoading] = useState(true);
  const [pickup, setPickup] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

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

  const changeOrderMethod = () => {
    setPickup(!pickup);
  }

  const changePickupView = () => {
    setMapView(!mapView);
  }

  const changeAddress = () => {
    setShowAddressModal(!showAddressModal);
  }

  const confirmAddress = () => {
    //setAddress()
    setShowAddressModal(!showAddressModal);
  }

  const changeSchedule = () => {
    setShowScheduleModal(!showScheduleModal);
  }

  const confirmSchedule = () => {
    //scheduleOrder()
    setShowScheduleModal(!showScheduleModal);
  }

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
                    {
                      pickup ?
                      <Text onPress={changeOrderMethod} style={styles.deliverPickupDetailsText}>Pickup</Text>
                      :
                      <Text onPress={changeOrderMethod} style={styles.deliverPickupDetailsText}>Delivery</Text>
                    }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deliverPickupDetails}>
                      <Text onPress={changeAddress} style={styles.deliverPickupDetailsText}>400B Albert Street</Text>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showAddressModal}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setShowAddressModal(!showAddressModal);
                      }}
                      >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>Set your delivery address</Text>
                          <TextInput style={styles.addressSearchBar} placeholder="Enter address..."></TextInput>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={(text) => confirmAddress(text)}
                          >
                            <Text style={styles.textStyle}>Confirm Address</Text>
                          </Pressable>
                        </View>
                      </View>
                    </Modal>
                    <TouchableOpacity style={styles.deliverPickupDetails}>
                      <Text onPress={changeSchedule} style={styles.deliverPickupDetailsText}>Now</Text>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showScheduleModal}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setShowScheduleModal(!showScheduleModal);
                      }}
                      >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>Schedule your order</Text>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={(text) => confirmSchedule(text)}
                          >
                            <Text style={styles.textStyle}>Confirm Order Time</Text>
                          </Pressable>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  {
                    pickup ?
                    <View style={styles.searchContainer}>
                      <TextInput style={styles.pickupSearchBar} placeholder="Search..."></TextInput>
                      {
                        mapView ?
                        <TouchableOpacity style={styles.mapBtn}>
                          <Icon onPress={changePickupView} name="list-ul" type="font-awesome-5" size={30} />
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.mapBtn}>
                          <Icon onPress={changePickupView} name="map-marked-alt" type="font-awesome-5" size={30} />
                        </TouchableOpacity>
                      }
                      <TouchableOpacity style={styles.filterBtn}>
                        <Icon name="sliders-h" type="font-awesome-5" size={30} />
                      </TouchableOpacity>
                    </View> :
                    <View style={styles.searchContainer}>
                      <TextInput style={styles.deliverySearchBar} placeholder="Search..."></TextInput>
                      <TouchableOpacity style={styles.filterBtn}>
                        <Icon name="sliders-h" type="font-awesome-5" size={30} />
                      </TouchableOpacity>
                    </View>
                  }
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
  pickupSearchBar: {
    width: '70%',
    height: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRightWidth: 1,
    borderRightColor: "#ededed"
  },
  deliverySearchBar: {
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
  mapBtn: {
    width: '15%',
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressSearchBar: {
    width: '30%',
    height: 30,
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "green",
    borderStyle: "solid",
    paddingHorizontal: 20,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ProductContainer;