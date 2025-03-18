import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useAnimatedValue = (valueToAnimate, setValue, targetValue, AnimDurration = 1000, _easing = Easing.linear, states) => {
  // Ref to track the first render
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on the first render

    if (isFirstRender.current && !(states === undefined)) {
      isFirstRender.current = false;
      return; // Don't start the animation on first render
    }

    // Start the animation when the state changes
    Animated.timing(valueToAnimate, {

      toValue: targetValue, // Target value to animate to
      duration: AnimDurration, // Duration in ms
      useNativeDriver: true, // Use native driver for better performance
      easing: _easing, // Apply easing function
    }).start(() => {

      // Animation complete callback
      valueToAnimate.removeAllListeners(); // Remove all listeners after the animation completes
    });

    // updates 'valueToAnimate' to the animated value using 'setValue'
    const id = valueToAnimate.addListener(({ value }) => {
      setValue(value); // Update the state with the animated value
    });

    // Clean up the listener when the component unmounts or dependencies change
    return () => {
      valueToAnimate.removeListener(id);
    };
  }, [targetValue, AnimDurration, _easing, states]); // Dependencies will trigger the effect only when they change
};

export default useAnimatedValue;
