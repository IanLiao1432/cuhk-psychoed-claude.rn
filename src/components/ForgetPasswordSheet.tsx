import React, {useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useWording} from '../context/WordingContext';
import WhatsAppIcon from './icons/WhatsAppIcon';
import BottomSheet from './BottomSheet';

interface ForgetPasswordSheetProps {
  visible: boolean;
  onClose: () => void;
}

const ForgetPasswordSheet: React.FC<ForgetPasswordSheetProps> = ({
  visible,
  onClose,
}) => {
  const {t} = useWording();

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
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={t('forgetLoginInfoTitle', '找回登入名稱或密碼')}>
      {/* Description */}
      {renderDescription()}

      {/* WhatsApp button */}
      <TouchableOpacity onPress={handleWhatsApp} activeOpacity={0.8}>
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
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
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
