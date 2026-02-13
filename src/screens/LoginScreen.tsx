import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../context/AuthContext';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const {signIn, state} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  // Animations
  const bannerOpacity = useRef(new Animated.Value(0)).current;
  const bannerTranslateY = useRef(new Animated.Value(-30)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(40)).current;
  const forgotOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(bannerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bannerTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cardTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(forgotOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bannerOpacity, bannerTranslateY, cardOpacity, cardTranslateY, forgotOpacity]);

  const isFormValid = username.trim().length > 0 && password.trim().length > 0;

  const handleLogin = async () => {
    if (!isFormValid || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      await signIn({username: username.trim(), password});
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? '登入名稱或密碼不正確'
          : '登入失敗，請稍後再試';
      Alert.alert('登入失敗', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('忘記登入名稱或密碼？', '請聯繫管理員重置您的帳戶。');
  };

  if (state.isLoading && !isSubmitting) {
    return (
      <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.loading}>
        <ActivityIndicator size="large" color="#6E1E6F" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        enableOnAndroid={true}
        extraScrollHeight={20}>
          {/* Banner Section */}
          <Animated.View
            style={[
              styles.banner,
              {
                opacity: bannerOpacity,
                transform: [{translateY: bannerTranslateY}],
              },
            ]}>
            <Image
              source={require('../assets/images/banner_bg.png')}
              style={styles.bannerBg}
              resizeMode="cover"
            />
            <Image
              source={require('../assets/images/dancer.png')}
              style={styles.dancer}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/images/ribbon.png')}
              style={styles.ribbon}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <LinearGradient
                colors={[
                  'rgba(192, 220, 255, 0.5)',
                  'rgba(242, 175, 255, 0.5)',
                  'rgba(255, 171, 168, 0.5)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.titleBadge}>
                <Text style={styles.titleText}>
                  粉紅絲帶臨床決策輔助工具(香港版)
                </Text>
              </LinearGradient>
              <LinearGradient
                colors={[
                  'rgba(192, 220, 255, 0.5)',
                  'rgba(242, 175, 255, 0.5)',
                  'rgba(255, 171, 168, 0.5)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.titleBadge}>
                <Text style={styles.subtitleText}>BCT Aid HK</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Login Form Card */}
          <Animated.View
            style={[
              styles.formWrapper,
              {
                opacity: cardOpacity,
                transform: [{translateY: cardTranslateY}],
              },
            ]}>
            <View style={styles.card}>
              <View style={styles.inputContainer}>
                {/* Username Field */}
                <View style={[styles.inputField, styles.inputFieldBorder]}>
                  <Image
                    source={require('../assets/images/ic_profile.png')}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.inputTextContainer}>
                    <Text style={styles.inputLabel}>登入名稱</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="輸入登入名稱"
                      placeholderTextColor="#9E619B"
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View style={styles.inputField}>
                  <Image
                    source={require('../assets/images/ic_lock.png')}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.inputTextContainer}>
                    <Text style={styles.inputLabel}>密碼</Text>
                    <TextInput
                      ref={passwordRef}
                      style={styles.textInput}
                      placeholder="輸入密碼"
                      placeholderTextColor="#9E619B"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      returnKeyType="done"
                      onSubmitEditing={handleLogin}
                    />
                  </View>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  !isFormValid && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={!isFormValid || isSubmitting}
                activeOpacity={0.7}>
                {isSubmitting ? (
                  <ActivityIndicator color="#6E1E6F" />
                ) : (
                  <Text
                    style={[
                      styles.loginButtonText,
                      !isFormValid && styles.loginButtonTextDisabled,
                    ]}>
                    登入
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Forgot Password */}
          <Animated.View style={{opacity: forgotOpacity}}>
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
              activeOpacity={0.7}>
              <Image
                source={require('../assets/images/ic_question.png')}
                style={styles.questionIcon}
                resizeMode="contain"
              />
              <Text style={styles.forgotPasswordText}>忘記登入名稱或密碼?</Text>
            </TouchableOpacity>
          </Animated.View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Banner
  banner: {
    width: SCREEN_WIDTH,
    height: 360,
    overflow: 'hidden',
  },
  bannerBg: {
    position: 'absolute',
    width: SCREEN_WIDTH * 1.8,
    height: 360,
    left: -SCREEN_WIDTH * 0.4,
    top: 0,
  },
  dancer: {
    position: 'absolute',
    width: 200,
    height: 260,
    right: -10,
    top: 20,
  },
  ribbon: {
    position: 'absolute',
    width: 350,
    height: 320,
    left: 60,
    top: -80,
    transform: [{rotate: '45deg'}],
    opacity: 0.6,
  },
  logo: {
    position: 'absolute',
    left: 24,
    top: 93,
    width: 190,
    height: 117,
  },
  titleContainer: {
    position: 'absolute',
    left: 24,
    bottom: 38,
    gap: 2,
  },
  titleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 41,
    alignSelf: 'flex-start',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 22,
    color: '#6E1E6F',
  },
  subtitleText: {
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 22,
    color: '#6E1E6F',
  },

  // Form
  formWrapper: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#FFCECE',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 64,
    gap: 10,
  },
  inputFieldBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 231, 231, 0.75)',
  },
  inputIcon: {
    width: 24,
    height: 24,
    tintColor: '#6E1E6F',
  },
  inputTextContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 11,
    color: '#6E1E6F',
  },
  textInput: {
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
    padding: 0,
    height: 24,
  },

  // Button
  loginButton: {
    backgroundColor: 'rgba(255, 214, 212, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 33,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: 'rgba(255, 214, 212, 0.5)',
  },
  loginButtonText: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  loginButtonTextDisabled: {
    opacity: 0.25,
  },

  // Forgot Password
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 32,
    paddingBottom: 40,
  },
  questionIcon: {
    width: 12,
    height: 12,
    tintColor: '#9E619B',
  },
  forgotPasswordText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#9E619B',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
