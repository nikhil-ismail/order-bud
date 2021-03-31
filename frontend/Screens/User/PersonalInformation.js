import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../Redux/userSlice";

const PersonalInformation = (props) => {

    const userDetails = useSelector(selectUserDetails);

    console.log(userDetails);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Personal Information</Text>
                </View>
                <View style={styles.profilePictureContainer}>
                    <View style={styles.profilePicturePlaceholder} />
                </View>
                <View style={styles.textInput}>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Name</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{userDetails.name}</Text>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Phone Number</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{userDetails.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Email</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{userDetails.email}</Text>
                        </View>
                    </View>
                    <View style={styles.categoryContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Password</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>•••••••••</Text>
                        </View>
                    </View>
                </View>
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
    profilePictureContainer: {
        backgroundColor: "white",
        paddingVertical: 70
    },
    profilePicturePlaceholder: {
        backgroundColor: "grey",
        paddingHorizontal: 20,
        marginLeft: 30,
        marginTop: -30,
        width: "10%",
        borderRadius: 60
    },
    textInput: {
        marginTop: 1
    },
    categoryContainer: {
        marginVertical: 2
    },
    headerContainer: {
        backgroundColor: "white",
        paddingVertical: 15,
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 20
    },
    inputContainer: {
        backgroundColor: "white",
    },
    input: {
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 20
    }
})

export default PersonalInformation;