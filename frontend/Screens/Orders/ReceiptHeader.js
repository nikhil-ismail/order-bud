import React from "react";
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get('window')

const ReceiptHeader = props => {

    const { order, ordersCount } = props;

    return (
        <View>
            <Image
                style={styles.coverPhoto}
                source={{ uri: order.business.coverImage }}
            />
            <View style={styles.businessNameContainer}>
                <Text style={[styles.businessNameText, { color: "green", fontSize: 30 }]}>{order.business.name}</Text>
                <View style={styles.subTextContainer}>
                    <Text style={styles.subText}>Order {order.status} • {order.dateOrdered}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    coverPhoto: {
        width: width,
        height: height * 0.18,
    },
    businessNameContainer: {
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "white",
        paddingVertical: 20,
    },
    businessNameText: {
        fontWeight: "bold",
        fontSize: 24,
    },
    subTextContainer: {
        flexDirection: "row",
        marginTop: 15
    },
    subText: {
        fontSize: 15.5
    }
})

export default ReceiptHeader;