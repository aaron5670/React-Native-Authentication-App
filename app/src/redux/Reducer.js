import {combineReducers} from 'redux';
import {
    CHANGE_SELECTED_TAB_ACTION,
    CHANGE_USER_STATUS_ACTION,
    CHANGE_USERNAME_ACTION
} from "./actionConstants";

export const changeUsernameAction = (username) => ({
    type: CHANGE_USERNAME_ACTION,
    username: username
});

export const changeUserStatusAction = (userStatus) => ({
    type: CHANGE_USER_STATUS_ACTION,
    userStatus: userStatus
});

export const changeSelectedTabAction = (selectedTab) => ({
    type: CHANGE_SELECTED_TAB_ACTION,
    selectedTab: selectedTab
});

const INITIAL_STATE = {
    username: null,
    userStatus: null,
    selectedTab: 0
};

const appReducer = (state = INITIAL_STATE, action) => {
    let changes = null;
    switch (action.type) {
        case CHANGE_USERNAME_ACTION:
            changes = {
                username: action.username,
            };
            return {...state, ...changes};

        case CHANGE_USER_STATUS_ACTION:
            changes = {
                userStatus: action.userStatus,
            };
            return {...state, ...changes};

        case CHANGE_SELECTED_TAB_ACTION:
            changes = {
                selectedTab: action.selectedTab,
            };
            return {...state, ...changes};

        default:
            return state
    }
};

export default combineReducers({
    app: appReducer,
});
