import { useColorScheme } from 'react-native';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    // Primary colors - BRImo blue theme
    primary: '#1E88E5',
    primaryText: '#FFFFFF',
    secondary: '#E3F2FD',
    secondaryText: '#1E88E5',
    
    // Background
    background: isDark ? '#000000' : '#FFFFFF',
    card: isDark ? '#1A1A1A' : '#FFFFFF',
    elevated: isDark ? '#2A2A2A' : '#F5F5F5',
    
    // Text
    text: isDark ? '#FFFFFF' : '#000000',
    textMuted: isDark ? '#B0B0B0' : '#666666',
    textSecondary: isDark ? '#888888' : '#666666',
    textDisabled: isDark ? '#666666' : '#999999',
    
    // Border & divider
    border: isDark ? '#333333' : '#E0E0E0',
    divider: isDark ? '#2A2A2A' : '#F0F0F0',
    
    // Status colors
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    
    // Tab colors
    tabBackground: isDark ? '#000000' : '#FFFFFF',
    tabActive: '#1E88E5',
    tabInactive: isDark ? '#666666' : '#999999',
  };

  return {
    colors,
    isDark,
    statusBarStyle: isDark ? 'light' : 'dark',
  };
}
