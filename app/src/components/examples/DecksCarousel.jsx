import React from "react";
import {Dimensions, StyleSheet, View} from 'react-native';
import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import {
    Button,
    Card,
    CardHeader,
    Text,
} from '@ui-kitten/components';

const {width: viewportWidth} = Dimensions.get('window');


const Decks = [
    {
        id: 1,
        title: "English to Dutch verbs",
        description: "A example deck for learning English.",
        username: "Aaron"
    }, {
        id: 2,
        title: "Dutch to English verbs",
        description: "A example deck for learning Dutch.",
        username: "Aaron"
    }, {
        id: 3,
        title: "Learning Spanish prefixes ",
        description: "Spanish prefixes for my son.",
        username: "Aaron"
    }, {
        id: 4,
        title: "Popular Dutch verbs",
        description: "Learning Dutch verbs",
        username: "Aaron"
    }, {
        id: 5,
        title: "Pets in Japans",
        description: "Learning Japans words",
        username: "Aaron"
    }
];

const Header = (item) => (
    <CardHeader
        title={item.title}
        description={`By ${item.username}`}
    />
);

const Footer = (item) => (
    <View style={styles.footerContainer}>
        <Button
            style={styles.footerControl}
            size='small'
            onPress={() => {
                alert("clicked on deckId: " + item.id)
            }}>
            PLAY DECK
        </Button>
    </View>
);

export class DecksCarousel extends React.Component {

    _renderItem = ({item, index}) => {
        console.log("rendering,", index, item)
        return (
            <ThumbnailBackgroundView>
                <CurrentDeckTO
                    onPress={() => {
                        console.log("clicked to index", index)
                        this._carousel.snapToItem(index);
                    }}>

                    <Card header={() => Header(item)} footer={() => Footer(item)} status='success' style={{backgroundColor: '#151A30'}}>
                        <Text style={{minWidth: 200}}>
                            {item.description}
                        </Text>
                    </Card>
                </CurrentDeckTO>
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
                data={Decks}
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
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerControl: {
        marginHorizontal: 4,
    },
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

const CurrentDeckTO = styled.TouchableOpacity``;
