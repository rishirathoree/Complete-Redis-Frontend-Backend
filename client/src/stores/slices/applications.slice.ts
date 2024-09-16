import { createSlice } from "@reduxjs/toolkit";
import helpers from "../../lib/helper.config";

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('applicationState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveStateToLocalStorage = (state:any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('applicationState', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

const initialState = loadStateFromLocalStorage() || {
    clickSound: false,
    notificationSound: false,
    primaryColor: "#FF5555",
    secondaryColor: "",
    sidebarCollapsed: false,
};

const ApplicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        toggleClickSound: (state) => {
            state.clickSound = !state.clickSound;
            saveStateToLocalStorage(state);
        },
        toggleNotificationSound: (state) => {
            state.notificationSound = !state.notificationSound;
            saveStateToLocalStorage(state);
        },
        setBrandColorHelper: (state, action) => {
            const primaryColor = helpers.hexToHSL(action.payload);
            const secondaryColor = helpers.hexToHSL(action.payload, 0.2);
            state.primaryColor = primaryColor;
            state.secondaryColor = secondaryColor;
            document.documentElement.style.setProperty('--primary-theme-color', primaryColor);
            document.documentElement.style.setProperty('--secondary-theme-color', secondaryColor);
            saveStateToLocalStorage(state);
        },
        sidebarCloser : (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
            saveStateToLocalStorage(state);
        }
    },
});

export const { toggleClickSound, toggleNotificationSound, setBrandColorHelper, sidebarCloser } = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
