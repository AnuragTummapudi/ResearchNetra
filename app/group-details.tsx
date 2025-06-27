import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Users, MessageSquare, Calendar, Plus, Settings } from 'lucide-react-native';

export default function GroupDetailsPage() {
  const { groupId, action } = useLocalSearchParams();
  const [joined, setJoined] = useState(action === 'view');

  const mockGroup = {
    id: groupId,
    name: 'AI & Machine Learning Research',
    description: 'A collaborative space for researchers working on cutting-edge AI and ML projects. Share insights, discuss papers, and collaborate on projects.',
    domain: 'Artificial Intelligence',
    memberCount: 1247,
    activeDiscussions: 23,
    upcomingEvents: 3,
    isPrivate: false,
  };

  const handleJoinGroup = () => {
    if (mockGroup.isPrivate) {
      Alert.alert('Request Sent', 'Your request to join this private group has been sent to the administrators.');
    } else {
      setJoined(true);
      Alert.alert('Success', 'You have successfully joined the group!');
    }
  };

  const handleLeaveGroup = () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave this group?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            setJoined(false);
            Alert.alert('Left Group', 'You have left the group.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Details</Text>
        {joined && (
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Group Info */}
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{mockGroup.name}</Text>
          <Text style={styles.groupDomain}>{mockGroup.domain}</Text>
          <Text style={styles.groupDescription}>{mockGroup.description}</Text>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Users size={20} color="#6b7280" />
              <Text style={styles.statText}>{mockGroup.memberCount.toLocaleString()} members</Text>
            </View>
            <View style={styles.stat}>
              <MessageSquare size={20} color="#6b7280" />
              <Text style={styles.statText}>{mockGroup.activeDiscussions} discussions</Text>
            </View>
            <View style={styles.stat}>
              <Calendar size={20} color="#6b7280" />
              <Text style={styles.statText}>{mockGroup.upcomingEvents} events</Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionContainer}>
          {joined ? (
            <View style={styles.joinedActions}>
              <TouchableOpacity style={styles.primaryButton}>
                <MessageSquare size={20} color="#ffffff" />
                <Text style={styles.primaryButtonText}>View Discussions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Calendar size={20} color="#2563eb" />
                <Text style={styles.secondaryButtonText}>Events</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveGroup}>
                <Text style={styles.leaveButtonText}>Leave Group</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
              <Plus size={20} color="#ffffff" />
              <Text style={styles.joinButtonText}>
                {mockGroup.isPrivate ? 'Request to Join' : 'Join Group'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Recent Activity */}
        {joined && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityItem}>
              <Text style={styles.activityTitle}>New paper discussion: "Attention Mechanisms in Transformers"</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityTitle}>Weekly meeting scheduled for Friday</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityTitle}>New member joined: Dr. Alex Thompson</Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
          </View>
        )}

        {/* Group Rules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Guidelines</Text>
          <Text style={styles.ruleText}>• Be respectful and professional in all interactions</Text>
          <Text style={styles.ruleText}>• Share relevant research and insights</Text>
          <Text style={styles.ruleText}>• No spam or self-promotion without context</Text>
          <Text style={styles.ruleText}>• Cite sources when sharing research</Text>
          <Text style={styles.ruleText}>• Help maintain a collaborative environment</Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  groupInfo: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
  },
  groupName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  groupDomain: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
    marginBottom: 12,
  },
  groupDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  stat: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 4,
  },
  actionContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  joinedActions: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 16,
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
    marginLeft: 8,
  },
  leaveButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  leaveButtonText: {
    fontSize: 14,
    fontFamily:  'Inter-Medium',
    color: '#dc2626',
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  ruleText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
});