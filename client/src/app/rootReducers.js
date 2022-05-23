import authentication from 'Services/Slices/authenticationSlice';
import experiment from 'Services/Slices/experimentSlice';
import subject from 'Services/Slices/subjectSlice';
import sensor from 'Services/Slices/sensorSlice';
import activity from 'Services/Slices/activitySlice';
import activityType from 'Services/Slices/activityTypeSlice';
import experimentData from 'Services/Slices/experimentDataSlice';

//Include all the reducer to combine and provide to configure store.

const rootReducer = {
  authentication,
  experiment,
  subject,
  sensor,
  activity,
  activityType,
  experimentData,


}

export default rootReducer;
