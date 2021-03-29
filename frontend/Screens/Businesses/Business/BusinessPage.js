import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Modal, Dimensions } from 'react-native';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import Menu from './Menu';
import BusinessInfo from './BusinessInfo';
import BusinessCategories from './BusinessCategories';
import ViewCartButton from "../Cart/ViewCartButton";
import ItemBottomSheet from '../Item/ItemBottomSheet';

var { height, width } = Dimensions.get("window");

const BusinessPage = (props) => {

    const [showItemModal, setShowItemModal] = useState(false);
    const [product, setProduct] = useState();

    const handleShowItemModal = (product) => {
        setProduct(product)
        setShowItemModal(true);
    }

    const handleRemoveItemModal = () => {
        setProduct();
        setShowItemModal(false);
    }

    const { coverImage, name, address, rating, categories, products } = props.route.params;
    const businessDetails = { coverImage, name, address, rating };

    const cart = useSelector(selectCartItems);

    return (
        <View>
            <ScrollView>
                <BusinessInfo businessDetails={businessDetails} />
                <View style={styles.categoriesContainer}>
                    <BusinessCategories categories={categories} />
                </View>
                <Menu navigation={props.navigation} categories={categories} products={products} handleShowItemModal={handleShowItemModal} />
            </ScrollView>
            {
                cart.length > 0 &&
                <ViewCartButton navigation={props.navigation} />
            }
            <Modal
                visible={showItemModal}
                animationType='none'
                transparent={true}
            >
                <View style={styles.modalBackground} />
                <ItemBottomSheet
                    product={product}
                    quantity={null}
                    handleRemoveItemModal={handleRemoveItemModal}
                    cartType="Add"
                    navigation={props.navigation}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.66)',
        height: height,
        width: width
    },
    categoriesContainer: {
        backgroundColor: "white",
        paddingLeft: 15
    }
})

export default BusinessPage;