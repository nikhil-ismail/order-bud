import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ListItem, Text } from 'native-base';

const CategoryFilter = (props) => {
        
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "white"}}
        >
            <ListItem>
                {props.categories.map((category) => (
                    <TouchableOpacity key={category._id} onPress={() => props.navigation.navigate('Search Results', {category: category.name})}>
                        <View style={styles.imageFilter} />
                        <Text style={styles.textStyle}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageFilter: {
        height: 125,
        width: 125,
        borderRadius: 5,
        backgroundColor: 'grey',
        marginRight: 10
    },
    textStyle: {
        position: "absolute",
        color: "white",
        fontWeight: "bold",
        bottom: 10,
        left: 15
    }
})

export default CategoryFilter;