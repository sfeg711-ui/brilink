import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '@/utils/theme';

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  multiline = false,
  error,
}) {
  const { colors } = useTheme();

  return (
    <View style={[{ marginBottom: 20 }, style]}>
      {label && (
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Roboto_600SemiBold',
            color: colors.text,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      
      <TextInput
        style={{
          backgroundColor: colors.elevated,
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          fontFamily: 'Roboto_400Regular',
          color: colors.text,
          borderWidth: error ? 1 : 0,
          borderColor: error ? colors.error : colors.border,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textDisabled}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
      />
      
      {error && (
        <Text
          style={{
            fontSize: 12,
            color: colors.error,
            marginTop: 4,
            fontFamily: 'Roboto_400Regular',
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
