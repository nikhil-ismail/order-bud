import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg",
      "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
      "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.swiper}>
        <Swiper
          style={{ height: width * 0.4}}
          showButtons={false}
          autoplay={true}
          autoplayTimeout={4}
        >
          {bannerData.map((item) => {
            return (
              <Image
                key={item}
                style={styles.imageBanner}
                resizeMode="contain"
                source={{ uri: item }}
              />
            );
          })}
        </Swiper>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    width: width,
  },
  imageBanner: {
    height: width * 0.38,
    width: width * 0.75,
    borderRadius: 30,
    marginHorizontal: (width - width * 0.75) * 0.5,
  },
});

export default Banner;
