import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../Redux/userSlice";

const Privacy = (props) => {
    const userDetails = useSelector(selectUserDetails);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Privacy</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})

export default Privacy;