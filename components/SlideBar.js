import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';


function SlideBar(props) {
  const [value, setValue] = useState(0);
  const [hovered, setHovered] = useState(false);

  const slideValueHandler = (value) => {
    if(props.onSlide === undefined) {
      setValue(value);
      return;
    } else {
      setValue(value);
      props.onSlide(value);
    }
  }


  let handleHoveredEvent = (v) => {

    console.log(hovered);

    (v === null) ? setHovered(!hovered) : setHovered(v);

    console.log(hovered);

  }

  return(
    <View style={styles.volumeSlider} onMouseLeave={() => handleHoveredEvent(false)} onMouseEnter={() => handleHoveredEvent(true)}>

      <Slider
        value={props.slideValue ? props.slideValue : value}
        onValueChange={value => slideValueHandler(value)}
        thumbTintColor='white'
        maximumTrackTintColor='#414d43'
        minimumTrackTintColor={hovered ? '#46eba1' : "white"}
        thumbStyle={hovered ? styles.thumbStyleHovered : styles.thumbStyle}

        containerStyle={{
          height:15,
        }}

        trackRightPadding={5}
        
      />

    </View>
  );
}

const styles = StyleSheet.create({
    volumeSlider:{
        width: "20vw",
        justifyContent: "center",
    },
    thumbStyleHovered:{
      width:13, 
      height:13,
      opacity: 1,
    },
    thumbStyle:{
      width:12, 
      height:12,
      opacity: 0,
    }
});

export { SlideBar };