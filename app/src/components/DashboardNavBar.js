import React from 'react';
import {
    Icon,
    Layout,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction,
} from "@ui-kitten/components";
import {withNavigation} from "react-navigation";

const MenuIcon = (style) => (
    <Icon {...style} name='more-vertical'/>
);

const LogoutIcon = (style) => (
    <Icon {...style} name='log-out'/>
);

class DashboardNavBar extends React.Component {

    state = {
        menuVisible: false,
    };

    menuData = [
        {title: 'Uitloggen', icon: LogoutIcon, style: {backgroundColor: '#151A30'}},
    ];

    onMenuActionPress = () => {
        const menuVisible = !this.state.menuVisible;
        this.setState({menuVisible});
    };

    onMenuItemSelect = (index) => {
        this.setState({menuVisible: false});
        if (index === 0) {
            this.logout();
        }
    };

    renderMenuAction = () => (
        <OverflowMenu
            visible={this.state.menuVisible}
            data={this.menuData}
            placement='bottom end'
            onSelect={this.onMenuItemSelect}
            onBackdropPress={this.onMenuActionPress}>
            <TopNavigationAction
                icon={MenuIcon}
                onPress={this.onMenuActionPress}
            />
        </OverflowMenu>
    );

    logout = () => {
        const url = 'http://aaronvandenberg.nl:3000/logout';
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
                    console.log(data)
                    if (data.logout) {
                        this.props.navigation.navigate('Login');
                    }
                }
            ).catch(err => {
                this.props.navigation.navigate('Login');
                alert('Error: De server is waarschijnlijk offline...');
                console.log(err)
            }
        );
    };

    render() {
        return (
            <Layout>
                <TopNavigation
                    title='Dashboard'
                    rightControls={this.renderMenuAction()}
                    style={{backgroundColor: '#1A2138'}}
                />
            </Layout>
        );
    }
}

export default withNavigation(DashboardNavBar);
