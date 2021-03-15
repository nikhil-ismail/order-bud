import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Icon } from 'react-native-elements';

var { width } = Dimensions.get("window");

const Cart = props => {
    return (
        <TouchableOpacity style={[styles.viewCart, props.parentStyle]} onPress={props.showBottomSheet}>
            <View style={styles.cartIcon}>
                <Icon name="shopping-cart" type="font-awesome-5" color="white" size={22} />
                <View style={styles.cartNumItemsContainer}>
                    <Text style={styles.cartNumItems}>2</Text>
                </View>
            </View>
            <Text style={styles.viewCartText}>View Cart</Text>
            <Text style={styles.viewCartText}>$90.00</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewCart: {
        backgroundColor: "green",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "75%",
        left: (width - width * 0.75) / 2
    },
    viewCartText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 10
    },
    cartNumItems: {
        color: "green",
        fontWeight: "bold",
    },
    cartIcon: {
        flexDirection: "row"
    },
    cartNumItemsContainer: {
        backgroundColor: "white",
        height: 18,
        width: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -5,
        marginLeft: -6
    }
});

export default Cart;