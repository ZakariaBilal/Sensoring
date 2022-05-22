import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activityTypes: [],
    activityType: null,
    loader: false,
    error: false
}

const ActivityTypeSlice = createSlice({
    name: 'activityType',
    initialState,
    reducers: {
        //Get ALL
        startGetActivityTypes(state) {
            state.loader = true;
        },
        getActivityTypesSuccess(state, action) {
            state.loader = false;
            state.activityTypes = action.payload
        },
        getActivityTypesFailure(state) {
            state.activityTypes = [];
            state.loader = false;
            state.error = true;
        },
        // Get One
        startGetActivityType(state) {
            state.loader = true
        },
        getActivityTypeSuccess(state, action) {
            state.loader = false;
            state.activityType = action.payload
        },
        getActivityTypeFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Insert
        startInsertActivityType(state) {
            state.loader = true
        },
        insertActivityTypeSuccess(state, action) {
            state.loader = false;
            state.activityType = action.payload
        },
        insertActivityTypeFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Update
        startUpdateActivityType(state) {
            state.loader = true
        },
        updateActivityTypeSuccess(state, action) {
            state.loader = false;
            state.activityType = action.payload
        },
        updateActivityTypeFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Delete
        startDeleteActivityType(state) {
            state.loader = true
        },
        deleteActivityTypeSuccess(state, action) {
            state.loader = false;
            state.activityTypes = state.activityTypes.filter((activityType) => (activityType._id != action.payload._id));
        },
        deleteActivityTypeFailure(state) {
            state.loader = false;
            state.error = true;
        },
    },
});

export const { startGetActivityTypes,
    getActivityTypesSuccess,
    getActivityTypesFailure,
    startGetActivityType,
    getActivityTypeSuccess,
    getActivityTypeFailure,
    startInsertActivityType,
    insertActivityTypeSuccess,
    insertActivityTypeFailure,
    startUpdateActivityType,
    updateActivityTypeSuccess,
    updateActivityTypeFailure,
    startDeleteActivityType,
    deleteActivityTypeSuccess,
    deleteActivityTypeFailure } = ActivityTypeSlice.actions;

export default ActivityTypeSlice.reducer;
