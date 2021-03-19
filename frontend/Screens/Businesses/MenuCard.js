import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

var { width } = Dimensions.get("window");

const MenuCard = (props) => {
    const { name, price, image, countInStock } = props;
    const [love, setLove] = useState(false);

    const handleLove = () => {
        setLove(!love);
    }

    return (
        <TouchableOpacity style={styles.productContainer} onPress={props.handlePress}>
            <View style={styles.productDetails}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.title}>Blue Dream - 3.5g</Text>
                    <Text style={styles.price}>$40.00</Text>
                    <View style={styles.loveIcon}>
                        <TouchableOpacity onPress={handleLove}>
                            {love ?
                            <Icon name="heart" type="font-awesome-5" color="red" size={25} />
                            :
                            <Icon name="heart" type="font-awesome-5" color="black" size={25} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
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
        flexGrow: 1,
        flex: 1,
        marginLeft: 25,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        width: "75%",
    },
    loveIcon: {
    },
    subText: {
        color: "grey",
        fontWeight: "bold"
    },
    price: {
        fontSize: 16
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