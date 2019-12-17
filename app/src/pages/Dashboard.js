import * as React from "react";
import {StyleSheet} from "react-native";
import {connect} from 'react-redux';
import {Layout} from "@ui-kitten/components";
import DashboardNavBar from "../components/DashboardNavBar";
import DashboardBottomNavigation from "../components/DashboardBottomNavigation";
import PopularVideosTab from "../components/PopularVideosTab";
import SettingsTab from "../components/SettingsTab";
import {changeSelectedTabAction} from "../redux/Reducer";


class Dashboard extends React.Component {

    pageCheck = () => {
        if (this.props.selectedTab === 0) {
            return (
                <PopularVideosTab/>
            );
        } else if (this.props.selectedTab === 1) {
            return (
                <SettingsTab/>
            );
        }
    }

    render() {
        console.log(this.props.selectedTab)
        return (
            <Layout style={{flex: 1}}>
                <Layout style={{flex: 1, justifyContent: 'flex-start', maxHeight: 50}}>
                    <DashboardNavBar/>
                </Layout>

                <Layout style={{flex: 2}}>
                    {this.pageCheck()}
                </Layout>

                <Layout style={{flex: 3, justifyContent: 'flex-end', maxHeight: 50}}>
                    <DashboardBottomNavigation/>
                </Layout>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => ({
    selectedTab: state.app.selectedTab,
});

const mapDispatchToProps = (dispatch) => ({
    changeSelectedTab: (selectedTab) => dispatch(changeSelectedTabAction(selectedTab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
