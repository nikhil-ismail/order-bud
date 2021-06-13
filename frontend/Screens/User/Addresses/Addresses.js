import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";
import { selectAddress } from "../../../Redux/orderDetailsSlice";

import AddressCard from "./AddressCard";

const Addresses = (props) => {
    const userDetails = useSelector(selectUserDetails);
    const address = useSelector(selectAddress);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Manage Addresses</Text>
                </View>
                <TouchableOpacity style={styles.addContainer} onPress={() => props.navigation.navigate('Enter Address')}>
                    <View style={styles.addIcon}>
                        <Icon name="plus" type="font-awesome-5" color="black" size={25} />
                    </View>
                    <Text style={styles.addAddressText}>Add New Address</Text>
                </TouchableOpacity>
                <AddressCard />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    addContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 20,
        marginBottom: 3    
    },
    addIcon: {
        marginLeft: 30,
        marginTop: 8
    },
    addAddressText: {
        fontSize: 16,
        paddingHorizontal: 30,
        marginTop: 12,
        color: "green",
        fontWeight: "bold"
    },
})

export default Addresses;