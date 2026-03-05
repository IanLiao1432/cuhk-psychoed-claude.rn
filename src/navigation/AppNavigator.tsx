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
import {ReadingMaterialItem} from '../types/ReadingMaterialItem';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  InfoList: undefined;
  ArticleDetail: {article: ReadingMaterialItem};
  ImageViewer: {images: {uri: string}[]; initialIndex?: number};
  CarouselViewer: {images: {uri: string; desc?: string}[]; initialIndex?: number};
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
