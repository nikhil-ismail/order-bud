import React from "react"
import { SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get("window")

const ManageProducts = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Manage Products</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default ManageProducts;