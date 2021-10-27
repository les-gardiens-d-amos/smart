import * as actionTypes from "../actions/ActionTypes";

const camera = { st: false, capturedImage: null, cameraLocation: null };

const cameraSlice = (state = camera, action) => {

  switch (action.type) {
    case (actionTypes.SET_START_CAMERA): {
      return {
        ...state,
        st: true
      }
    }

    case (actionTypes.SET_CAPTURED_IMAGE): {
      return {
        ...state,
        capturedImage: action.payload.image,
        cameraLocation: action.payload.cameraLocation
      }
    }
    default:
      return state
  }
}

export { cameraSlice }
