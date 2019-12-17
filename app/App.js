import React from 'react';
import {mapping, light, dark} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from 'react-native-ui-kitten';
import AppNavigator from "./src/AppNavigator";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import combineReducers from './src/redux/Reducer';

const store = createStore(combineReducers);

const App = () => (
    <Provider store={store}>
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider mapping={mapping} theme={dark}>
                <AppNavigator/>
            </ApplicationProvider>
        </React.Fragment>
    </Provider>
);

export default App;
