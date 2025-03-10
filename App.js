import React from "react";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TopBar } from './components/TopBar.js';
import { BottomBar } from './components/BottomBar.js';
import { Centerbar } from './components/CenterBar.js';
import AlbumView from './AlbumView.js';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <TopBar />
        <Stack.Navigator
          screenOptions={{
            headerShown: false, 
            cardStyle: { backgroundColor: '#08090A' }
          }}
        >
          <Stack.Screen name="Home">
            {() => (
              <>
                <Centerbar />
                <BottomBar />
              </>
            )}
          </Stack.Screen>
          <Stack.Screen name="AlbumView" component={AlbumView} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090A',
  },
});