import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import Orientation from 'react-native-orientation-locker';
import {useAuth} from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import InfoListScreen from '../screens/InfoListScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import ImageViewerScreen from '../screens/ImageViewerScreen';
import CarouselViewerScreen from '../screens/CarouselViewerScreen';
import ExerciseIntroScreen from '../screens/ExerciseIntroScreen';
import ExerciseQuestionScreen from '../screens/ExerciseQuestionScreen';
import ExerciseLoadingScreen from '../screens/ExerciseLoadingScreen';
import ExerciseResultScreen from '../screens/ExerciseResultScreen';
import {ReadingMaterialItem} from '../types/ReadingMaterialItem';
import {SurgicalPreference} from '../services/questionnaireService';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  InfoList: undefined;
  ArticleDetail: {article: ReadingMaterialItem};
  ImageViewer: {images: {uri: string}[]; initialIndex?: number};
  CarouselViewer: {images: {uri: string; desc?: string}[]; initialIndex?: number};
  ExerciseIntro: undefined;
  ExerciseQuestion: undefined;
  ExerciseLoading: { answers: number[] };
  ExerciseResult: { surgicalPreference: SurgicalPreference };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const {state} = useAuth();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  if (state.isLoading) {
    return null;
  }

  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {state.isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="InfoList"
              component={InfoListScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="ArticleDetail"
              component={ArticleDetailScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="ImageViewer"
              component={ImageViewerScreen}
              options={{
                presentation: 'fullScreenModal',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="CarouselViewer"
              component={CarouselViewerScreen}
              options={{
                presentation: 'fullScreenModal',
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="ExerciseIntro"
              component={ExerciseIntroScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="ExerciseQuestion"
              component={ExerciseQuestionScreen}
              options={{
                animation: 'slide_from_right',
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="ExerciseLoading"
              component={ExerciseLoadingScreen}
              options={{
                animation: 'fade',
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="ExerciseResult"
              component={ExerciseResultScreen}
              options={{
                animation: 'fade',
                gestureEnabled: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              animationTypeForReplace: 'pop',
              animation: 'fade',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
