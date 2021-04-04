import React, { useState, useCallback } from 'react'
import { View, ScrollView, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';

import baseURL from "../../../assets/common/baseUrl";

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import Menu from './Menu';
import BusinessInfo from './BusinessInfo';
import BusinessCategories from './BusinessCategories';
import ViewCartButton from "../Cart/ViewCartButton";
import Item from '../Item/Item';

const { width, height } = Dimensions.get('window')

const BusinessPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [showItemModal, setShowItemModal] = useState(false);
    const [product, setProduct] = useState();
    const [menuItems, setMenuItems] = useState();

    const handleShowItemModal = (product) => {
        setProduct(product)
        setShowItemModal(true);
    }

    const handleRemoveItemModal = () => {
        setProduct();
        setShowItemModal(false);
    }

    const { coverImage, name, address, rating, categories } = props.route.params;
    const businessDetails = { name, address, rating };
    const id = props.route.params.id ? props.route.params.id : props.route.params._id;
    const cart = useSelector(selectCartItems);

    useFocusEffect(
        useCallback(() => {
            axios.get(`${baseURL}products/${id}`)
                .then(res => {
                    setMenuItems(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])
    )

    return (
        <>
            {
                loading === false ?
                    <View>
                        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
                            <Image
                                style={styles.coverPhoto}
                                source={{ uri: coverImage }}
                            />
                            <BusinessInfo businessDetails={businessDetails} />
                            <View style={styles.categoriesContainer}>
                                <BusinessCategories categories={categories} />
                            </View>
                            <Menu navigation={props.navigation} categories={categories} products={menuItems} handleShowItemModal={handleShowItemModal} />
                        </ScrollView>
                        {
                            cart.length > 0 &&
                            <ViewCartButton navigation={props.navigation} />
                        }
                        <Item
                            showItemModal={showItemModal}
                            product={product}
                            handleRemoveItemModal={handleRemoveItemModal}
                            navigation={props.navigation}
                        />
                    </View>
                    :
                    <View style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    coverPhoto: {
        width: width,
        height: height * 0.225,
    },
    categoriesContainer: {
        backgroundColor: "white",
        paddingLeft: 15
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BusinessPage;