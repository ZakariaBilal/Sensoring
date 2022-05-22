import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    startGetActivityTypes,
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
    deleteActivityTypeFailure
} from '../Slices/activityTypeSlice'
import { postRequest, getRequest, putRequest, deleteRequest } from 'app/axiosClient'

function* fetchActivityTypes(action) {
    try {
        const response = yield call(() => getRequest('ActivityType'));
        yield put(getActivityTypesSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getActivityTypesFailure());
    }
}

function* fetchActivityType(action) {
    try {
        const response = yield call(() => getRequest('ActivityType/' + action.payload));
        yield put(getActivityTypeSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getActivityTypeFailure());
    }
}

function* createActivityType(action) {
    try {
        console.log('create ActivityType', action)
        const response = yield call(() => postRequest('ActivityType', action.payload));
        yield put(insertActivityTypeSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(insertActivityTypeFailure());
    }
}

function* updateActivityType(action) {
    try {
        console.log('update ActivityType', action)
        const response = yield call(() => putRequest('ActivityType/' + action.payload._id, action.payload));
        yield put(updateActivityTypeSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(updateActivityTypeFailure());
    }
}

function* deleteActivityType(action) {
    try {
        console.log('delete ActivityType', action)
        const response = yield call(() => deleteRequest('ActivityType/' + action.payload._id));
        yield put(deleteActivityTypeSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(deleteActivityTypeFailure());
    }
}




export default function* rootSaga() {
    yield all([
        takeLatest(startGetActivityTypes, fetchActivityTypes),
        takeLatest(startGetActivityType, fetchActivityType),
        takeLatest(startInsertActivityType, createActivityType),
        takeLatest(startUpdateActivityType, updateActivityType),
        takeLatest(startDeleteActivityType, deleteActivityType),
    ]);
}
