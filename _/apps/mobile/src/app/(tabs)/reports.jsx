import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react-native';
import { useTheme } from '@/utils/theme';

const REPORTS = [
  {
    id: 'income-expense',
    title: 'Laporan Laba Rugi',
    description: 'Perbandingan pemasukan dan pengeluaran',
    icon: BarChart3,
    data: {
      income: 2500000,
      expense: 1200000,
      profit: 1300000,
    },
  },
  {
    id: 'cash-flow',
    title: 'Laporan Arus Kas',
    description: 'Aliran kas masuk dan keluar',
    icon: ArrowUpRight,
    data: {
      inflow: 3500000,
      outflow: 1800000,
      netFlow: 1700000,
    },
  },
  {
    id: 'mutations',
    title: 'Laporan Mutasi',
    description: 'Detail perubahan saldo rekening',
    icon: TrendingUp,
    data: {
      transactions: 45,
      dateRange: 'Bulan ini',
    },
  },
];

export default function Reports() {
  const insets = useSafeAreaInsets();
  const { colors, statusBarStyle } = useTheme();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [selectedPeriod, setSelectedPeriod] = useState('month');

  if (!fontsLoaded) {
    return null;
  }

  const renderReportCard = ({ item }) => {
    const Icon = item.icon;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: 'rgba(30, 136, 229, 0.1)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}
          >
            <Icon size={28} color={colors.primary} strokeWidth={1.5} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Roboto_700Bold',
                color: colors.text,
                marginBottom: 4,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Roboto_400Regular',
                color: colors.textMuted,
                marginBottom: 12,
              }}
            >
              {item.description}
            </Text>

            {/* Quick Stats */}
            {item.id === 'income-expense' && (
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_400Regular', color: colors.textMuted }}>
                    Pemasukan
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.success }}>
                    Rp {item.data.income.toLocaleString('id-ID')}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_400Regular', color: colors.textMuted }}>
                    Pengeluaran
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.error }}>
                    Rp {item.data.expense.toLocaleString('id-ID')}
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.divider,
                    marginVertical: 8,
                  }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_500Medium', color: colors.text }}>
                    Laba Bersih
                  </Text>
                  <Text style={{ fontSize: 14, fontFamily: 'Roboto_700Bold', color: colors.success }}>
                    Rp {item.data.profit.toLocaleString('id-ID')}
                  </Text>
                </View>
              </View>
            )}

            {item.id === 'cash-flow' && (
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_400Regular', color: colors.textMuted }}>
                    Kas Masuk
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.success }}>
                    Rp {item.data.inflow.toLocaleString('id-ID')}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_400Regular', color: colors.textMuted }}>
                    Kas Keluar
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.error }}>
                    Rp {item.data.outflow.toLocaleString('id-ID')}
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.divider,
                    marginVertical: 8,
                  }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_500Medium', color: colors.text }}>
                    Net Flow
                  </Text>
                  <Text style={{ fontSize: 14, fontFamily: 'Roboto_700Bold', color: colors.success }}>
                    Rp {item.data.netFlow.toLocaleString('id-ID')}
                  </Text>
                </View>
              </View>
            )}

            {item.id === 'mutations' && (
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_400Regular', color: colors.textMuted }}>
                    Total Transaksi
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.primary }}>
                    {item.data.transactions} transaksi
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_400Regular', color: colors.textMuted }}>
                    Periode
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Roboto_700Bold', color: colors.primary }}>
                    {item.data.dateRange}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <ChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} style={{ marginTop: 2 }} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={statusBarStyle} />

      <FlatList
        data={REPORTS}
        renderItem={renderReportCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 80,
        }}
        ListHeaderComponent={
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: 'Roboto_700Bold',
                color: colors.text,
              }}
            >
              Laporan Keuangan
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto_400Regular',
                color: colors.textMuted,
                marginTop: 4,
              }}
            >
              Analisa pendapatan dan pengeluaran
            </Text>

            {/* Period Filter */}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
              {[
                { id: 'week', label: 'Minggu' },
                { id: 'month', label: 'Bulan' },
                { id: 'year', label: 'Tahun' },
              ].map((period) => (
                <TouchableOpacity
                  key={period.id}
                  onPress={() => setSelectedPeriod(period.id)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 20,
                    backgroundColor:
                      selectedPeriod === period.id ? colors.primary : colors.card,
                    borderWidth: selectedPeriod === period.id ? 0 : 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Roboto_600SemiBold',
                      color:
                        selectedPeriod === period.id ? colors.primaryText : colors.text,
                    }}
                  >
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
      />
    </View>
  );
}
