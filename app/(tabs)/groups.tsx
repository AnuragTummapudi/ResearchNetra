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
import { router } from 'expo-router';
import {
  Search,
  Filter,
  Users,
  MessageSquare,
  Calendar,
  Plus,
  Bookmark,
  Star,
} from 'lucide-react-native';

interface ResearchGroup {
  id: string;
  name: string;
  description: string;
  domain: string;
  memberCount: number;
  activeDiscussions: number;
  upcomingEvents: number;
  image: string;
  isPrivate: boolean;
  joined: boolean;
  tags: string[];
}

export default function ResearchGroupsPage() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');

  const mockGroups: ResearchGroup[] = [
    {
      id: '1',
      name: 'AI & Machine Learning Research',
      description: 'A collaborative space for researchers working on cutting-edge AI and ML projects. Share insights, discuss papers, and collaborate on projects.',
      domain: 'Artificial Intelligence',
      memberCount: 1247,
      activeDiscussions: 23,
      upcomingEvents: 3,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      isPrivate: false,
      joined: true,
      tags: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
    },
    {
      id: '2',
      name: 'Quantum Computing Collective',
      description: 'Explore the fascinating world of quantum computing, quantum algorithms, and quantum error correction with fellow researchers.',
      domain: 'Quantum Physics',
      memberCount: 432,
      activeDiscussions: 15,
      upcomingEvents: 2,
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      isPrivate: false,
      joined: false,
      tags: ['Quantum Algorithms', 'Quantum Error Correction', 'Quantum Hardware'],
    },
    {
      id: '3',
      name: 'Biomedical Engineering Hub',
      description: 'Connecting biomedical engineers, researchers, and medical professionals to advance healthcare through engineering.',
      domain: 'Biomedical Engineering',
      memberCount: 856,
      activeDiscussions: 18,
      upcomingEvents: 1,
      image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      isPrivate: true,
      joined: true,
      tags: ['Medical Devices', 'Drug Delivery', 'Tissue Engineering'],
    },
    {
      id: '4',
      name: 'Climate Science Research Network',
      description: 'Collaborative research on climate change, environmental modeling, and sustainable solutions for our planet\'s future.',
      domain: 'Environmental Science',
      memberCount: 634,
      activeDiscussions: 12,
      upcomingEvents: 4,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      isPrivate: false,
      joined: false,
      tags: ['Climate Modeling', 'Sustainability', 'Environmental Data'],
    },
  ];

  const tabs = [
    { id: 'discover', label: 'Discover' },
    { id: 'my-groups', label: 'My Groups' },
    { id: 'recommended', label: 'Recommended' },
  ];

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.domain.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'my-groups') {
      return matchesSearch && group.joined;
    }
    if (activeTab === 'recommended') {
      return matchesSearch && !group.joined;
    }
    return matchesSearch;
  });

  const handleJoinGroup = (groupId: string) => {
    router.push({
      pathname: '/group-details',
      params: { groupId, action: 'join' }
    });
  };

  const handleGroupPress = (group: ResearchGroup) => {
    if (group.joined) {
      router.push({
        pathname: '/group-details',
        params: { groupId: group.id, action: 'view' }
      });
    } else {
      handleJoinGroup(group.id);
    }
  };

  const handleCreateGroup = () => {
    router.push('/create-group');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Research Groups</Text>
        <View style={styles.searchContainer}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            placeholder="Search groups..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color="#6b7280" />
          </TouchableOpacity>
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

      {/* Groups List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={styles.groupCard}
            onPress={() => handleGroupPress(group)}
          >
            <Image source={{ uri: group.image }} style={styles.groupImage} />
            
            <View style={styles.groupContent}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupName} numberOfLines={1}>
                  {group.name}
                </Text>
                <View style={styles.groupBadges}>
                  {group.isPrivate && (
                    <View style={styles.privateBadge}>
                      <Text style={styles.privateBadgeText}>Private</Text>
                    </View>
                  )}
                  {group.joined && (
                    <View style={styles.joinedBadge}>
                      <Text style={styles.joinedBadgeText}>Joined</Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={styles.domain}>{group.domain}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {group.description}
              </Text>

              {/* Tags */}
              <View style={styles.tagsContainer}>
                {group.tags.slice(0, 2).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
                {group.tags.length > 2 && (
                  <Text style={styles.moreTags}>+{group.tags.length - 2}</Text>
                )}
              </View>

              {/* Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Users size={14} color="#6b7280" />
                  <Text style={styles.statText}>{group.memberCount.toLocaleString()}</Text>
                </View>
                <View style={styles.stat}>
                  <MessageSquare size={14} color="#6b7280" />
                  <Text style={styles.statText}>{group.activeDiscussions}</Text>
                </View>
                <View style={styles.stat}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.statText}>{group.upcomingEvents}</Text>
                </View>
              </View>

              {/* Action Button */}
              <View style={styles.actionContainer}>
                {group.joined ? (
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={() => handleGroupPress(group)}
                  >
                    <Text style={styles.viewButtonText}>View Group</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => handleJoinGroup(group.id)}
                  >
                    <Plus size={16} color="#ffffff" />
                    <Text style={styles.joinButtonText}>
                      {group.isPrivate ? 'Request Access' : 'Join Group'}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.bookmarkButton}>
                  <Bookmark size={16} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Create Group FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateGroup}>
        <Plus size={24} color="#ffffff" />
      </TouchableOpacity>
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
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
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
  },
  activeTabText: {
    color: '#2563eb',
  },
  scrollView: {
    flex: 1,
  },
  groupCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImage: {
    width: '100%',
    height: 120,
  },
  groupContent: {
    padding: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  groupName: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginRight: 12,
  },
  groupBadges: {
    flexDirection: 'row',
  },
  privateBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  privateBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#dc2626',
  },
  joinedBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  joinedBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
  },
  domain: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  moreTags: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    alignSelf: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  joinButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 6,
  },
  viewButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  bookmarkButton: {
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});