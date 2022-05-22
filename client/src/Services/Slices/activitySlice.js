import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activities: [],
    activity: null,
    loader: false,
    error: false
}

const ActivitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        //Get ALL
        startGetActivities(state) {
            state.loader = true;
        },
        getActivitiesSuccess(state, action) {
            state.loader = false;
            state.activities = action.payload
        },
        getActivitiesFailure(state) {
            state.activities = [];
            state.loader = false;
            state.error = true;
        },
        // Get One
        startGetActivity(state) {
            state.loader = true
        },
        getActivitySuccess(state, action) {
            state.loader = false;
            state.activity = action.payload
        },
        getActivityFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Insert
        startInsertActivity(state) {
            state.loader = true
        },
        insertActivitySuccess(state, action) {
            state.loader = false;
            state.activity = action.payload
        },
        insertActivityFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Update
        startUpdateActivity(state) {
            state.loader = true
        },
        updateActivitySuccess(state, action) {
            state.loader = false;
            state.activity = action.payload
        },
        updateActivityFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Delete
        startDeleteActivity(state) {
            state.loader = true
        },
        deleteActivitySuccess(state, action) {
            state.loader = false;
            state.activities = state.activities.filter((activity) => (activity._id != action.payload._id));
        },
        deleteActivityFailure(state) {
            state.loader = false;
            state.error = true;
        },
    },
});

export const { startGetActivities,
    getActivitiesSuccess,
    getActivitiesFailure,
    startGetActivity,
    getActivitySuccess,
    getActivityFailure,
    startInsertActivity,
    insertActivitySuccess,
    insertActivityFailure,
    startUpdateActivity,
    updateActivitySuccess,
    updateActivityFailure,
    startDeleteActivity,
    deleteActivitySuccess,
    deleteActivityFailure } = ActivitySlice.actions;

export default ActivitySlice.reducer;
