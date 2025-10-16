import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import {
  Database,
  Key,
  Bell,
  Moon,
  HelpCircle,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react-native';
import { useTheme } from '@/utils/theme';
import FormInput from '@/components/FormInput';

export default function Settings() {
  const insets = useSafeAreaInsets();
  const { colors, statusBarStyle, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [firebaseEnabled, setFirebaseEnabled] = useState(false);
  const [firebaseProjectId, setFirebaseProjectId] = useState('');
  const [firebaseApiKey, setFirebaseApiKey] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);
  const [copied, setCopied] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleCopyProjectId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveFirebaseSettings = () => {
    if (firebaseEnabled && (!firebaseProjectId || !firebaseApiKey)) {
      Alert.alert('Validasi', 'Silakan isi semua field Firebase');
      return;
    }
    Alert.alert('Berhasil', 'Pengaturan Firebase telah disimpan');
  };

  const SettingSection = ({ title, children }) => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Roboto_700Bold',
          color: colors.text,
          marginBottom: 12,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );

  const SettingRow = ({ label, description, action }) => (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Roboto_600SemiBold',
            color: colors.text,
            marginBottom: 2,
          }}
        >
          {label}
        </Text>
        {description && (
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Roboto_400Regular',
              color: colors.textMuted,
            }}
          >
            {description}
          </Text>
        )}
      </View>
      {action}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={statusBarStyle} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 80,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: 'Roboto_700Bold',
              color: colors.text,
            }}
          >
            Pengaturan
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Roboto_400Regular',
              color: colors.textMuted,
              marginTop: 4,
            }}
          >
            Kelola preferensi dan konfigurasi aplikasi
          </Text>
        </View>

        {/* Database & Firebase Settings */}
        <SettingSection title="Konfigurasi Database">
          <SettingRow
            label="Koneksi Firebase"
            description="Aktifkan untuk sinkronisasi cloud"
            action={
              <Switch
                value={firebaseEnabled}
                onValueChange={setFirebaseEnabled}
                trackColor={{ false: colors.border, true: colors.primary + '80' }}
                thumbColor={firebaseEnabled ? colors.primary : colors.textMuted}
              />
            }
          />

          {firebaseEnabled && (
            <View style={{ backgroundColor: colors.elevated, borderRadius: 12, padding: 16, marginTop: 12 }}>
              <FormInput
                label="Project ID"
                value={firebaseProjectId}
                onChangeText={setFirebaseProjectId}
                placeholder="Masukkan Project ID"
                style={{ marginBottom: 12 }}
              />
              <FormInput
                label="API Key"
                value={firebaseApiKey}
                onChangeText={setFirebaseApiKey}
                placeholder="Masukkan API Key"
                style={{ marginBottom: 12 }}
              />
              <TouchableOpacity
                onPress={handleSaveFirebaseSettings}
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Roboto_700Bold',
                    color: colors.primaryText,
                  }}
                >
                  Simpan Pengaturan
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SettingSection>

        {/* Account Settings */}
        <SettingSection title="Akun">
          <SettingRow
            label="ID Agen"
            description="AGENT001"
            action={
              <TouchableOpacity onPress={handleCopyProjectId}>
                {copied ? (
                  <Check size={20} color={colors.success} strokeWidth={1.5} />
                ) : (
                  <Copy size={20} color={colors.textMuted} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            }
          />
          <SettingRow
            label="Nama Agen"
            description="BRILink Agent Jakarta"
            action={<ChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />}
          />
          <SettingRow
            label="Nomor Telepon"
            description="0812-3456-7890"
            action={<ChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />}
          />
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection title="Notifikasi">
          <SettingRow
            label="Notifikasi Transaksi"
            description="Terima notifikasi setiap transaksi"
            action={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary + '80' }}
                thumbColor={notificationsEnabled ? colors.primary : colors.textMuted}
              />
            }
          />
          <SettingRow
            label="Pemberitahuan Laporan"
            description="Notifikasi laporan mingguan & bulanan"
            action={
              <Switch
                value={true}
                onValueChange={() => Alert.alert('Info', 'Fitur akan segera tersedia')}
                trackColor={{ false: colors.border, true: colors.primary + '80' }}
                thumbColor={colors.primary}
              />
            }
          />
        </SettingSection>

        {/* App Settings */}
        <SettingSection title="Tampilan">
          <SettingRow
            label="Mode Gelap"
            description="Gunakan tema gelap untuk aplikasi"
            action={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.border, true: colors.primary + '80' }}
                thumbColor={darkMode ? colors.primary : colors.textMuted}
              />
            }
          />
          <SettingRow
            label="Versi Aplikasi"
            description="1.0.0"
            action={<Text style={{ fontSize: 12, color: colors.textMuted }}>Terbaru</Text>}
          />
        </SettingSection>

        {/* Support */}
        <SettingSection title="Dukungan">
          <SettingRow
            label="Pusat Bantuan"
            description="FAQ dan panduan penggunaan"
            action={<ChevronRight size={20} color={colors.primary} strokeWidth={1.5} />}
          />
          <SettingRow
            label="Hubungi Kami"
            description="Dukungan teknis & keluhan"
            action={<ChevronRight size={20} color={colors.primary} strokeWidth={1.5} />}
          />
          <SettingRow
            label="Kebijakan Privasi"
            description="Ketentuan penggunaan"
            action={<ChevronRight size={20} color={colors.primary} strokeWidth={1.5} />}
          />
        </SettingSection>

        {/* Danger Zone */}
        <View style={{ marginBottom: 24 }}>
          <TouchableOpacity
            onPress={() => Alert.alert('Konfirmasi', 'Hapus semua data lokal?', [
              { text: 'Batal', style: 'cancel' },
              { text: 'Hapus', style: 'destructive' },
            ])}
            style={{
              backgroundColor: colors.error + '15',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.error + '30',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto_700Bold',
                color: colors.error,
                textAlign: 'center',
              }}
            >
              Hapus Data Lokal
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
