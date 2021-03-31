import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import { useSelector, useDispatch } from "react-redux";
import { selectUserDetails, clearUser } from "../../Redux/userSlice";

const Profile = (props) => {
    const userDetails = useSelector(selectUserDetails);
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.nameContainer}>
                    <TouchableOpacity style={styles.sectionIcon}>
                        <Icon name="user-circle" type="font-awesome-5" color="black" size={45} />
                    </TouchableOpacity>
                    <Text style={styles.name}>{userDetails.name}</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('Friends')}>
                        <Icon name="users" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}onPress={() => props.navigation.navigate('Payment')}>
                        <Icon name="wallet" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('Personal Information')}>
                        <Icon name="user" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Personal Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('Rewards')}>
                        <Icon name="gift" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Rewards</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('Addresses')}>
                        <Icon name="home" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Addresses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('Notifications')}>
                        <Icon name="bell" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => props.navigation.navigate('Privacy')}>
                        <Icon name="lock" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Privacy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={() => dispatch(clearUser())}>
                        <Icon name="sign-out-alt" type="font-awesome-5" color="black" size={30} />
                        <Text style={styles.categoryText}>Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Icon name="trash" type="font-awesome-5" color="black" size={30} />
                        <Text style={{fontSize: 18, color: "red", fontWeight: "bold", marginLeft: 15, marginTop: 5}}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: "row",
        marginLeft: 22,
        marginVertical: 15
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 15,
        marginTop: 8
    },
    categoryContainer: {
        flexDirection: "column"
    },
    category: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 20,
        paddingLeft: 20,
        marginVertical: 2
    },
    categoryText: {
        fontSize: 18,
        color: "green",
        fontWeight: "bold",
        marginLeft: 15,
        marginTop: 5
    },
})

export default Profile;