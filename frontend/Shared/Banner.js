import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView, SafeAreaView } from "react-native";
import Swiper from "react-native-swiper/src";
import { Text } from "native-base";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://static.hollywoodreporter.com/wp-content/uploads/2020/12/201122_MONOGRAM_BLACK_1216-1-1607568137-928x523.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width * 0.5 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={4}
          >
            {bannerData.map((item) => {
              return (
                <View key={item}>
                  <Image
                    style={styles.imageBanner}
                    source={{ uri: item }}
                  />
                  <Text style={styles.bannerText}>Monogram by Jay Z.</Text>
                </View>
              );
            })}
          </Swiper>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    width: width,
  },
  imageBanner: {
    height: "100%",
    width: width,
  },
  bannerText: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    bottom: 10,
    margin: 10
  }
});

export default Banner;