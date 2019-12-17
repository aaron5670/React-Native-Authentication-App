import React from "react";
import {Dimensions, StyleSheet} from 'react-native';
import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";

const {width: viewportWidth} = Dimensions.get('window');


const Images = [
    {uri: "https://i.imgur.com/sNam9iJ.jpg"},
    {uri: "https://i.imgur.com/N7rlQYt.jpg"},
    {uri: "https://i.imgur.com/UDrH0wm.jpg"},
    {uri: "https://i.imgur.com/Ka8kNST.jpg"}
];

const Videos = [
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
        title: "Kees de boer - Mijn dikke hit"
    }, {
        id: "gfsdfgsdfg",
        thumbnail: "https://i.imgur.com/Ka8kNST.jpg",
        title: "Sjonnie - Lorem nummer"
    }, {
        id: "dfsdf",
        thumbnail: "https://i.imgur.com/UDrH0wm.jpg",
        title: "Sjon - Impsum 2"
    }, {
        id: "dfsdf",
        thumbnail: "https://i.imgur.com/N7rlQYt.jpg",
        title: "Angernoizer - Execute (Videoclip)"
    }
];

export class MyCarousel extends React.Component {

    _renderItem = ({item, index}) => {
        console.log("rendering,", index, item)
        return (
            <ThumbnailBackgroundView>
                <CurrentVideoTO
                    onPress={() => {
                        console.log("clicked to index", index)
                        this._carousel.snapToItem(index);
                    }}>

                    <CurrentVideoImage source={{uri: item.thumbnail}}/>
                </CurrentVideoTO>
                <VideoTitleText>{item.title}</VideoTitleText>
            </ThumbnailBackgroundView>
        );
    }

    handleSnapToItem(index) {
        console.log("snapped to ", index)
    }

    render() {
        return (
            <Carousel
                ref={(c) => {
                    this._carousel = c;
                }}
                data={Videos}
                renderItem={this._renderItem}
                onSnapToItem={this.handleSnapToItem.bind(this)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={0}
                autoplay={false}
                loop={true}
            />
        );
    }
}

const horizontalMargin = 40;
const slideWidth = (viewportWidth / 2) - 25;

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + horizontalMargin * 2;

const styles = StyleSheet.create({
    slide: {
        width: itemWidth,
        paddingHorizontal: horizontalMargin
        // other styles for the item container
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1,
        // other styles for the inner container
    }
});

const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`;
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
`;

const CurrentVideoTO = styled.TouchableOpacity``;
