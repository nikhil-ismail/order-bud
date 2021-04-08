import React from "react";
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window')

const RateOrder = props => {

    const { order } = props.route.params;

    const handleSubmit = () => {
        props.navigation.navigate('Receipt');
    }

    return (
        <View>
            <View style={{backgroundColor: "white", flexDirection: "row", paddingTop: 25, paddingBottom: 15}}>
                <TouchableOpacity style={{marginTop: 30, marginLeft: 30}} onPress={() => props.navigation.navigate('Orders')}>
                    <Icon name="arrow-left" type="font-awesome-5" color="black" size={25} />
                </TouchableOpacity>
                <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 30, marginLeft: 78}}>Rate Your Order</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headerText}>How was your experience at {order.business.name}?</Text>
                    <View style={styles.starContainer}>
                        <TouchableOpacity style={{marginHorizontal: 7}}>
                            <Icon name="star" type="font-awesome-5" color="black" size={35} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 7}}>
                            <Icon name="star" type="font-awesome-5" color="black" size={35} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 7}}>
                            <Icon name="star" type="font-awesome-5" color="black" size={35} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 7}}>
                            <Icon name="star" type="font-awesome-5" color="black" size={35} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 7}}>
                            <Icon name="star" type="font-awesome-5" color="black" size={35} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        backgroundColor: "white",
        paddingVertical: 200
    },
    starContainer: {
        flexDirection: "row",
        marginLeft: 75,
        marginTop: 50
    },
    headerText: {
        flexWrap: "wrap",
        marginLeft: 40,
        marginTop: 15,
        fontSize: 22,
        fontWeight: "bold"
    },
    buttonContainer: {
        paddingBottom: 55
    },
    button: {
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "90%",
        marginTop: 50,
        marginLeft: 20
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    }
})

export default RateOrder;