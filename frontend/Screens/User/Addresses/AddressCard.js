import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";
import { selectAddress } from "../../../Redux/orderDetailsSlice";

const AddressCard = (props) => {
    const userDetails = useSelector(selectUserDetails);
    const address = useSelector(selectAddress);

    return (
        <SafeAreaView>
            <TouchableOpacity>
                <View style={styles.cardContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.pinIcon}>
                            <Icon name="map-pin" type="font-awesome-5" color="black" size={25} />
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText1}>{address.mainText}</Text>
                            <Text style={styles.addressText2}>{address.secondaryText}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.deleteIcon}>
                        <Icon name="trash-alt" type="font-awesome-5" color="red" size={30} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 20,
        marginBottom: 2
    },
    leftContainer: {
        flexDirection: "row"
    },
    addressContainer: {
        flexDirection: "column",
        paddingHorizontal: 40
    },
    addressText1: {
        fontSize: 16,
        fontWeight: "bold",
    },
    addressText2: {
        fontSize: 16,
    },
    pinIcon: {
        marginLeft: 30,
        marginTop: 8
    },
    deleteIcon: {
        marginRight: 40,
        marginTop: 8
    }
})

export default AddressCard;