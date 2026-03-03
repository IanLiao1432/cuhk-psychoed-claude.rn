import React, {useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useWording} from '../context/WordingContext';
import WhatsAppIcon from './icons/WhatsAppIcon';
import BottomSheet from './BottomSheet';

interface ContactSheetProps {
  visible: boolean;
  onClose: () => void;
}

const ContactSheet: React.FC<ContactSheetProps> = ({visible, onClose}) => {
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

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={t('contactUsTitle', '聯絡我們')}>
      <Text style={styles.description}>
        {t(
          'contactUsDesc',
          '若有任何查詢或疑問，歡迎透過 WhatsApp 聯絡我們。我們很樂意為你服務！',
        )}
      </Text>

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

export default ContactSheet;
