import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, BottomSheet } from 'react-native-elements';

import MenuCard from './MenuCard'

import SearchBar from "../../Shared/SearchBar";

var { width, height } = Dimensions.get('window')


const BusinessPage = (props) => {

    const [showAddToCart, setShowAddToCart] = useState(false);

    const { coverImage, profileImage, name, address } = props.route.params;

    const showBottomSheet = () => {
        setShowAddToCart(!showAddToCart);
    }

    return (
        <ScrollView>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.coverPhoto}
                    source={{ uri: coverImage }}
                />
                <View style={styles.profileTextContainer}>
                    <View style={styles.businessNameContainer}>
                        <Text style={styles.businessName}>{name}</Text>
                    </View>
                    <View style={styles.businessNameUnderline} />
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <Text style={styles.businessDetails}>800 meters</Text>
                        <Text style={styles.businessDetails}> · </Text>
                        <Text style={styles.businessDetails}>{address}</Text>
                    </View>
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
                <SearchBar />
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderText}>Bud</Text>
                </View>
                <MenuCard handlePress={showBottomSheet} />
                <MenuCard handlePress={showBottomSheet} />
                <MenuCard handlePress={showBottomSheet} />
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderText}>Pre-Rolls</Text>
                </View>
                <MenuCard handlePress={showBottomSheet} />
                <MenuCard handlePress={showBottomSheet} />
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryHeaderText}>Edibles</Text>
                </View>
                <MenuCard handlePress={showBottomSheet} />
            </View>
            {
                showAddToCart &&
                <BottomSheet
                    isVisible={showAddToCart}
                    containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0)' }}
                >
                    <View style={styles.bottomSheet}>
                        <TouchableOpacity style={styles.addToCartBackBtn} onPress={showBottomSheet}>
                            <Icon name="arrow-left" type="font-awesome-5" color="black" size={17.5} />
                        </TouchableOpacity>
                        <Text style={styles.itemName}>Blue Dream</Text>
                        <Text style={styles.itemDescription}>This sativa leaning varietal from Canna Farms has a mid-high THC (17.5-20%) content with virtually no CBD. Blue Dream is descended from Blueberry Haze and offers a bouquet of pine and citrus.</Text>
                        <View style={styles.itemDetailsContainer}>
                            <View style={styles.selectSize}>
                                <TouchableOpacity style={styles.leftSelectSize}>
                                    <Text style={styles.selectSizeText}>1g</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.middleSelectSize}>
                                    <Text style={styles.selectSizeText}>2g</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.middleSelectSize}>
                                    <Text style={styles.selectSizeText}>1/8oz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rightSelectSize}>
                                    <Text style={styles.selectSizeText}>1/4oz</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.selectQuantity}>
                                <TouchableOpacity style={styles.leftSelectQuantity}>
                                    <Icon name="minus" type="font-awesome-5" color="black" size={17.5} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quantity}>
                                    <Text style={styles.selectSizeText}>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rightSelectQuantity}>
                                    <Icon name="plus" type="font-awesome-5" color="black" size={17.5} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.addToCart}>
                                <Text style={styles.addToCartText}>Add To Cart</Text>
                                <Text style={styles.addToCartText}>$35.00</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheet>
            }
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    coverPhoto: {
        width: width,
        height: height * 0.225,
    },
    profileContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    profileTextContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: -40,
        backgroundColor: 'white',
        width: 0.7 * width,
        borderRadius: 5,
        padding: 20
    },
    businessNameContainer: {
        width: 0.7 * width,
        justifyContent: "center",
    },
    businessName: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
    },
    businessNameUnderline: {
        height: 2,
        width: 0.4 * width,
        backgroundColor: "green",
        marginTop: -2.5,
        marginBottom: 15
    },
    businessDetails: {
        fontSize: 18,
        color: "grey"
    },
    menuFilters: {
        marginHorizontal: 15,
        marginTop: 20,
    },
    menuFilterTextContainer: {
        marginHorizontal: 5,
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 128, 0, 0.75)',
    },
    menuFilterText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    listContainer: {
        flex: 1,
        alignItems: "center",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 8,
    },
    categoryHeader: {
        marginBottom: -1,
        marginTop: 9,
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 10,
        borderRadius: 5,
    },
    categoryHeaderText: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 25,
        marginTop: 10
    },
    addToCartBackBtn: {
        backgroundColor: "white",
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    itemDetailsContainer: {
        alignItems: "center"
    },
    itemName: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 15
    },
    itemDescription: {
        fontSize: 17,
        color: "grey",
    },
    addToCart: {
        backgroundColor: "green",
        width: "90%",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    addToCartText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22
    },
    selectSize: {
        flexDirection: "row",
        marginTop: 20,
    },
    leftSelectSize: {
        backgroundColor: "#e6e6e6",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#b3b3b3"
    },
    rightSelectSize: {
        backgroundColor: "#e6e6e6",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingVertical: 15,
        width: 80,
        alignItems: "center"
    },
    middleSelectSize: {
        backgroundColor: "#e6e6e6",
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#b3b3b3"
    },
    selectSizeText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    selectQuantity: {
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: "row",
        marginTop: 25
    },
    quantity: {
        width: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    rightSelectQuantity: {
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
    },
    leftSelectQuantity: {
        paddingVertical: 15,
        width: 80,
        alignItems: "center",
    }
})

export default BusinessPage;