import { combineReducers } from 'redux';
import { cameraSlice } from './reducers/CameraSlice';

const rootReducer = combineReducers({
  camera: cameraSlice,

})

export default rootReducer;
