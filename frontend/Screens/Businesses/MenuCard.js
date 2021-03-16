import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native'

var { width } = Dimensions.get("window");

const MenuCard = (props) => {
    const { name, price, image, countInStock } = props;

    return (
        <TouchableOpacity
            style={styles.productContainer}
            onPress={props.handlePress}
        >
            <View style={styles.productDetails}>
                <Text style={styles.title}>Blue Dream</Text>
                <View style={{marginVertical: 10}}>
                    <Text style={styles.subText}>20% THC · 0% CBD</Text>
                    <Text style={styles.subText}>Sativa-dominant</Text>
                </View>
                <Text style={styles.friendOrders}>Greg and James have ordered this before</Text>
            </View>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                    uri: image ?
                        image : null
                }}
            />
        </TouchableOpacity>
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
        width: "70%",
        flexGrow: 1,
        flex: 1,
        marginLeft: 25,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        width: "100%",
    },
    subText: {
        color: "grey",
        fontWeight: "bold"
    },
    image: {
        width: "20%",
        height: width * 0.225,
        marginHorizontal: 10
    },
    friendOrders: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    }
})

export default MenuCard;