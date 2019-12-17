'use strict';
import React from 'react';
import {Text} from 'react-native';

class Fetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchData: 'loading..',
        }
    }

    componentDidMount() {
        const url = 'http://aaronvandenberg.nl:3000/test';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors'
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    this.setState({
                        fetchData: data.message
                    })
                }
            ).catch(err => console.log(err));
    }


    render() {
        return (
            <Text>{this.state.fetchData}</Text>
        )
    }
}

export default Fetch
