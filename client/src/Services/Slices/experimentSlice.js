import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    experiments: [],
    experiment: null,
    currentExperiment: null,
    currentExperimentId: '6285399c778b6870a773d27a',
    loader: false,
    error: false,
    activityEnded: false,
    experimentEnded: false,
}

const experimentSlice = createSlice({
    name: 'experiment',
    initialState,
    reducers: {
        startSetcurrentExperimentId(state, action) {
            state.currentExperimentId = action.payload
        },
        setActivityEnded(state, action) {
            state.activityEnded = action.payload;
        },
        setExperimentEnded(state, action) {
            state.experimentEnded = action.payload;
        },
        //Get ALL
        startGetExperiments(state) {
            state.loader = true;
        },
        getExperimentsSuccess(state, action) {
            state.loader = false;
            state.experiments = action.payload
        },
        getExperimentsFailure(state) {
            state.experiments = [];
            state.loader = false;
            state.error = true;
        },
        // Get One
        startGetExperiment(state) {
            state.loader = true
        },
        getExperimentSuccess(state, action) {
            state.loader = false;
            state.experiment = action.payload
        },
        getExperimentFailure(state) {
            state.loader = false;
            state.error = true;
        },
        // Get One Populated
        startGetExperimentPopulate(state) {
            state.loader = true
        },
        getExperimentPopulateSuccess(state, action) {
            state.loader = false;
            state.currentExperiment = action.payload
        },
        getExperimentPopulateFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Insert
        startInsertExperiment(state) {
            state.loader = true
        },
        insertExperimentSuccess(state, action) {
            state.loader = false;
            state.experiment = action.payload
        },
        insertExperimentFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Update
        startUpdateExperiment(state) {
            state.loader = true
        },
        updateExperimentSuccess(state, action) {
            state.loader = false;
            state.experiment = action.payload
        },
        updateExperimentFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Delete
        startDeleteExperiment(state) {
            state.loader = true
        },
        deleteExperimentSuccess(state, action) {
            state.loader = false;
            state.experiments = state.experiments.filter((experiment) => (experiment._id != action.payload._id));
        },
        deleteExperimentFailure(state) {
            state.loader = false;
            state.error = true;
        },
    },
});

export const { startGetExperiments,
    getExperimentsSuccess,
    getExperimentsFailure,
    startGetExperiment,
    getExperimentSuccess,
    getExperimentFailure,
    startGetExperimentPopulate,
    getExperimentPopulateSuccess,
    getExperimentPopulateFailure,
    startInsertExperiment,
    insertExperimentSuccess,
    insertExperimentFailure,
    startUpdateExperiment,
    updateExperimentSuccess,
    updateExperimentFailure,
    startDeleteExperiment,
    deleteExperimentSuccess,
    deleteExperimentFailure,
    startSetcurrentExperimentId,
    setActivityEnded,
    setExperimentEnded, } = experimentSlice.actions;

export default experimentSlice.reducer;
