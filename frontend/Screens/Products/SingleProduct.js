import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import TrafficLight from '../../Shared/StyledComponents/TrafficLight'
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

import ProductList from './ProductList'

var { width, height } = Dimensions.get('window')


const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("")

    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unvailable")
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.coverPhoto}></View>
            <View style={styles.profileContainer}>
                <View style={styles.profilePhoto}></View>
                <View style={styles.profileDetails}>
                    <Text style={styles.businessName}>Tokyo Smoke</Text>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <Text style={styles.businessDetails}>Open Now · </Text>
                        <View style={styles.stars}>
                            <Icon name="star" type="font-awesome-5" color="green" size={15} />
                            <Icon name="star" type="font-awesome-5" color="green" size={15} />
                            <Icon name="star" type="font-awesome-5" color="green" size={15} />
                            <Icon name="star" type="font-awesome-5" color="green" size={15} />
                            <Icon name="star" type="font-awesome-5" color="green" size={15} />
                        </View>
                    </View>
                    <Text style={styles.businessDetails}>88 Cumberland Street</Text>
                </View>
            </View>
            <ScrollView style={styles.menuFilters} horizontal={true}>
                <TouchableOpacity style={styles.menuFilterTextContainer}>
                    <Text style={styles.menuFilterText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuFilterTextContainer}>
                    <Text style={styles.menuFilterText}>Bud</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuFilterTextContainer}>
                    <Text style={styles.menuFilterText}>Pre-Rolls</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuFilterTextContainer}>
                    <Text style={styles.menuFilterText}>Edibles</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuFilterTextContainer}>
                    <Text style={styles.menuFilterText}>Accessories</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.listContainer}>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchBar} placeholder="Search Menu..."></TextInput>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Icon name="sliders-h" type="font-awesome-5" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderText}>Bud (3)</Text>
                </View>
                <ProductList />
                <ProductList />
                <ProductList />
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderText}>Pre-Rolls (2)</Text>
                </View>                
                <ProductList />
                <ProductList />
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderText}>Edibles (1)</Text>
                </View>                
                <ProductList />
            </View>
        </ScrollView>
    )

}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    coverPhoto: {
        width: width,
        height: height * 0.2,
        backgroundColor: "grey"
    },
    profileContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    profilePhoto: {
        height: 160,
        width: 160,
        borderRadius: 80,
        backgroundColor: "black",
        marginTop: -40,
        marginLeft: 15
    },
    profileDetails: {
        marginRight: 15,
        marginTop: 15
    },
    businessName: {
        fontSize: 31,
        fontWeight: "bold",
        marginBottom: 10
    },
    businessDetails: {
        fontSize: 16,
        marginRight: 5,
    },
    stars: {
        flexDirection: "row",
        marginTop: 3,
    },
    menuFilters: {
        marginVertical: 25,
        marginHorizontal: 15
    },
    menuFilterTextContainer: {
        marginHorizontal: 5,
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 15,
        backgroundColor: "green"
    },
    menuFilterText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    listContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#ededed",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 8,
    },
    searchContainer: {
        width: '90%',
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
      categoryHeader: {
          marginBottom: 15,
          width: "95%",
          backgroundColor: "white",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 15,
      },
      categoryHeaderText: {
          fontSize: 30,
          marginLeft: 30,
          fontWeight: "bold",
          color: "green"
      }
})

export default connect(null, mapToDispatchToProps)(SingleProduct);