import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ListItem, Badge, Text } from 'native-base';

const CategoryFilter = (props) => {

    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "white" }}
        >
            <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                {props.categories.map((item) => (
                <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                        props.categoryFilter(item._id), 
                        props.setActive(props.categories.indexOf(item))
                    }}
                  >
                    <View style={[styles.center, {margin: 3}]}>
                        <TouchableOpacity style={styles.imageFilter}></TouchableOpacity>
                        <Text style={{ color: 'black', padding: 10 }}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageFilter: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'grey'
    }
})

export default CategoryFilter;