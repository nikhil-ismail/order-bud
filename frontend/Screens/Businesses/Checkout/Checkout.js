import React from "react";
import { View, Dimensions, ScrollView, Text, StyleSheet } from "react-native";

import CheckoutHeader from './CheckoutHeader';
import DeliverPickupSelector from './DeliverPickupSelector';
import OrderLogistics from './OrderLogistics';
import OrderSummary from './OrderSummary';
import PurchaseButton from './PurchaseButton';

var { height } = Dimensions.get("window");

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

const Checkout = props => {

    const cartItems = useSelector(selectCartItems);

    if (cartItems.length > 0) {
        return (
            <View style={{ height: height }}>
                <ScrollView>
                    <CheckoutHeader />
                    <DeliverPickupSelector />
                    <OrderLogistics />
                    <OrderSummary />
                </ScrollView>
                <PurchaseButton />
            </View>
        )
    } else {
        return (
            <View style={styles.emptyCartContainer}>
                <Text>Your cart is empty.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emptyCartContainer: {
        height: height,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Checkout;