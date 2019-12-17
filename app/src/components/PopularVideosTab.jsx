import * as React from "react";
import {Text} from "react-native-ui-kitten";
import {VideosCarousel} from "../components/examples/SimpleCarousel";

export default class PopularVideosTab extends React.Component {
    render() {
        return (
            <>
                <Text category={'h4'} style={{marginLeft: 8, marginTop: 10}}>Populaire video's</Text>
                <VideosCarousel/>
            </>
        );
    }
}
