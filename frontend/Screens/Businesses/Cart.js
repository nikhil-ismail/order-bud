import React from "react";
import { Text, View, TouchableOpacity, Animated, FlatList, StyleSheet, Dimensions } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const Cart = props => {
    return (
        <BottomSheet
            isVisible={props.showAddToCart}
            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0)' }}
        >
            <View style={styles.bottomSheet}>
                <View style={styles.cartHeaderContainer}>
                    <TouchableOpacity style={styles.cartBackBtn} onPress={props.showBottomSheet}>
                        <Icon name="arrow-left" type="font-awesome-5" color="black" size={17.5} />
                    </TouchableOpacity>
                    <Text style={styles.yourOrderHeader}>Your Order</Text>
                </View>
                <View style={styles.separator} />
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
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.checkoutBtn} onPress={props.goToCheckout}>
                        <View style={styles.cartIcon}>
                            <Icon name="shopping-cart" type="font-awesome-5" color="white" size={22} />
                            <View style={styles.cartNumItemsContainer}>
                                <Text style={styles.cartNumItems}>2</Text>
                            </View>
                        </View>
                        <Text style={styles.viewCartText}>View Cart</Text>
                        <Text style={styles.viewCartText}>$90.00</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}


const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    cartHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    yourOrderHeader: {
        fontSize: 28,
        fontWeight: "bold"
    },
    cartBackBtn: {
        backgroundColor: "white",
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginBottom: 15
    },
    separator: {
        backgroundColor: "grey",
        height: 1,
        marginVertical: 15
    },
    itemContainer: {
        flexDirection: "row",
        marginVertical: 2.5,
        width: "100%",
        backgroundColor: "#f2f2f2",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    cartItemText: {
        fontSize: 16
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
    proceedToCheckout: {
        backgroundColor: "green",
        width: "90%",
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    proceedCheckoutText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22
    },
    checkoutBtn: {
        backgroundColor: "green",
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "95%",
        marginTop: 20
    },
    viewCartText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 10
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