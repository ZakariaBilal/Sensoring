import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sensors: [],
    sensor: null,
    loader: false,
    error: false
}

const SensorSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
        //Get ALL
        startGetSensors(state) {
            state.loader = true;
        },
        getSensorsSuccess(state, action) {
            state.loader = false;
            state.sensors = action.payload
        },
        getSensorsFailure(state) {
            state.sensors = [];
            state.loader = false;
            state.error = true;
        },
        // Get One
        startGetSensor(state) {
            state.loader = true
        },
        getSensorSuccess(state, action) {
            state.loader = false;
            state.sensor = action.payload
        },
        getSensorFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Insert
        startInsertSensor(state) {
            state.loader = true
        },
        insertSensorSuccess(state, action) {
            state.loader = false;
            state.sensor = action.payload
        },
        insertSensorFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Update
        startUpdateSensor(state) {
            state.loader = true
        },
        updateSensorSuccess(state, action) {
            state.loader = false;
            state.sensor = action.payload
        },
        updateSensorFailure(state) {
            state.loader = false;
            state.error = true;
        },
        //Delete
        startDeleteSensor(state) {
            state.loader = true
        },
        deleteSensorSuccess(state, action) {
            state.loader = false;
            state.sensors = state.sensors.filter((sensor) => (sensor._id != action.payload._id));
        },
        deleteSensorFailure(state) {
            state.loader = false;
            state.error = true;
        },
    },
});

export const { startGetSensors,
    getSensorsSuccess,
    getSensorsFailure,
    startGetSensor,
    getSensorSuccess,
    getSensorFailure,
    startInsertSensor,
    insertSensorSuccess,
    insertSensorFailure,
    startUpdateSensor,
    updateSensorSuccess,
    updateSensorFailure,
    startDeleteSensor,
    deleteSensorSuccess,
    deleteSensorFailure } = SensorSlice.actions;

export default SensorSlice.reducer;
