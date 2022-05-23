import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    startGetActivities,
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
    deleteActivityFailure
} from '../Slices/activitySlice'
import { postRequest, getRequest, putRequest, deleteRequest } from 'app/axiosClient'

function* fetchActivities(action) {
    try {
        const response = yield call(() => getRequest('Activity'));
        yield put(getActivitiesSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getActivitiesFailure());
    }
}

function* fetchActivity(action) {
    try {
        const response = yield call(() => getRequest('Activity/' + action.payload));
        yield put(getActivitySuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getActivityFailure());
    }
}

function* createActivity(action) {
    try {
        console.log('create Activity', action)
        const response = yield call(() => postRequest('Activity', action.payload));
        yield put(insertActivitySuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(insertActivityFailure());
    }
}

function* updateActivity(action) {
    try {
        console.log('update Activity', action)
        const response = yield call(() => putRequest('Activity/' + (action.payload._id || action.payload), action.payload));
        yield put(updateActivitySuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(updateActivityFailure());
    }
}

function* deleteActivity(action) {
    try {
        console.log('delete Activity', action.payload._id || action.payload, 'Activity/' + (action.payload._id || action.payload))
        const response = yield call(() => deleteRequest('Activity/' + (action.payload._id || action.payload)));
        yield put(deleteActivitySuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(deleteActivityFailure());
    }
}




export default function* rootSaga() {
    yield all([
        takeLatest(startGetActivities, fetchActivities),
        takeLatest(startGetActivity, fetchActivity),
        takeLatest(startInsertActivity, createActivity),
        takeLatest(startUpdateActivity, updateActivity),
        takeLatest(startDeleteActivity, deleteActivity),
    ]);
}
