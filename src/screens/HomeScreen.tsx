import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
  Linking,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../context/AuthContext';
import {useWording} from '../context/WordingContext';
import Banner from '../components/Banner';
import MenuCard from '../components/MenuCard';
import ActionPill from '../components/ActionPill';
import SvgLogo from '../components/SvgLogo';
import ArticleIcon from '../components/icons/ArticleIcon';
import QuestIcon from '../components/icons/QuestIcon';
import ContactIcon from '../components/icons/ContactIcon';
import AboutIcon from '../components/icons/AboutIcon';
import logoCuhkSvg from '../assets/svg/logo_cuhk';
import logoMediSvg from '../assets/svg/logo_medi';
import logoSchoolSvg from '../assets/svg/logo_school';

const HomeScreen: React.FC = () => {
  const {signOut} = useAuth();
  const {t} = useWording();

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

  const handleLogout = useCallback(() => {
    Alert.alert(t('logout', '登出'), t('confirmLogout', '確定要登出嗎？'), [
      {text: t('cancel', '取消'), style: 'cancel'},
      {
        text: t('confirm', '確定'),
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
  }, [signOut, t]);

  const handleContact = useCallback(() => {
    const phone = t('whatsappNumber', '85267386349');
    const message = encodeURIComponent(
      t(
        'whatsappMessage',
        '你好。我有一些有關使用應用程式時遇到的問題想查詢：',
      ),
    );
    Linking.openURL(`https://wa.me/${phone}?text=${message}`);
  }, [t]);

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
            onPress={() => Alert.alert('Coming Soon')}
          />
          <MenuCard
            icon={<QuestIcon size={60} />}
            title={t('homeMenuExercise', '價值觀探索練習')}
            onPress={() => Alert.alert('Coming Soon')}
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
            onPress={handleLogout}
          />
          <ActionPill
            icon={<ContactIcon size={16} color="#9E619B" />}
            label={t('homeContact', '聯絡')}
            onPress={handleContact}
          />
          <ActionPill
            icon={<AboutIcon size={16} color="#9E619B" />}
            label={t('homeAbout', '關於')}
            onPress={() => Alert.alert('Coming Soon')}
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
              onPress={() => Alert.alert('Coming Soon')}>
              個人資料聲明
            </Text>
            <Text
              style={styles.footerLink}
              onPress={() => Alert.alert('Coming Soon')}>
              免責聲明
            </Text>
          </View>
        </View>
      </ScrollView>
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
