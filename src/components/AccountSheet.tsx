import React, {useRef, useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Alert,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthContext';
import {useWording} from '../context/WordingContext';
import CloseIcon from './icons/CloseIcon';
import CalendarIcon from './icons/CalendarIcon';

const ChevronRight: React.FC<{size?: number; color?: string}> = ({
  size = 12,
  color = '#6E1E6F',
}) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <Path
      d="M4.5 2L8.5 6L4.5 10"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface AccountSheetProps {
  visible: boolean;
  onClose: () => void;
}

const AccountSheet: React.FC<AccountSheetProps> = ({visible, onClose}) => {
  const {state, signOut, updateTreatmentDate} = useAuth();
  const {t} = useWording();
  const insets = useSafeAreaInsets();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(500)).current;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  useEffect(() => {
    if (visible) {
      setShowDatePicker(false);
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
        toValue: 500,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [overlayOpacity, slideAnim, onClose]);

  const handleDateRowPress = useCallback(() => {
    if (showDatePicker) {
      return;
    }
    const existing = state.user?.treatmentDate;
    setTempDate(existing ? new Date(existing) : new Date());
    setShowDatePicker(true);
  }, [showDatePicker, state.user?.treatmentDate]);

  const handleDateChange = useCallback(
    (_event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    },
    [],
  );

  const handleDateCancel = useCallback(() => {
    setShowDatePicker(false);
  }, []);

  const handleDateConfirm = useCallback(async () => {
    try {
      const isoDate = tempDate.toISOString().split('T')[0];
      await updateTreatmentDate(isoDate);
      setShowDatePicker(false);
    } catch {
      Alert.alert('錯誤', '更新日期失敗，請稍後再試');
    }
  }, [tempDate, updateTreatmentDate]);

  const handleLogout = useCallback(() => {
    Alert.alert(t('logout', '登出'), t('confirmLogout', '確定要登出嗎？'), [
      {text: t('cancel', '取消'), style: 'cancel'},
      {
        text: t('confirm', '確定'),
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            handleClose();
          } catch {
            Alert.alert('錯誤', '登出失敗，請稍後再試');
          }
        },
      },
    ]);
  }, [signOut, t, handleClose]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) {
      return null;
    }
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const treatmentDateDisplay = formatDate(state.user?.treatmentDate);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        {/* Dark overlay */}
        <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        {/* Bottom sheet */}
        <Animated.View
          style={[
            styles.sheetWrapper,
            {transform: [{translateY: slideAnim}]},
          ]}>
          {/* Gradient content area */}
          <LinearGradient
            colors={['#FFF4F4', '#FFFFFF']}
            style={styles.sheetGradient}>
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
                colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
                style={styles.titleBar}
              />
              <Text style={styles.title}>
                {t('accountTitle', '您的帳戶')}
              </Text>
            </View>

            {/* Profile card */}
            <View style={styles.profileCard}>
              {/* Ribbon decoration */}
              <Image
                source={require('../assets/images/ribbon.png')}
                style={styles.ribbonImage}
                resizeMode="cover"
              />
              {/* Gradient overlay */}
              <LinearGradient
                colors={[
                  'rgba(192,220,255,0.5)',
                  'rgba(242,175,255,0.5)',
                  'rgba(255,171,168,0.5)',
                ]}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={StyleSheet.absoluteFill}
              />
              {/* Inner border */}
              <View style={styles.profileCardInnerBorder} />

              {/* Username row */}
              <View style={styles.usernameRow}>
                <Image
                  source={require('../assets/images/ic_profile.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
                <Text style={styles.usernameText}>
                  {state.user?.username ?? ''}
                </Text>
              </View>

              {/* Date row */}
              <View style={styles.divider}>
                <TouchableOpacity
                  style={styles.dateRow}
                  onPress={handleDateRowPress}
                  activeOpacity={0.7}>
                  <View style={styles.dateRowLeft}>
                    <CalendarIcon size={24} color="#6E1E6F" />
                    <Text style={styles.dateLabel}>
                      {t('surgeryDate', '手術日期')}
                    </Text>
                  </View>
                  <View style={styles.dateRowRight}>
                    <Text
                      style={[
                        styles.dateValue,
                        !treatmentDateDisplay && styles.dateValuePlaceholder,
                      ]}>
                      {treatmentDateDisplay ??
                        t('selectDate', '選擇日期')}
                    </Text>
                    <ChevronRight size={12} color="#6E1E6F" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Date picker */}
            {showDatePicker && (
              <View style={styles.datePickerSection}>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
                  locale="zh-Hant"
                  onChange={handleDateChange}
                  style={styles.datePicker}
                />
                <View style={styles.datePickerButtons}>
                  <TouchableOpacity
                    style={styles.datePickerButtonWrapper}
                    onPress={handleDateCancel}
                    activeOpacity={0.8}>
                    <LinearGradient
                      colors={['#FEEAEE', '#FFA7B3']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.pillButton}>
                      <Text style={styles.pillButtonText}>
                        {t('cancel', '取消')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.datePickerButtonWrapper}
                    onPress={handleDateConfirm}
                    activeOpacity={0.8}>
                    <LinearGradient
                      colors={['#FEEAEE', '#FFA7B3']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.pillButton}>
                      <Text style={styles.pillButtonText}>
                        {t('confirm', '確定')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Logout button */}
            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={handleLogout} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#FEEAEE', '#FFA7B3']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.logoutButton}>
                  <Text style={styles.logoutText}>
                    {t('logout', '登出')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* White safe area fill below content */}
          <View
            style={[
              styles.bottomSafeArea,
              {height: Math.max(insets.bottom, 20)},
            ]}
          />
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
  sheetWrapper: {},
  sheetGradient: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  bottomSafeArea: {
    backgroundColor: '#FFFFFF',
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
    marginTop: 56,
    marginBottom: 24,
  },
  titleBar: {
    width: 8,
    height: 32,
    borderRadius: 13,
  },
  title: {
    fontWeight: '700',
    fontSize: 23,
    color: '#6E1E6F',
    flex: 1,
  },
  profileCard: {
    borderRadius: 24,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 24,
    shadowColor: '#FFCECE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
    minHeight: 192,
    overflow: 'hidden',
  },
  ribbonImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  profileCardInnerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    height: 80,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  usernameText: {
    fontWeight: '700',
    fontSize: 23,
    color: '#6E1E6F',
    flex: 1,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.25)',
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateLabel: {
    fontSize: 19,
    color: '#6E1E6F',
  },
  dateValue: {
    fontWeight: '700',
    fontSize: 19,
    color: '#6E1E6F',
  },
  dateValuePlaceholder: {
    fontWeight: '700',
    color: '#6E1E6F',
  },
  datePickerSection: {
    marginTop: 16,
  },
  datePicker: {
    height: 180,
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
  },
  datePickerButtonWrapper: {
    flex: 1,
  },
  pillButton: {
    height: 44,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillButtonText: {
    fontWeight: '700',
    fontSize: 17,
    color: '#6E1E6F',
  },
  logoutContainer: {
    alignItems: 'flex-start',
    marginTop: 32,
  },
  logoutButton: {
    width: 143,
    height: 44,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontWeight: '700',
    fontSize: 17,
    color: '#6E1E6F',
  },
});

export default AccountSheet;
