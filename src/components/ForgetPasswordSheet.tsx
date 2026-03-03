import React, {useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Linking,
  Keyboard,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWording} from '../context/WordingContext';
import CloseIcon from './icons/CloseIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface ForgetPasswordSheetProps {
  visible: boolean;
  onClose: () => void;
}

const ForgetPasswordSheet: React.FC<ForgetPasswordSheetProps> = ({
  visible,
  onClose,
}) => {
  const {t} = useWording();
  const insets = useSafeAreaInsets();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, overlayOpacity, slideAnim]);

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [overlayOpacity, slideAnim, onClose]);

  const handleWhatsApp = useCallback(() => {
    const phone = t('whatsappNumber', '85267386349');
    const message = encodeURIComponent(
      t(
        'whatsappMessage',
        '你好。我有一些有關使用應用程式時遇到的問題想查詢：',
      ),
    );
    Linking.openURL(`https://wa.me/${phone}?text=${message}`);
  }, [t]);

  const descriptionText = t(
    'forgetLoginInfoDesc',
    '不用擔心！請透過以下WhatsApp聯絡我們或電郵至bctaid@cuhk.edu.hk，我們將會儘快為你處理。',
  );

  const emailMatch = descriptionText.match(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
  );

  const renderDescription = () => {
    if (!emailMatch) {
      return <Text style={styles.description}>{descriptionText}</Text>;
    }
    const email = emailMatch[0];
    const idx = descriptionText.indexOf(email);
    const before = descriptionText.slice(0, idx);
    const after = descriptionText.slice(idx + email.length);
    return (
      <Text style={styles.description}>
        {before}
        <Text style={styles.descriptionBold}>{email}</Text>
        {after}
      </Text>
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        {/* Dark overlay */}
        <Animated.View
          style={[styles.overlay, {opacity: overlayOpacity}]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        {/* Bottom sheet */}
        <Animated.View
          style={[
            styles.sheetWrapper,
            {transform: [{translateY: slideAnim}]},
          ]}>
          <LinearGradient
            colors={['#FFF4F4', '#FFFFFF']}
            style={[styles.sheet, {paddingBottom: Math.max(insets.bottom, 20)}]}>
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <CloseIcon size={14} color="#333333" />
            </TouchableOpacity>

            {/* Title row */}
            <View style={styles.titleRow}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
                style={styles.titleBar}
              />
              <Text style={styles.title}>
                {t('forgetLoginInfoTitle', '找回登入名稱或密碼')}
              </Text>
            </View>

            {/* Description */}
            {renderDescription()}

            {/* WhatsApp button */}
            <TouchableOpacity
              onPress={handleWhatsApp}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#25D366', '#00BE47']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.whatsappButton}>
                <WhatsAppIcon size={24} color="#FFFFFF" />
                <Text style={styles.whatsappText}>
                  {t('whatsAppContactUs', 'WhatsApp 聯絡我們')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheetWrapper: {
    // Ensures the sheet sits at the bottom
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  titleBar: {
    width: 8,
    borderRadius: 13,
    alignSelf: 'stretch',
  },
  title: {
    fontWeight: '700',
    fontSize: 23,
    color: '#333333',
    flex: 1,
    textAlign: 'left',
  },
  description: {
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
    marginBottom: 32,
  },
  descriptionBold: {
    fontWeight: '700',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 33,
    gap: 8,
  },
  whatsappText: {
    fontWeight: '700',
    fontSize: 17,
    color: '#FFFFFF',
  },
});

export default ForgetPasswordSheet;
