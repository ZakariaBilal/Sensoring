import { all } from 'redux-saga/effects';
import authenticateSaga from 'Services/APIS/authenticateAPI';
import experimentSaga from 'Services/APIS/experimentAPI';
import subjectSaga from 'Services/APIS/subjectAPI';
import sensorSaga from 'Services/APIS/sensorAPI';
import activitySaga from 'Services/APIS/activityAPI';
import activityTypeSaga from 'Services/APIS/activityTypeAPI';
import experimentDataSaga from 'Services/APIS/experimentDataAPI';

// Here you can include all the saga which you write for components
export default function* rootSaga() {
  yield all([
    authenticateSaga(),
    experimentSaga(),
    subjectSaga(),
    activitySaga(),
    activityTypeSaga(),
    experimentDataSaga(),
    sensorSaga(),

  ]);
}
