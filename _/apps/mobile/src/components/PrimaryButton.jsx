import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/utils/theme';

export default function PrimaryButton({ 
  title, 
  icon: Icon, 
  onPress, 
  variant = 'primary',
  style,
  disabled = false
}) {
  const { colors } = useTheme();

  const bgColor = variant === 'secondary' ? colors.secondary : colors.primary;
  const textColor = variant === 'secondary' ? colors.secondaryText : colors.primaryText;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: bgColor,
          paddingHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      {Icon && <Icon size={18} color={textColor} strokeWidth={1.5} />}
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Roboto_700Bold',
          color: textColor,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
