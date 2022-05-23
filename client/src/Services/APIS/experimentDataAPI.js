import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    startGetExperimentDatas,
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
    deleteExperimentDataFailure
} from '../Slices/experimentDataSlice'
import { postRequest, getRequest, putRequest, deleteRequest } from 'app/axiosClient'

function* fetchExperimentDatas(action) {
    try {
        const response = yield call(() => getRequest('experimentData'));
        yield put(getExperimentDatasSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getExperimentDatasFailure());
    }
}

function* fetchExperimentData(action) {
    try {
        const response = yield call(() => getRequest('experimentData/' + action.payload));
        yield put(getExperimentDataSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getExperimentDataFailure());
    }
}

function* createExperimentData(action) {
    try {
        console.log('create ExperimentData', action)
        const response = yield call(() => postRequest('experimentData', action.payload));
        yield put(insertExperimentDataSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(insertExperimentDataFailure());
    }
}

function* updateExperimentData(action) {
    try {
        console.log('update ExperimentData', action)
        const response = yield call(() => putRequest('experimentData/' + action.payload._id, action.payload));
        yield put(updateExperimentDataSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(updateExperimentDataFailure());
    }
}

function* deleteExperimentData(action) {
    try {
        console.log('delete ExperimentData', action)
        const response = yield call(() => deleteRequest('experimentData/' + action.payload._id));
        yield put(deleteExperimentDataSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(deleteExperimentDataFailure());
    }
}




export default function* rootSaga() {
    yield all([
        takeLatest(startGetExperimentDatas, fetchExperimentDatas),
        takeLatest(startGetExperimentData, fetchExperimentData),
        takeLatest(startInsertExperimentData, createExperimentData),
        takeLatest(startUpdateExperimentData, updateExperimentData),
        takeLatest(startDeleteExperimentData, deleteExperimentData),
    ]);
}
