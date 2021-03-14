import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Animated, SafeAreaView, Dimensions } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon, Divider } from 'react-native-elements';

var { height, width } = Dimensions.get('window')

const Checkout = props => {
    return (
        <SafeAreaView style={styles.checkoutContainer}>
            <View style={styles.checkoutHeaderContainer}>
                <Text style={styles.checkoutHeader}>Checkout</Text>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.yourOrder}>Review Order</Text>
                <FlatList
                    data={[{ id: 1, name: "Blue Dream", price: 55.00 }, { id: 2, name: "Jack Herer Pre-Rolls (3-pack)", price: 35.00 }]}
                    renderItem={({ item }) => (
                        <Swipeable
                            keyExtractor={(item) => item.id}
                            renderRightActions={() => (
                                <TouchableOpacity onPress={() => alert("Deleted")}>
                                    <View style={styles.rightAction}>
                                        <Animated.Text style={[styles.actionText]}>Delete</Animated.Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        >
                            <View style={styles.itemContainer}>
                                <Text style={styles.cartItemText}>{item.name}</Text>
                                <Text style={styles.cartItemText}>${item.price}</Text>
                            </View>
                        </Swipeable>
                    )}
                />
                <Divider style={styles.divider} />
                <View style={styles.priceDetailsContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.cartItemText}>Subtotal</Text>
                        <Text style={styles.cartItemText}>$90.00</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.cartItemText}>Tax</Text>
                        <Text style={styles.cartItemText}>$11.70</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.cartItemText}>Total</Text>
                        <Text style={styles.cartItemText}>$101.70</Text>
                    </View>
                </View>
            </View>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={styles.purchaseBtn}>
                    <View style={styles.cartIcon}>
                        <Icon name="shopping-cart" type="font-awesome-5" color="white" size={22} />
                        <View style={styles.cartNumItemsContainer}>
                            <Text style={styles.cartNumItems}>2</Text>
                        </View>
                    </View>
                    <Text style={styles.viewCartText}>Purchase</Text>
                    <Text style={styles.viewCartText}>$90.00</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    checkoutContainer: {
        backgroundColor: "white",
        padding: 20,
        height: height,
    },
    orderSummary: {

    },
    checkoutHeaderContainer: {
        alignItems: "center"
    },
    checkoutHeader: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 20
    },
    itemContainer: {
        flexDirection: "row",
        marginVertical: 2.5,
        width: "100%",
        backgroundColor: "white",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    yourOrder: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 15,
        marginLeft: 15
    },
    cartItemText: {
        fontSize: 16
    },
    priceDetailsContainer: {
        marginVertical: 15
    },
    priceContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "white",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    rightAction: {
        backgroundColor: "red",
        marginVertical: 2.5,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    actionText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    divider: {
        backgroundColor: "grey",
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
    },
    purchaseBtn: {
        backgroundColor: "green",
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "95%",
        marginTop: 20
    },
})

export default Checkout;