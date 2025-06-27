import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {
  X,
  User,
  FileText,
  Bookmark,
  Calendar,
  ChevronRight,
} from 'lucide-react-native';

interface ProfileSidebarProps {
  visible: boolean;
  onClose: () => void;
  onViewFullProfile: () => void;
}

const { width } = Dimensions.get('window');

export default function ProfileSidebar({ visible, onClose, onViewFullProfile }: ProfileSidebarProps) {
  const mockProfile = {
    name: 'Anurag Tummapudi',
    headline: 'PhD Candidate in Machine Learning | Research Assistant',
    connections: 247,
    publications: 12,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  const menuItems = [
    { icon: User, label: 'Connections', value: mockProfile.connections, color: '#2563eb' },
    { icon: FileText, label: 'Publications', value: mockProfile.publications, color: '#7c3aed' },
    { icon: Bookmark, label: 'Saved Items', value: 18, color: '#059669' },
    { icon: Calendar, label: 'Events', value: 5, color: '#dc2626' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Image source={{ uri: mockProfile.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{mockProfile.name}</Text>
              <Text style={styles.headline}>{mockProfile.headline}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.statItem}>
                  <View style={styles.statLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                      <item.icon size={20} color={item.color} />
                    </View>
                    <View>
                      <Text style={styles.statLabel}>{item.label}</Text>
                      <Text style={styles.statValue}>{item.value}</Text>
                    </View>
                  </View>
                  <ChevronRight size={16} color="#9ca3af" />
                </TouchableOpacity>
              ))}
            </View>

            {/* View Full Profile Button */}
            <TouchableOpacity 
              style={styles.viewProfileButton}
              onPress={onViewFullProfile}
            >
              <Text style={styles.viewProfileText}>View Full Profile</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatar: {
    width: 60, // reduced from 80
    height: 60, // reduced from 80
    borderRadius: 30, // reduced from 40
    marginBottom: 12, // reduced from 16
  },
  name: {
    fontSize: 16, // reduced from 20
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 2, // reduced from 4
  },
  headline: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16, // reduced from 20
  },
  statsContainer: {
    paddingHorizontal: 16, // reduced from 20
    marginBottom: 16, // reduced from 30
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10, // reduced from 16
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32, // reduced from 40
    height: 32, // reduced from 40
    borderRadius: 16, // reduced from 20
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8, // reduced from 12
  },
  statLabel: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  statValue: {
    fontSize: 13, // reduced from 16
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 1, // reduced from 2
  },
  viewProfileButton: {
    marginHorizontal: 16, // reduced from 20
    backgroundColor: '#2563eb',
    paddingVertical: 10, // reduced from 16
    borderRadius: 10, // reduced from 12
    alignItems: 'center',
    marginBottom: 12, // reduced from 20
  },
  viewProfileText: {
    fontSize: 13, // reduced from 16
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});