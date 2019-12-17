import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./components/SettingsTab";

const AppNavigator = createStackNavigator(
    {
        Login: Login,
        Dashboard: Dashboard,
        Settings: Settings,
        Register: Register,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default createAppContainer(AppNavigator);
