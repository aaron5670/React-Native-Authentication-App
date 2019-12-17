import React from 'react';
import {withNavigation} from "react-navigation";
import {
    Icon,
    Layout,
    TopNavigation,
    TopNavigationAction,
} from 'react-native-ui-kitten';

class RegisterNavBar extends React.Component {

    BackIcon = (style) => (
        <Icon {...style} name='arrow-back'/>
    );

    BackAction = () => (
        <TopNavigationAction icon={this.BackIcon} onPress={() => this.props.navigation.goBack()}/>
    );

    render() {
        return (
            <Layout>
                <TopNavigation
                    title='Account aanmaken'
                    alignment='start'
                    leftControl={this.BackAction()}
                />
            </Layout>
        );
    };
}

export default withNavigation(RegisterNavBar);
