import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';


function SlideBar(props) {
  const [value, setValue] = useState(0);

  const slideValueHandler = (value) => {
    if(props.onSlide === undefined) {
      setValue(value);
      return;
    } else {
      setValue(value);
      props.onSlide(value);
    }
  }

  return(
    <View style={styles.volumeSlider}>
      <Slider
        value={props.slideValue ? props.slideValue : value}
        onValueChange={value => slideValueHandler(value)}
        thumbTintColor='white'
        maximumTrackTintColor='#222823'
        minimumTrackTintColor='white'
        thumbStyle={{width:15, height:15}}
        containerStyle={{
          height:15,
        }}
        
        //thumbTouchSize={{width:30, height: 30}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    volumeSlider:{
        width: "20vw",
        justifyContent: "center",
    },
});

export { SlideBar };