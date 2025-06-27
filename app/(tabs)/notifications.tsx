import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  Bell,
  Heart,
  MessageCircle,
  Users,
  Briefcase,
  Calendar,
  Settings,
} from 'lucide-react-native';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'connection' | 'opportunity' | 'event' | 'group';
  title: string;
  description: string;
  avatar: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'Dr. Emily Rodriguez liked your post',
      description: 'Your post about neural network optimization',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      timestamp: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      title: 'Alex Chen commented on your post',
      description: '"Great insights on quantum computing applications!"',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      timestamp: '15 minutes ago',
      read: false,
    },
    {
      id: '3',
      type: 'connection',
      title: 'Dr. Sarah Kim wants to connect',
      description: 'Biomedical Engineer at Harvard Medical School',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: '4',
      type: 'opportunity',
      title: 'New research opportunity matches your profile',
      description: 'Machine Learning Research Assistant at Stanford',
      avatar: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      timestamp: '3 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'event',
      title: 'AI Research Symposium tomorrow',
      description: 'Your registered event starts at 9:00 AM',
      avatar: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      timestamp: '4 hours ago',
      read: true,
    },
    {
      id: '6',
      type: 'group',
      title: 'New post in Quantum Computing Research',
      description: 'Dr. Michael Brown shared a breakthrough paper',
      avatar: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      timestamp: '6 hours ago',
      read: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    const iconProps = { size: 16, color: '#ffffff' };
    
    switch (type) {
      case 'like':
        return <Heart {...iconProps} />;
      case 'comment':
        return <MessageCircle {...iconProps} />;
      case 'connection':
        return <Users {...iconProps} />;
      case 'opportunity':
        return <Briefcase {...iconProps} />;
      case 'event':
        return <Calendar {...iconProps} />;
      case 'group':
        return <Users {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like':
        return '#dc2626';
      case 'comment':
        return '#2563eb';
      case 'connection':
        return '#059669';
      case 'opportunity':
        return '#7c3aed';
      case 'event':
        return '#ea580c';
      case 'group':
        return '#0891b2';
      default:
        return '#6b7280';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerButtons}>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              !notification.read && styles.unreadCard,
            ]}
            onPress={() => markAsRead(notification.id)}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri: notification.avatar }} style={styles.avatar} />
              <View 
                style={[
                  styles.iconBadge,
                  { backgroundColor: getNotificationColor(notification.type) }
                ]}
              >
                {getNotificationIcon(notification.type)}
              </View>
            </View>
            
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription} numberOfLines={2}>
                {notification.description}
              </Text>
              <Text style={styles.timestamp}>{notification.timestamp}</Text>
            </View>
            
            {!notification.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  badge: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllButton: {
    marginRight: 16,
  },
  markAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
  },
  unreadCard: {
    backgroundColor: '#fefefe',
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
    marginLeft: 12,
  },
});