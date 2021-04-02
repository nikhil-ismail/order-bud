import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

import Menu from './Menu';
import BusinessInfo from './BusinessInfo';
import BusinessCategories from './BusinessCategories';
import ViewCartButton from "../Cart/ViewCartButton";
import Item from '../Item/Item';

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
            <Item
                showItemModal={showItemModal}
                product={product}
                handleRemoveItemModal={handleRemoveItemModal}
                navigation={props.navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesContainer: {
        backgroundColor: "white",
        paddingLeft: 15
    }
})

export default BusinessPage;