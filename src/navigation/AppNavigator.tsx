import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import {useAuth} from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import InfoListScreen from '../screens/InfoListScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  InfoList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const {state} = useAuth();

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
