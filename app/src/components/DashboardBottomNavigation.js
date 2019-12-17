import React from 'react';
import {connect} from 'react-redux';
import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
} from 'react-native-ui-kitten';
import {withNavigation} from "react-navigation";
import {changeSelectedTabAction} from "../redux/Reducer";

const DashboardIcon = (style) => (
    <Icon {...style} name='layout'/>
);

const SettingsIcon = (style) => (
    <Icon {...style} name='settings'/>
);

class DashboardBottomNavigation extends React.Component {
    onTabSelect = (selectedIndex) => {
        this.props.changeSelectedTab(selectedIndex)
    };

    render() {
        return (
            <BottomNavigation
                selectedIndex={this.props.selectedTab}
                onSelect={this.onTabSelect}>
                <BottomNavigationTab
                    title='DASHBOARD'
                    icon={DashboardIcon}
                />
                <BottomNavigationTab
                    title='SETTINGS'
                    icon={SettingsIcon}
                />
            </BottomNavigation>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedTab: state.app.selectedTab,
});

const mapDispatchToProps = (dispatch) => ({
    changeSelectedTab: (selectedTab) => dispatch(changeSelectedTabAction(selectedTab))
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DashboardBottomNavigation));
