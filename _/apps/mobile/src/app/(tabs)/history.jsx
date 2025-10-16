import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import {
  Send,
  ArrowDown,
  Download,
  ChevronRight,
  CalendarDays,
} from 'lucide-react-native';
import { useTheme } from '@/utils/theme';

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    type: 'transfer',
    name: 'Transfer ke Bambang',
    amount: 500000,
    direction: 'out',
    date: '2024-10-16',
    time: '14:30',
    status: 'completed',
  },
  {
    id: 2,
    type: 'cash-withdrawal',
    name: 'Tarik Tunai ATM',
    amount: 1000000,
    direction: 'out',
    date: '2024-10-16',
    time: '11:15',
    status: 'completed',
  },
  {
    id: 3,
    type: 'topup',
    name: 'Top-up GCash',
    amount: 250000,
    direction: 'out',
    date: '2024-10-15',
    time: '09:45',
    status: 'completed',
  },
  {
    id: 4,
    type: 'transfer',
    name: 'Terima dari Siti',
    amount: 750000,
    direction: 'in',
    date: '2024-10-15',
    time: '16:20',
    status: 'completed',
  },
  {
    id: 5,
    type: 'va-payment',
    name: 'Bayar VA Listrik',
    amount: 350000,
    direction: 'out',
    date: '2024-10-14',
    time: '13:00',
    status: 'completed',
  },
];

export default function History() {
  const insets = useSafeAreaInsets();
  const { colors, statusBarStyle } = useTheme();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const filteredTransactions =
    selectedFilter === 'all'
      ? MOCK_TRANSACTIONS
      : MOCK_TRANSACTIONS.filter((t) => t.direction === selectedFilter);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'transfer':
        return Send;
      case 'cash-withdrawal':
        return Download;
      default:
        return ArrowDown;
    }
  };

  const renderTransaction = ({ item }) => {
    const Icon = getTransactionIcon(item.type);
    const isIncome = item.direction === 'in';

    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: isIncome ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Icon size={24} color={isIncome ? colors.success : colors.error} strokeWidth={1.5} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto_700Bold',
              color: colors.text,
              marginBottom: 4,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Roboto_400Regular',
              color: colors.textDisabled,
            }}
          >
            {item.date} • {item.time}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto_700Bold',
              color: isIncome ? colors.success : colors.text,
              marginBottom: 4,
            }}
          >
            {isIncome ? '+' : '-'} Rp {item.amount.toLocaleString('id-ID')}
          </Text>
          <View
            style={{
              backgroundColor: colors.success + '20',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Roboto_600SemiBold',
                color: colors.success,
              }}
            >
              Berhasil
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={statusBarStyle} />

      <View
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 0,
          paddingHorizontal: 16,
        }}
      >
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: 'Roboto_700Bold',
              color: colors.text,
            }}
          >
            Riwayat Transaksi
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Roboto_400Regular',
              color: colors.textMuted,
              marginTop: 4,
            }}
          >
            {filteredTransactions.length} transaksi
          </Text>
        </View>

        {/* Filter Buttons */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'in', label: 'Masuk' },
            { id: 'out', label: 'Keluar' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor:
                  selectedFilter === filter.id ? colors.primary : colors.card,
                borderWidth: selectedFilter === filter.id ? 0 : 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto_600SemiBold',
                  color:
                    selectedFilter === filter.id ? colors.primaryText : colors.text,
                }}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 80,
          paddingTop: 0,
        }}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 40,
            }}
          >
            <CalendarDays size={48} color={colors.textMuted} strokeWidth={1} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto_700Bold',
                color: colors.text,
                marginTop: 16,
              }}
            >
              Belum Ada Transaksi
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto_400Regular',
                color: colors.textMuted,
                marginTop: 8,
              }}
            >
              Mulai lakukan transaksi pertama Anda
            </Text>
          </View>
        }
      />
    </View>
  );
}
