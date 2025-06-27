import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { Search, UserPlus, MessageCircle, Users, UserCheck } from 'lucide-react-native';

interface Connection {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  mutualConnections: number;
  connected: boolean;
  requested?: boolean;
}

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState('connections');
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      name: 'Dr. Jennifer Liu',
      headline: 'Machine Learning Researcher | Stanford University',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      mutualConnections: 23,
      connected: true,
    },
    {
      id: '2',
      name: 'Prof. Michael Brown',
      headline: 'Director of Quantum Computing Lab | MIT',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      mutualConnections: 45,
      connected: true,
    },
    {
      id: '3',
      name: 'Dr. Lisa Wang',
      headline: 'Biomedical Engineering | Harvard Medical School',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      mutualConnections: 12,
      connected: false,
      requested: false,
    },
    {
      id: '4',
      name: 'Dr. James Thompson',
      headline: 'Environmental Science | UC Berkeley',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      mutualConnections: 8,
      connected: false,
      requested: false,
    },
  ]);

  const tabs = [
    { id: 'connections', label: 'My Network', icon: Users },
    { id: 'suggestions', label: 'Suggestions', icon: UserPlus },
  ];

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.headline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedConnections = activeTab === 'connections' 
    ? filteredConnections.filter(c => c.connected)
    : filteredConnections.filter(c => !c.connected);

  const handleConnect = (id: string) => {
    setConnections(prev => 
      prev.map(connection => 
        connection.id === id 
          ? { ...connection, requested: true }
          : connection
      )
    );
  };

  const handleMessage = (id: string) => {
    // Handle messaging logic
    console.log('Message user:', id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Network</Text>
        <View style={styles.searchContainer}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            placeholder="Search connections..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <tab.icon 
              size={18} 
              color={activeTab === tab.id ? '#2563eb' : '#6b7280'} 
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>247</Text>
          <Text style={styles.statLabel}>Connections</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>43</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      {/* Connection List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {displayedConnections.map((connection) => (
          <View key={connection.id} style={styles.connectionCard}>
            <Image source={{ uri: connection.avatar }} style={styles.avatar} />
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionName}>{connection.name}</Text>
              <Text style={styles.connectionHeadline} numberOfLines={2}>
                {connection.headline}
              </Text>
              <Text style={styles.mutualConnections}>
                {connection.mutualConnections} mutual connections
              </Text>
            </View>
            <View style={styles.actionButtons}>
              {connection.connected ? (
                <TouchableOpacity 
                  style={styles.messageButton}
                  onPress={() => handleMessage(connection.id)}
                >
                  <MessageCircle size={16} color="#2563eb" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={[
                    styles.connectButton,
                    connection.requested && styles.requestedButton
                  ]}
                  onPress={() => handleConnect(connection.id)}
                  disabled={connection.requested}
                >
                  {connection.requested ? (
                    <UserCheck size={16} color="#059669" />
                  ) : (
                    <UserPlus size={16} color="#ffffff" />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#2563eb',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  connectionCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  connectionInfo: {
    flex: 1,
  },
  connectionName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  connectionHeadline: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 4,
  },
  mutualConnections: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  actionButtons: {
    marginLeft: 12,
  },
  connectButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestedButton: {
    backgroundColor: '#dcfce7',
  },
  messageButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});