import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    startGetSensors,
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
    deleteSensorFailure
} from '../Slices/sensorSlice'
import { postRequest, getRequest, putRequest, deleteRequest } from 'app/axiosClient'

function* fetchSensors(action) {
    try {
        const response = yield call(() => getRequest('Sensor'));
        yield put(getSensorsSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getSensorsFailure());
    }
}

function* fetchSensor(action) {
    try {
        const response = yield call(() => getRequest('Sensor/' + action.payload));
        yield put(getSensorSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getSensorFailure());
    }
}

function* createSensor(action) {
    try {
        console.log('create Sensor', action)
        const response = yield call(() => postRequest('Sensor', action.payload));
        yield put(insertSensorSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(insertSensorFailure());
    }
}

function* updateSensor(action) {
    try {
        console.log('update Sensor', action)
        const response = yield call(() => putRequest('Sensor/' + (action.payload._id || action.payload), action.payload));
        yield put(updateSensorSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(updateSensorFailure());
    }
}

function* deleteSensor(action) {
    try {
        console.log('delete Sensor', action)
        const response = yield call(() => deleteRequest('Sensor/' + (action.payload._id || action.payload)));
        yield put(deleteSensorSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(deleteSensorFailure());
    }
}




export default function* rootSaga() {
    yield all([
        takeLatest(startGetSensors, fetchSensors),
        takeLatest(startGetSensor, fetchSensor),
        takeLatest(startInsertSensor, createSensor),
        takeLatest(startUpdateSensor, updateSensor),
        takeLatest(startDeleteSensor, deleteSensor),
    ]);
}
