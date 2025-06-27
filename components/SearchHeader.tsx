import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { User, Search, MessageCircle } from 'lucide-react-native';
import { router } from 'expo-router';

interface SearchHeaderProps {
  onProfilePress: () => void;
  onMessagesPress: () => void;
}

export default function SearchHeader({ onProfilePress, onMessagesPress }: SearchHeaderProps) {
  const handleMessagesPress = () => {
    router.push('/chat');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
          <User size={24} color="#2563eb" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            placeholder="Search users, posts, opportunities..."
            style={styles.searchInput}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity style={styles.messagesButton} onPress={handleMessagesPress}>
          <MessageCircle size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 32,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  messagesButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});