import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    experimentDatas: [],
    experimentData: null,
    loader: false,
    error: false
}

const ExperimentDataSlice = createSlice({
    name: 'experimentData',
    initialState,
    reducers: {
        //Get ALL
        startGetExperimentDatas(state) {
            state.loader = true;
        },
        getExperimentDatasSuccess(state, action) {
            state.loader = false;
            state.experimentDatas = action.payload
        },
        getExperimentDatasFailure(state) {
            state.experimentDatas = [];
            state.loader = false;
            state.error = true;
        },
        // Get One
        startGetExperimentData(state) {
            state.loader = true
        },
        getExperimentDataSuccess(state, action) {
            state.loader = false;
            state.experimentData = action.payload
        },
        getExperimentDataFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Insert
        startInsertExperimentData(state) {
            state.loader = true
        },
        insertExperimentDataSuccess(state, action) {
            state.loader = false;
            // state.experimentData = action.payload
        },
        insertExperimentDataFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Update
        startUpdateExperimentData(state) {
            state.loader = true
        },
        updateExperimentDataSuccess(state, action) {
            state.loader = false;
            state.experimentData = action.payload
        },
        updateExperimentDataFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Delete
        startDeleteExperimentData(state) {
            state.loader = true
        },
        deleteExperimentDataSuccess(state, action) {
            state.loader = false;
            state.experimentDatas = state.experimentDatas.filter((experimentData) => (experimentData._id != action.payload._id));
        },
        deleteExperimentDataFailure(state) {
            state.loader = false;
            state.error = true;
        },
    },
});

export const { startGetExperimentDatas,
    getExperimentDatasSuccess,
    getExperimentDatasFailure,
    startGetExperimentData,
    getExperimentDataSuccess,
    getExperimentDataFailure,
    startInsertExperimentData,
    insertExperimentDataSuccess,
    insertExperimentDataFailure,
    startUpdateExperimentData,
    updateExperimentDataSuccess,
    updateExperimentDataFailure,
    startDeleteExperimentData,
    deleteExperimentDataSuccess,
    deleteExperimentDataFailure } = ExperimentDataSlice.actions;

export default ExperimentDataSlice.reducer;
