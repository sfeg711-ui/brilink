import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/utils/theme';
import FormInput from '@/components/FormInput';
import PrimaryButton from '@/components/PrimaryButton';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';

export default function Transfer() {
  const insets = useSafeAreaInsets();
  const { colors, statusBarStyle } = useTheme();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [step, setStep] = useState('form'); // form, confirm, success
  const [recipientName, setRecipientName] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  if (!fontsLoaded) {
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!recipientName) newErrors.recipientName = 'Nama penerima wajib diisi';
    if (!recipientAccount) newErrors.recipientAccount = 'Nomor rekening wajib diisi';
    if (!amount) {
      newErrors.amount = 'Jumlah wajib diisi';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Jumlah harus angka positif';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep('confirm');
    }
  };

  const handleConfirm = async () => {
    try {
      // Create transaction
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: 1,
          type: 'transfer',
          description: `Transfer ke ${recipientName} - ${description}`,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) throw new Error('Gagal membuat transaksi');

      setStep('success');
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat memproses transfer');
    }
  };

  const handleDone = () => {
    router.back();
  };

  // Form Step
  if (step === 'form') {
    return (
      <KeyboardAvoidingAnimatedView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style={statusBarStyle} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ marginBottom: 24 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.card,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <ArrowLeft size={20} color={colors.text} strokeWidth={1.5} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 28,
                fontFamily: 'Roboto_700Bold',
                color: colors.text,
              }}
            >
              Transfer Uang
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto_400Regular',
                color: colors.textMuted,
                marginTop: 4,
              }}
            >
              Isi detail penerima dan jumlah transfer
            </Text>
          </View>

          {/* Form Fields */}
          <FormInput
            label="Nama Penerima"
            value={recipientName}
            onChangeText={setRecipientName}
            placeholder="Contoh: Bambang Suryanto"
            autoCapitalize="words"
            error={errors.recipientName}
          />

          <FormInput
            label="Nomor Rekening"
            value={recipientAccount}
            onChangeText={setRecipientAccount}
            placeholder="Contoh: 1234567890"
            keyboardType="numeric"
            error={errors.recipientAccount}
          />

          <FormInput
            label="Jumlah Transfer (Rp)"
            value={amount}
            onChangeText={setAmount}
            placeholder="Contoh: 500000"
            keyboardType="numeric"
            error={errors.amount}
          />

          <FormInput
            label="Keterangan (Opsional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Tujuan transfer"
            multiline
          />

          {/* Continue Button */}
          <View style={{ marginTop: 32 }}>
            <PrimaryButton
              title="Lanjutkan"
              onPress={handleNext}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingAnimatedView>
    );
  }

  // Confirmation Step
  if (step === 'confirm') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar style={statusBarStyle} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ marginBottom: 24 }}>
            <TouchableOpacity
              onPress={() => setStep('form')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.card,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <ArrowLeft size={20} color={colors.text} strokeWidth={1.5} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 28,
                fontFamily: 'Roboto_700Bold',
                color: colors.text,
              }}
            >
              Konfirmasi Transfer
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto_400Regular',
                color: colors.textMuted,
                marginTop: 4,
              }}
            >
              Pastikan detail transfer sudah benar
            </Text>
          </View>

          {/* Transfer Details */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto_400Regular',
                  color: colors.textMuted,
                  marginBottom: 4,
                }}
              >
                Nama Penerima
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Roboto_700Bold',
                  color: colors.text,
                }}
              >
                {recipientName}
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: colors.divider,
                marginBottom: 20,
              }}
            />

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto_400Regular',
                  color: colors.textMuted,
                  marginBottom: 4,
                }}
              >
                Nomor Rekening
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Roboto_700Bold',
                  color: colors.text,
                }}
              >
                {recipientAccount}
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: colors.divider,
                marginBottom: 20,
              }}
            />

            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto_400Regular',
                  color: colors.textMuted,
                  marginBottom: 4,
                }}
              >
                Jumlah Transfer
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: 'Roboto_700Bold',
                  color: colors.primary,
                }}
              >
                Rp {parseFloat(amount).toLocaleString('id-ID')}
              </Text>
            </View>

            {description && (
              <>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.divider,
                    marginBottom: 20,
                  }}
                />

                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Roboto_400Regular',
                      color: colors.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    Keterangan
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Roboto_400Regular',
                      color: colors.text,
                    }}
                  >
                    {description}
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Warning */}
          <View
            style={{
              backgroundColor: 'rgba(255, 152, 0, 0.1)',
              borderRadius: 12,
              padding: 12,
              marginBottom: 24,
              borderLeftWidth: 4,
              borderLeftColor: colors.warning,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Roboto_400Regular',
                color: colors.warning,
              }}
            >
              Pastikan semua data sudah benar sebelum mengkonfirmasi
            </Text>
          </View>

          {/* Buttons */}
          <View style={{ gap: 12 }}>
            <PrimaryButton
              title="Konfirmasi Transfer"
              onPress={handleConfirm}
            />
            <PrimaryButton
              title="Kembali Edit"
              variant="secondary"
              onPress={() => setStep('form')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  // Success Step
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={statusBarStyle} />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Success Icon */}
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 50,
              color: colors.success,
            }}
          >
            ✓
          </Text>
        </View>

        {/* Success Message */}
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Roboto_700Bold',
            color: colors.text,
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          Transfer Berhasil
        </Text>

        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Roboto_400Regular',
            color: colors.textMuted,
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 22,
          }}
        >
          Uang sejumlah Rp {parseFloat(amount).toLocaleString('id-ID')} berhasil ditransfer ke {recipientName}
        </Text>

        {/* Details */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 16,
            width: '100%',
            marginBottom: 32,
            gap: 12,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 12, color: colors.textMuted }}>Penerima</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.text }}>
              {recipientName}
            </Text>
          </View>
          <View style={{ height: 1, backgroundColor: colors.divider }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 12, color: colors.textMuted }}>Jumlah</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.success }}>
              Rp {parseFloat(amount).toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={{ height: 1, backgroundColor: colors.divider }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 12, color: colors.textMuted }}>Waktu</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.text }}>
              {new Date().toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Done Button */}
        <PrimaryButton
          title="Selesai"
          onPress={handleDone}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
}
