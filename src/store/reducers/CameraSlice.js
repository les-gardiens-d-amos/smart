import * as actionTypes from "../actions/ActionTypes";

const camera = { st: false, previewVisible: false, capturedImage: null, cameraLocation: null };

const cameraSlice = (state = camera, action) => {

  switch (action.type) {
    case (actionTypes.SET_START_CAMERA): {
      return {
        ...state,
        st: true
      }
    }
    case (actionTypes.SET_PREVIEW_VISIBLE): {
      return {
        ...state,
        previewVisible: action.payload,
      }
    }
    case (actionTypes.SET_CAPTURED_IMAGE): {
      return {
        ...state,
        capturedImage: action.payload.data,
        cameraLocation: action.payload.cameraLocation
      }
    }
    default:
      return state
  }
}

export { cameraSlice }
