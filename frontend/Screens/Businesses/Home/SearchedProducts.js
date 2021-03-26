import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native'

var { width } = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    return(
        <SafeAreaView>
            <Text>SEARCH PAGE</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default SearchedProduct;