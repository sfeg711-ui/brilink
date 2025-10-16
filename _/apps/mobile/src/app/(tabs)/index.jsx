import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react-native';
import { useTheme } from '@/utils/theme';

const AGENT_ID = 1; // Demo agent ID

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { colors, statusBarStyle } = useTheme();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState(2500000);
  const [income, setIncome] = useState(750000);
  const [expenses, setExpenses] = useState(250000);

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
            Selamat Datang
          </Text>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Roboto_400Regular',
            color: colors.textMuted,
            marginTop: 4,
          }}>
            Agen BRILink
          </Text>
        </View>

        {/* Balance Card */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 5,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: 'Roboto_500Medium',
              color: 'rgba(255,255,255,0.8)',
            }}>
              Saldo Total
            </Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              {showBalance ? (
                <Eye size={20} color="#FFFFFF" strokeWidth={1.5} />
              ) : (
                <EyeOff size={20} color="#FFFFFF" strokeWidth={1.5} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={{
            fontSize: 36,
            fontFamily: 'Roboto_700Bold',
            color: '#FFFFFF',
            marginBottom: 24,
          }}>
            {showBalance ? `Rp ${balance.toLocaleString('id-ID')}` : '••••••••'}
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.2)',
            paddingTop: 16,
          }}>
            <View>
              <Text style={{
                fontSize: 12,
                fontFamily: 'Roboto_400Regular',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 4,
              }}>
                Pemasukan
              </Text>
              <Text style={{
                fontSize: 18,
                fontFamily: 'Roboto_700Bold',
                color: '#FFFFFF',
              }}>
                Rp {income.toLocaleString('id-ID')}
              </Text>
            </View>
            <View>
              <Text style={{
                fontSize: 12,
                fontFamily: 'Roboto_400Regular',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 4,
              }}>
                Pengeluaran
              </Text>
              <Text style={{
                fontSize: 18,
                fontFamily: 'Roboto_700Bold',
                color: '#FFFFFF',
              }}>
                Rp {expenses.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 18,
            fontFamily: 'Roboto_700Bold',
            color: colors.text,
            marginBottom: 12,
          }}>
            Status Bisnis
          </Text>

          <View style={{ gap: 12 }}>
            {/* Income Card */}
            <View style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderLeftWidth: 4,
              borderLeftColor: colors.success,
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <TrendingUp size={24} color={colors.success} strokeWidth={1.5} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 12,
                  fontFamily: 'Roboto_400Regular',
                  color: colors.textMuted,
                  marginBottom: 2,
                }}>
                  Total Pemasukan
                </Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: 'Roboto_700Bold',
                  color: colors.success,
                }}>
                  Rp {income.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>

            {/* Expense Card */}
            <View style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderLeftWidth: 4,
              borderLeftColor: colors.error,
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <TrendingDown size={24} color={colors.error} strokeWidth={1.5} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 12,
                  fontFamily: 'Roboto_400Regular',
                  color: colors.textMuted,
                  marginBottom: 2,
                }}>
                  Total Pengeluaran
                </Text>
                <Text style={{
                  fontSize: 18,
                  fontFamily: 'Roboto_700Bold',
                  color: colors.error,
                }}>
                  Rp {expenses.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View>
          <Text style={{
            fontSize: 18,
            fontFamily: 'Roboto_700Bold',
            color: colors.text,
            marginBottom: 12,
          }}>
            Akses Cepat
          </Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/services')}
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{
                fontSize: 16,
                fontFamily: 'Roboto_700Bold',
                color: colors.primary,
              }}>
                Lakukan Transaksi
              </Text>
              <Text style={{
                fontSize: 12,
                fontFamily: 'Roboto_400Regular',
                color: colors.textMuted,
                marginTop: 4,
              }}>
                Transfer, tarik tunai, topup & lainnya
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/reports')}
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{
                fontSize: 16,
                fontFamily: 'Roboto_700Bold',
                color: colors.primary,
              }}>
                Lihat Laporan
              </Text>
              <Text style={{
                fontSize: 12,
                fontFamily: 'Roboto_400Regular',
                color: colors.textMuted,
                marginTop: 4,
              }}>
                Laporan keuangan & analisa bisnis
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
