import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from "react-native-paper";
import { ProvidePattern } from './services/context/PatternState';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';

import HomeScreen from './components/HomeScreen';
import OptionsScreen from './components/OptionsScreen';
import { FormScreens } from './components/FormScreens';
import { FormScreenOne } from './components/FormScreens';
import { FormScreenTwo } from './components/FormScreens';
import { FormScreenThree } from './components/FormScreens';
import DrinkMaker from './components/DrinkMaker';
import VideoScreen from './components/VideoScreen';
import WaveProgress from './components/WaveProgress';
import CompleteScreen from './components/CompleteScreen';
import * as ScreenOrientation from 'expo-screen-orientation';
import SplitMachineScreen from './components/SplitMachineScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Overview from "./components/Overview";

const Stack = createNativeStackNavigator();

export default function App() {
  useKeepAwake();

  let fontSource = {
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    light: require('./assets/fonts/Poppins-Thin.ttf'),
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    walkerHeadline: require('./assets/fonts/JohnnieWalker-Headline.otf'),
    walkerBold: require('./assets/fonts/JohnnieWalkerSans-Bold.otf'),
    walkerRegular: require('./assets/fonts/JohnnieWalkerSerif-Book.otf')

  };
  const [loaded] = useFonts({
    "Poppins-Bold": fontSource.bold,
    "Poppins-Regular": fontSource.regular,
    "Poppins-Thin": fontSource.light,
    "Johnnie-Head": fontSource.walkerHeadline,
    "Johnnie-Bold": fontSource.walkerBold,
    "Johnnie-Regular": fontSource.walkerRegular,
  })
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }


  useEffect(() => {
    changeScreenOrientation();
 
  }, [])

  if (!loaded) {
    return <View></View>
  } else {
    return (
      <ProvidePattern>
        <StatusBar hidden={true} />
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Welcome", headerShown: false }}
              />
              <Stack.Screen
                name="Options"
                component={OptionsScreen}
                options={
                  { title: "Options", headerShown: false }
                }
              />
              <Stack.Screen
                name="FormScreens"
                component={FormScreens}
                options={
                  { title: "FormScreens", headerShown: false }
                }
              />
              <Stack.Screen
                name="FormScreenOne"
                component={FormScreenOne}
                options={
                  { title: "FormScreenOne", headerShown: false }
                }
              />

              <Stack.Screen
                name="FormScreenTwo"
                component={FormScreenTwo}
                options={
                  { title: "FormScreenTwo", headerShown: false }
                }
              />
              <Stack.Screen
                name="FormScreenThree"
                component={FormScreenThree}
                options={
                  { title: "FormScreenThree", headerShown: false }
                }
              />

              <Stack.Screen
                name="DrinkMaker"
                component={DrinkMaker}
                options={
                  { title: "DrinkMaker", headerShown: false }
                }
              />

              <Stack.Screen
                name="Video"
                component={VideoScreen}
                options={
                  { title: "Video", headerShown: false }
                }
              />

              <Stack.Screen
                name="Liquid"
                component={WaveProgress}
                options={
                  { title: "Liquid", headerShown: false }
                }
              />

              <Stack.Screen
                name="Complete"
                component={CompleteScreen}
                options={
                  { title: "Complete", headerShown: false }
                }
              />

              <Stack.Screen
                name="Splide"
                component={SplitMachineScreen}
                options={
                  { title: "Splide", headerShown: false }
                }
              />
              <Stack.Screen
                name="Overview"
                component={Overview}
                options={
                  { title: "Overview", headerShown: false }
                }
              />

            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ProvidePattern>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
