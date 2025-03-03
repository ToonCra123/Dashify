import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';


function SlideBar(props) {
  const [value, setValue] = useState(0.5);

  return(
    <View style={styles.volumeSlider}>
      <Slider
        value={value}
        onValueChange={value => setValue(value)}
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