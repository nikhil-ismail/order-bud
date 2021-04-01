import React from "react";
import { TextInput } from "react-native";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";

const UserDetails = (props) => {

    const userDetails = useSelector(selectUserDetails);

    return (
        <SafeAreaView>
            <ScrollView>
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

export default UserDetails;