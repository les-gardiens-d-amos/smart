import * as actionTypes from "./ActionTypes";

const startCameraAction = () => {
  return {
    type: actionTypes.SET_START_CAMERA,
  }
}

const takePictureAction = () => {
  return {
    type: actionTypes.TAKE_PICTURE,
  }
}

const setPreviewVisibleAction = (visible) => {
  return {
    type: actionTypes.SET_PREVIEW_VISIBLE,
    payload: visible
  }
}

const setCapturedImageAction = (image) => {
  return {
    type: actionTypes.SET_CAPTURED_IMAGE,
    payload: image
  }
}



export { startCameraAction, takePictureAction, setPreviewVisibleAction, setCapturedImageAction };
