import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../Redux/cartSlice';

const Address = props => {

    const address = useSelector(selectCartItems)[0];

    return (
        <View style={styles.addressContainer}>
            <View style={styles.pinAddressContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="map-pin" type="font-awesome-5" color="black" size={28} />
                </View>
                <View style={styles.addressTextContainer}>
                    <Text style={styles.street}>123 Anywhere Street</Text>
                    <Text style={styles.city}>Toronto, ON</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editContainer}>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        flexDirection: "row",
        paddingHorizontal: 15,
        marginVertical: 15,
        justifyContent: "space-between",
        alignItems: "center"
    },
    pinAddressContainer: {
        alignItems: "center",
        flexDirection: "row"
    },
    iconContainer: {
        width: "7.5%"
    },
    addressTextContainer: {
        marginLeft: 30,
        width: "65%",
    },
    street: {
        fontSize: 18,
        fontWeight: "bold"
    },
    city: {
        fontSize: 16
    },
    editContainer: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    editText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    }
})

export default Address;