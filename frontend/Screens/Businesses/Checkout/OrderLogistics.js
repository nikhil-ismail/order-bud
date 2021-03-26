import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import Address from './Address';
import Schedule from './Schedule';

const { height } = Dimensions.get('window')

const OrderLogistics = props => {

    return (
        <View style={styles.checkoutContainer}>
            <Text style={styles.header}>Delivery Details</Text>
            <Address />
            <Schedule />
        </View>
    )
}

const styles = StyleSheet.create({
    checkoutContainer: {
        backgroundColor: "white",
        marginVertical: 2.5
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 15,
        marginLeft: 15
    }
})

export default OrderLogistics;