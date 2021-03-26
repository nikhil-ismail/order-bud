import React from "react";
import { View, Dimensions, ScrollView } from "react-native";

import CheckoutHeader from './CheckoutHeader';
import DeliverPickupSelector from './DeliverPickupSelector';
import OrderLogistics from './OrderLogistics';
import OrderSummary from './OrderSummary';
import PurchaseButton from './PurchaseButton';

var { height } = Dimensions.get("window");

const Checkout = props => {

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
}

export default Checkout;