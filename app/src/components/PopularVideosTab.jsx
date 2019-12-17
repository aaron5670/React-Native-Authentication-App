import * as React from "react";
import {Text} from "@ui-kitten/components";
import {VideosCarousel} from "../components/examples/SimpleCarousel";
import {DecksCarousel} from "./examples/DecksCarousel";

export default class PopularVideosTab extends React.Component {
    render() {
        return (
            <>
                <Text category={'h4'} style={{marginLeft: 8, marginTop: 10}}>Populaire video's</Text>
                <VideosCarousel/>

                <Text category={'h4'} style={{marginLeft: 8, marginBottom: 5}}>Your decks</Text>
                <DecksCarousel/>
            </>
        );
    }
}
