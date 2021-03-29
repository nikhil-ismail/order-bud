import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");

const OrderCard = (props) => {

    return (
        <View>
            <TouchableOpacity style={styles.productContainer}>
                <View style={styles.imagePlaceholder}></View>
                <View style={styles.productDetails}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.title}>Tokyo Smoke</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.subText}>March 29 • 3 Items</Text>
                        <Text style={styles.subText}>$50.74</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.viewMenu}>
                    <Text>View Menu</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        width: '100%',
        marginVertical: 1,
        paddingVertical: 25,
        flexDirection: "row",
        borderRadius: 5,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
    },
    productDetails: {
        flexGrow: 1,
        flex: 1,
        marginLeft: 25,
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
    },
    subText: {
        color: "grey",
        fontWeight: "bold"
    },
    imagePlaceholder: {
        backgroundColor: "grey",
        marginLeft: 20,
        height: "100%",
        width: "22%"
    },
    viewMenu: {
        backgroundColor: "#D3D3D3",
        padding: 10,
        borderRadius: 10,
        marginRight: 18
    }
})

export default OrderCard;