import React, {useEffect, useRef, useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,

  Animated,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useWording} from '../context/WordingContext';
import Banner from '../components/Banner';
import MenuCard from '../components/MenuCard';
import ActionPill from '../components/ActionPill';
import SvgLogo from '../components/SvgLogo';
import ArticleIcon from '../components/icons/ArticleIcon';
import QuestIcon from '../components/icons/QuestIcon';
import ContactIcon from '../components/icons/ContactIcon';
import AboutIcon from '../components/icons/AboutIcon';
import AccountSheet from '../components/AccountSheet';
import ContactSheet from '../components/ContactSheet';
import AboutSheet from '../components/AboutSheet';
import PrivacySheet from '../components/PrivacySheet';
import DisclaimerSheet from '../components/DisclaimerSheet';
import logoCuhkSvg from '../assets/svg/logo_cuhk';
import logoMediSvg from '../assets/svg/logo_medi';
import logoSchoolSvg from '../assets/svg/logo_school';

const HomeScreen: React.FC = () => {
  const {t} = useWording();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showAccountSheet, setShowAccountSheet] = useState(false);
  const [showContactSheet, setShowContactSheet] = useState(false);
  const [showAboutSheet, setShowAboutSheet] = useState(false);
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);
  const [showDisclaimerSheet, setShowDisclaimerSheet] = useState(false);

  // Animations
  const bannerOpacity = useRef(new Animated.Value(0)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const cardsTranslateY = useRef(new Animated.Value(30)).current;
  const pillsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(bannerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(cardsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cardsTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(pillsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bannerOpacity, cardsOpacity, cardsTranslateY, pillsOpacity]);

  const handleAccountPress = useCallback(() => {
    setShowAccountSheet(true);
  }, []);

  const handleContactPress = useCallback(() => {
    setShowContactSheet(true);
  }, []);

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Animated.View style={{opacity: bannerOpacity}}>
          <Banner />
        </Animated.View>

        {/* Menu Cards */}
        <Animated.View
          style={[
            styles.cardsSection,
            {
              opacity: cardsOpacity,
              transform: [{translateY: cardsTranslateY}],
            },
          ]}>
          <MenuCard
            icon={<ArticleIcon size={60} />}
            title={t('homeMenuInfo', '實用資訊')}
            onPress={() => navigation.navigate('InfoList')}
          />
          <MenuCard
            icon={<QuestIcon size={60} />}
            title={t('homeMenuExercise', '價值觀探索練習')}
            onPress={() => navigation.navigate('ExerciseIntro')}
          />
        </Animated.View>

        {/* Action Pills */}
        <Animated.View style={[styles.pillsRow, {opacity: pillsOpacity}]}>
          <ActionPill
            icon={
              <Image
                source={require('../assets/images/ic_profile.png')}
                style={styles.pillIcon}
                resizeMode="contain"
              />
            }
            label={t('homeAccount', '帳戶')}
            onPress={handleAccountPress}
          />
          <ActionPill
            icon={<ContactIcon size={16} color="#9E619B" />}
            label={t('homeContact', '聯絡')}
            onPress={handleContactPress}
          />
          <ActionPill
            icon={<AboutIcon size={16} color="#9E619B" />}
            label={t('homeAbout', '關於')}
            onPress={() => setShowAboutSheet(true)}
          />
        </Animated.View>

        {/* University Logos */}
        <View style={styles.logosRow}>
          <SvgLogo xml={logoCuhkSvg} width={59} height={48} />
          <SvgLogo xml={logoMediSvg} width={49} height={48} />
          <SvgLogo xml={logoSchoolSvg} width={47} height={48} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.copyright}>
            版權所有@2026香港中文大學那打素護理學院
          </Text>
          <View style={styles.footerLinks}>
            <Text
              style={styles.footerLink}
              onPress={() => setShowPrivacySheet(true)}>
              個人資料聲明
            </Text>
            <Text
              style={styles.footerLink}
              onPress={() => setShowDisclaimerSheet(true)}>
              免責聲明
            </Text>
          </View>
        </View>
      </ScrollView>

      <AccountSheet
        visible={showAccountSheet}
        onClose={() => setShowAccountSheet(false)}
      />
      <ContactSheet
        visible={showContactSheet}
        onClose={() => setShowContactSheet(false)}
      />
      <AboutSheet
        visible={showAboutSheet}
        onClose={() => setShowAboutSheet(false)}
      />
      <PrivacySheet
        visible={showPrivacySheet}
        onClose={() => setShowPrivacySheet(false)}
      />
      <DisclaimerSheet
        visible={showDisclaimerSheet}
        onClose={() => setShowDisclaimerSheet(false)}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Menu Cards
  cardsSection: {
    paddingHorizontal: 20,
    gap: 16,
  },

  // Action Pills
  pillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 32,
    gap: 16,
  },
  pillIcon: {
    width: 16,
    height: 16,
    tintColor: '#9E619B',
  },

  // Logos
  logosRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 64,
    paddingTop: 32,
  },
  // Footer
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  copyright: {
    fontWeight: '500',
    fontSize: 12,
    color: '#9E619B',
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 32,
  },
  footerLink: {
    fontWeight: '500',
    fontSize: 12,
    color: '#9E619B',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
