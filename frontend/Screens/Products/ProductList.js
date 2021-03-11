import React from 'react';
import { TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native';

import ProductCard from './ProductCard'

const ProductList = (props) => {
    const { item } = props;
    return(
        <TouchableOpacity 
            style={styles.productContainer}
            onPress={() => 
                props.navigation.navigate("Product Detail", { item: item})
            }
        >
            <ProductCard {...item} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        width: '95%',
        marginBottom: 15
    }
  });

export default ProductList;