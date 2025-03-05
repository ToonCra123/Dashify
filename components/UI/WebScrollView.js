import React, { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';

const WebScrollView = (props) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!props.disableShiftScrolling) return;

    let scrollAmount = 0;
    let ticking = false;

    const handleWheelScroll = (event) => {
      if (!scrollRef.current) return;
      
      event.preventDefault();
      
      scrollAmount += event.deltaY * props.scrollSpeed; // Reduce speed (lower = slower)
      
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollRef.current.scrollTo({
            x: scrollRef.current.getScrollableNode().scrollLeft + scrollAmount,
            animated: true,
          });
          scrollAmount = 0;
          ticking = false;
        });
        ticking = true;
      }
    };

    const scrollViewNode = scrollRef.current?.getScrollableNode();
    if (scrollViewNode) {
      scrollViewNode.addEventListener('wheel', handleWheelScroll, { passive: false });
    }

    return () => {
      if (scrollViewNode) {
        scrollViewNode.removeEventListener('wheel', handleWheelScroll);
      }
    };
  }, [props.disableShiftScrolling]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      {...props}
    >
      {props.children}
    </ScrollView>
  );
};

export default WebScrollView;
