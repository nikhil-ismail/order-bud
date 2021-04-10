import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get('window')

const ReceiptItem = props => {

    const { item } = props;

    return (
        <View style={styles.itemContainer}>
            <View style={styles.quantityContainer}>
                <View style={styles.quantity}>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                </View>
            </View>
            <View style={styles.itemNameContainer}>
                <Text style={styles.cartItemText}>MK Ultra</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.cartItemText}>$29.99</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        marginVertical: 5,
        width: "100%",
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    quantityContainer: {
        width: "10%",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingVertical: 15,
        paddingLeft: 20
    },
    quantity: {
        backgroundColor: "black",
        height: 28,
        width: 28,
        borderRadius: 2.5,
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    quantityText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    },
    itemNameContainer: {
        width: "52%",
        justifyContent: "center",
        paddingVertical: 15,
    },
    priceContainer: {
        width: "25%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingVertical: 15,
        paddingRight: 30
    },
    cartItemText: {
        fontSize: 17
    }
})

export default ReceiptItem;