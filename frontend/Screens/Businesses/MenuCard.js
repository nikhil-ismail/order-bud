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
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{
                        uri: image ?
                            image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                    }}
                />
                <View style={styles.productDetails}>
                    <Text style={styles.title}>Blue Dream</Text>
                    <Text styles={{marginBottom: 50}}>20% THC · 0% CBD</Text>
                    <Text styles={{marginTop: 50}}>Sativa-dominant</Text>
                    <Text style={styles.friendOrders}>Greg and James have ordered this before</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        width: '95%',
        marginBottom: 15
    },
    container: {
        width: "100%",
        height: width * 0.35,
        flexDirection: "row",
        borderRadius: 15,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
    },
    image: {
        width: "37.5%",
        height: width * 0.225,
        marginVertical: 20,
        marginHorizontal: 10
    },
    productDetails: {
        marginVertical: 20,
        width: "60%",
        flexGrow: 1,
        flex: 1,
        marginVertical: 20,
        marginLeft: 35,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        width: "100%",
        marginBottom: 5
    },
    friendOrders: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 10
    }
})

export default MenuCard;