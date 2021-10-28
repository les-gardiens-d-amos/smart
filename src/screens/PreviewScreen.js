import React, { useState, setState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { useDispatch } from 'react-redux';
import { setCapturedImageAction, setPreviewVisibleAction } from '../store/actions/CameraActions';
import store from '../store/Store';
import { colors } from "../style/theme";
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DisplayResultScreen from './DisplayResultScreen';
const { primary_c, secondary_c, tertiary_c, error_c } = colors;


const PreviewScreen = ({ image }) => {

  const dispatch = useDispatch();
  const [getInfo, setGetInfo] = useState(false)

  const savePhoto = () => {
    setGetInfo(true);
  }

  const cancelPicture = () => {
    dispatch(setCapturedImageAction({}))
  }
  return (
    <View style={styles.container}>
      {getInfo ?
        (
          <DisplayResultScreen />
        ) : (
          <View style={styles.screenView}>
            <Image
              source={{ uri: image.path }}
              style={{
                flex: 1
              }}
            >
            </Image>
            <View style={styles.imageBackgroundView}>
              <View style={styles.buttonsContainerView}>
                <TouchableOpacity
                  onPress={cancelPicture}
                  style={styles.buttons}
                >
                  <Text style={styles.buttonsText}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={savePhoto}
                  style={styles.buttons}
                >
                  <Text style={styles.buttonsText}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )

      }

    </View>


  )
}

export default PreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenView: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  imageBackgroundView: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end'
  },
  buttonsContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: colors.primary_c
  },
  buttonsText: {
    color: '#fff',
    fontSize: 20
  }
});
