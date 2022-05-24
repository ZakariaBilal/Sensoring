import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
    startGetSubjects,
    getSubjectsSuccess,
    getSubjectsFailure,
    startGetSubject,
    getSubjectSuccess,
    getSubjectFailure,
    startInsertSubject,
    insertSubjectSuccess,
    insertSubjectFailure,
    startUpdateSubject,
    updateSubjectSuccess,
    updateSubjectFailure,
    startDeleteSubject,
    deleteSubjectSuccess,
    deleteSubjectFailure
} from '../Slices/subjectSlice'
import { postRequest, getRequest, putRequest, deleteRequest } from 'app/axiosClient'

function* fetchSubjects(action) {
    try {
        yield put(getSubjectsSuccess(null));
        const response = yield call(() => getRequest('Subject'));
        yield put(getSubjectsSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getSubjectsFailure());
    }
}

function* fetchSubject(action) {
    try {
        yield put(getSubjectSuccess(null));
        const response = yield call(() => getRequest('Subject/' + action.payload));
        yield put(getSubjectSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(getSubjectFailure());
    }
}

function* createSubject(action) {
    try {
        console.log('create Subject', action)
        const response = yield call(() => postRequest('Subject', action.payload));
        yield put(insertSubjectSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(insertSubjectFailure());
    }
}

function* updateSubject(action) {
    try {
        console.log('update Subject', action)
        const response = yield call(() => putRequest('Subject/' + (action.payload._id || action.payload), action.payload));
        yield put(updateSubjectSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(updateSubjectFailure());
    }
}

function* deleteSubject(action) {
    try {
        console.log('delete Subject', action)
        const response = yield call(() => deleteRequest('Subject/' + (action.payload._id || action.payload)));
        yield put(deleteSubjectSuccess(response.data));
    } catch (e) {
        console.error(e);
        yield put(deleteSubjectFailure());
    }
}




export default function* rootSaga() {
    yield all([
        takeLatest(startGetSubjects, fetchSubjects),
        takeLatest(startGetSubject, fetchSubject),
        takeLatest(startInsertSubject, createSubject),
        takeLatest(startUpdateSubject, updateSubject),
        takeLatest(startDeleteSubject, deleteSubject),
    ]);
}
