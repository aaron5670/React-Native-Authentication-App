import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import {Text, View} from "react-native";
import {StyleSheet} from 'react-native';
import React from "react";
const { width: viewportWidth } = Dimensions.get('window');

const Images = [
    {
        id: "WpIAc9by5iU",
        thumbnail: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
        title: "Led Zeppelin - Stairway To Heaven"
    }, {
        id: "sNPnbI1arSE",
        thumbnail: "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
        title: "Eminem - My Name Is"
    }, {
        id: "VOgFZfRVaww",
        thumbnail: "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
        title: "Test"
    }, {
        id: "jdlakfjsdlf",
        thumbnail: "https://i.imgur.com/sNam9iJ.jpg",
        title: "Test2"
    },
];

export class ParallaxSlider extends React.Component {

    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.thumbnail }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.2}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={Images}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
        );
    }
}

const screenWidth = viewportWidth;


const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});
