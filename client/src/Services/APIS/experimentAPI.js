import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    startGetExperiments,
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
} from '../Slices/experimentSlice'
import { postRequest, getRequest, putRequest, deleteRequest } from 'app/axiosClient'

function* fetchExperiments(action) {
    try {
        const response = yield call(() => getRequest('experiment'));
        yield put(getExperimentsSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getExperimentsFailure());
    }
}

function* fetchExperiment(action) {
    try {
        const response = yield call(() => getRequest('experiment/' + action.payload));
        yield put(getExperimentSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getExperimentFailure());
    }
}

function* fetchExperimentPopulate(action) {
    try {
        const response = yield call(() => getRequest('experiment/populate/' + action.payload));
        yield put(getExperimentPopulateSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getExperimentPopulateFailure());
    }
}

function* createExperiment(action) {
    try {
        console.log('create Experiment', action)
        const response = yield call(() => postRequest('experiment', action.payload));
        yield put(insertExperimentSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(insertExperimentFailure());
    }
}

function* updateExperiment(action) {
    try {
        console.log('update Experiment', action)
        const response = yield call(() => putRequest('experiment/' + action.payload._id, action.payload));
        yield put(updateExperimentSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(updateExperimentFailure());
    }
}

function* deleteExperiment(action) {
    try {
        console.log('delete Experiment', action)
        const response = yield call(() => deleteRequest('experiment/' + action.payload._id));
        yield put(deleteExperimentSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(deleteExperimentFailure());
    }
}



export default function* rootSaga() {
    yield all([
        takeLatest(startGetExperiments, fetchExperiments),
        takeLatest(startGetExperiment, fetchExperiment),
        takeLatest(startInsertExperiment, createExperiment),
        takeLatest(startUpdateExperiment, updateExperiment),
        takeLatest(startDeleteExperiment, deleteExperiment),
        takeLatest(startGetExperimentPopulate, fetchExperimentPopulate),
    ]);
}
