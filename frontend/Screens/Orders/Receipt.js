import React from "react";
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import ReceiptHeader from './ReceiptHeader';
import ReceiptItem from "./ReceiptItem";

const { width, height } = Dimensions.get('window')

const Receipt = props => {

    const { order, ordersCount } = props.route.params;

    return (
        <ScrollView>
            <ReceiptHeader navigation={props.navigation} ordersCount={ordersCount} order={order} />
            <View style={styles.detailsContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Your Order Details</Text>
                </View>
                { order.orderItems.map(item => {
                    return <ReceiptItem item={item} />
                })}
            </View>
            <View style={styles.tipCategoryContainer}>
                <View style={styles.category}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="hand-holding-usd" type="font-awesome-5" color="black" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.categoryText}>Tip: $0.00</Text>
                </View>
            </View>
            <View style={styles.priceCategoryContainer}>
                <View style={styles.category}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="receipt" type="font-awesome-5" color="black" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.categoryText}>Total: ${order.totalPrice}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: "white",
        marginTop: 3
    },
    headerContainer: {
        marginVertical: 15,
        marginLeft: 20
    },
    header: {
        fontSize: 18,
        fontWeight: "bold"
    },
    tipCategoryContainer: {
        backgroundColor: "white",
        marginTop: 2,
    },
    priceCategoryContainer: {
        backgroundColor: "white",
        marginTop: 2,
    },
    category: {
        paddingVertical: 25,
        flexDirection: "row",
    },
    categoryText: {
        fontSize: 17
    },
    icon: {
        paddingHorizontal: 20
    }
})

export default Receipt;