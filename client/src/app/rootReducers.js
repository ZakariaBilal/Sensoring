import authentication from 'Services/Slices/authenticationSlice';
import experiment from 'Services/Slices/experimentSlice';
import subject from 'Services/Slices/subjectSlice';

//Include all the reducer to combine and provide to configure store.

const rootReducer = {
  authentication,
  experiment,
  subject,


}

export default rootReducer;
