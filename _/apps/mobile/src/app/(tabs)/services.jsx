import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import {
  Send,
  Banknote,
  Smartphone,
  FileText,
  CreditCard,
  MapPin,
} from 'lucide-react-native';
import { useTheme } from '@/utils/theme';

const SERVICES = [
  {
    id: 'transfer',
    name: 'Transfer',
    description: 'Kirim uang ke rekening lain',
    icon: Send,
    color: '#2196F3',
    route: '/transfer',
  },
  {
    id: 'cash-withdrawal',
    name: 'Tarik Tunai',
    description: 'Tarik uang tunai dari rekening',
    icon: Banknote,
    color: '#4CAF50',
    route: '/cash-withdrawal',
  },
  {
    id: 'topup-ewallet',
    name: 'Top-up E-Wallet',
    description: 'Isi ulang dompet digital pelanggan',
    icon: Smartphone,
    color: '#FF9800',
    route: '/topup-ewallet',
  },
  {
    id: 'va-payment',
    name: 'Pembayaran VA',
    description: 'Bayar virtual account',
    icon: FileText,
    color: '#9C27B0',
    route: '/va-payment',
  },
  {
    id: 'electronic-card',
    name: 'Kartu Elektronik',
    description: 'Kelola kartu elektronik',
    icon: CreditCard,
    color: '#F44336',
    route: '/electronic-card',
  },
  {
    id: 'jakarta-smart',
    name: 'Kartu Jakarta Pintar',
    description: 'Layanan Kartu Jakarta Pintar',
    icon: MapPin,
    color: '#FF5722',
    route: '/jakarta-smart',
  },
];

export default function Services() {
  const insets = useSafeAreaInsets();
  const { colors, statusBarStyle } = useTheme();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

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
          <Text style={{
            fontSize: 28,
            fontFamily: 'Roboto_700Bold',
            color: colors.text,
          }}>
            Layanan
          </Text>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Roboto_400Regular',
            color: colors.textMuted,
            marginTop: 4,
          }}>
            Pilih layanan yang ingin dilakukan
          </Text>
        </View>

        {/* Services Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => {
                if (service.route === '/transfer') {
                  router.push('/transfer');
                } else {
                  Alert.alert('Segera Hadir', `Fitur ${service.name} akan segera tersedia`);
                }
              }}
              style={{
                flex: 1,
                minWidth: '45%',
              }}
            >
              <View style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.border,
                aspectRatio: 1,
              }}>
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: `${service.color}20`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}>
                  <service.icon size={28} color={service.color} strokeWidth={1.5} />
                </View>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Roboto_700Bold',
                  color: colors.text,
                  textAlign: 'center',
                  marginBottom: 4,
                }}>
                  {service.name}
                </Text>
                <Text style={{
                  fontSize: 11,
                  fontFamily: 'Roboto_400Regular',
                  color: colors.textMuted,
                  textAlign: 'center',
                  lineHeight: 16,
                }}>
                  {service.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
