import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../Redux/userSlice";

const Rewards = (props) => {
    const userDetails = useSelector(selectUserDetails);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Rewards</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})

export default Rewards;