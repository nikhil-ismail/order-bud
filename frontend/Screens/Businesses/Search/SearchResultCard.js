import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");

const SearchResultCard = (props) => {

    return (
        <View>
            <TouchableOpacity style={styles.productContainer}>
                <View style={styles.productDetails}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.title}>Houseplant Indica</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.subText}>Tokyo Smoke • Houseplant</Text>
                    </View>
                    <Text style={styles.friendOrders}>Greg, James and 10 friends have ordered this before</Text>
                </View>
                <View style={styles.imagePlaceholder}></View>
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
        fontSize: 20,
    },
    subText: {
        color: "grey",
        fontWeight: "bold"
    },
    imagePlaceholder: {
        backgroundColor: "grey",
        marginRight: 20,
        height: "100%",
        width: "25%"
    },
    friendOrders: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    }
})

export default SearchResultCard;