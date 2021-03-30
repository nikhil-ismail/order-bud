import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

const Payment = (props) => {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Payment</Text>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Payment Methods</Text>
                </View>
                <View style={styles.paymentContainer}>
                    <TouchableOpacity style={styles.payment}>
                        <Icon name="cc-apple-pay" type="font-awesome-5" color="black" size={35} />
                        <Text style={styles.paymentText}>Apple Pay</Text>
                        <View style={{marginLeft: 215, marginTop: 10}}> 
                            <Icon name="check" type="font-awesome-5" color="black" size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Add Payment Method</Text>
                </View>
                <View style={styles.paymentContainer}>
                    <TouchableOpacity style={styles.payment}>
                        <Icon name="credit-card" type="font-awesome-5" color="black" size={35} />
                        <Text style={styles.paymentText}>Credit or Debit Card</Text>
                        <View style={{marginLeft: 140, marginTop: 10}}> 
                            <Icon name="arrow-right" type="font-awesome-5" color="black" size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.payment}>
                        <Icon name="google" type="font-awesome-5" color="black" size={35} />
                        <Text style={styles.paymentText}>Google Pay</Text>
                        <View style={{marginLeft: 210, marginTop: 10}}> 
                            <Icon name="arrow-right" type="font-awesome-5" color="black" size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.payment}>
                        <Icon name="cc-paypal" type="font-awesome-5" color="#00A3E1" size={35} />
                        <Text style={styles.paymentText}>PayPal</Text>
                        <View style={{marginLeft: 240, marginTop: 10}}> 
                            <Icon name="arrow-right" type="font-awesome-5" color="black" size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.payment}>
                        <Icon name="gift" type="font-awesome-5" color="black" size={35} />
                        <Text style={styles.paymentText}>Gift Card</Text>
                        <View style={{marginLeft: 225, marginTop: 10}}> 
                            <Icon name="arrow-right" type="font-awesome-5" color="black" size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>OrderBud Credits</Text>
                </View>
                <View style={styles.paymentContainer}>
                    <View style={{flexDirection: "column", backgroundColor: "white", marginVertical: 1.5, paddingVertical: 20, paddingLeft: 20}}>
                        <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 10}}>$0.00 USD</Text>
                        <Text>Your credit will be automatically applied to your next order</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection: "row", backgroundColor: "white", marginVertical: 1.5, paddingVertical: 20, paddingLeft: 20}}>
                        <Text style={{fontSize: 16}}>Invite friends to earn credits</Text>
                        <View style={{marginLeft: 140}}> 
                            <Icon name="arrow-right" type="font-awesome-5" color="black" size={20} />
                        </View>
                    </TouchableOpacity>
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
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    headerContainer: {
        marginLeft: 15,
        marginTop: 18,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    paymentContainer: {
        marginTop: 18,
    },
    payment: {
        flexDirection: "row",
        backgroundColor: "white",
        marginVertical: 1.5,
        paddingVertical: 20,
        paddingLeft: 20
    },
    paymentText: {
        fontSize: 17,
        marginLeft: 15,
        marginTop: 5
    }
})

export default Payment;