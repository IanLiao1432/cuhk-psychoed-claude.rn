import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Pressable,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CloseIcon from './icons/CloseIcon';

interface BottomSheetTitleProps {
  title: string;
}

export const BottomSheetTitle: React.FC<BottomSheetTitleProps> = ({
  title,
}) => (
  <View style={styles.titleRow}>
    <View style={styles.titleBarWrap}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
        style={StyleSheet.absoluteFill}
      />
    </View>
    <Text style={styles.title}>{title}</Text>
  </View>
);

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(500)).current;

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
        toValue: 500,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [overlayOpacity, slideAnim, onClose]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        {/* Dark overlay */}
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        {/* Bottom sheet */}
        <Animated.View
          style={[
            styles.sheetWrapper,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <LinearGradient
            colors={['#FFF4F4', '#FFFFFF']}
            style={styles.sheetGradient}
          >
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <CloseIcon size={14} color="#333333" />
            </TouchableOpacity>

            <View
              style={styles.content}
            >
              {title && <BottomSheetTitle title={title} />}

              {children}
            </View>
          </LinearGradient>

          {/* White safe area fill below content */}
          <View
            style={[
              styles.bottomSafeArea,
              { height: Math.max(insets.bottom, 20) },
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
  titleBarWrap: {
    width: 8,
    alignSelf: 'stretch',
    borderRadius: 13,
    overflow: 'hidden',
  },
  title: {
    fontWeight: '700',
    fontSize: 23,
    color: '#6E1E6F',
    flex: 1,
  },
  bottomSafeArea: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 56,
  },
});

export default BottomSheet;
