import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const {signOut, state} = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const handleLogout = () => {
    Alert.alert('登出', '確定要登出嗎？', [
      {text: '取消', style: 'cancel'},
      {
        text: '確定',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch {
            Alert.alert('錯誤', '登出失敗，請稍後再試');
          }
        },
      },
    ]);
  };

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}>
        <Text style={styles.welcome}>歡迎回來</Text>
        {state.user && (
          <Text style={styles.username}>{state.user.username}</Text>
        )}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}>
          {state.isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.logoutButtonText}>登出</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcome: {
    fontWeight: '700',
    fontSize: 28,
    color: '#6E1E6F',
    marginBottom: 8,
  },
  username: {
    fontSize: 17,
    color: '#9E619B',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#6E1E6F',
    borderRadius: 33,
    height: 44,
    paddingHorizontal: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontWeight: '700',
    fontSize: 17,
    color: '#FFFFFF',
  },
});

export default HomeScreen;
