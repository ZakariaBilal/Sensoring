import authentication from 'Services/Slices/authenticationSlice';
import experiment from 'Services/Slices/experimentSlice';
import subject from 'Services/Slices/subjectSlice';
import activity from 'Services/Slices/activitySlice';
import activityType from 'Services/Slices/activityTypeSlice';

//Include all the reducer to combine and provide to configure store.

const rootReducer = {
  authentication,
  experiment,
  subject,
  activity,
  activityType,


}

export default rootReducer;
