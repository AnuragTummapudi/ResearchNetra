import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import SearchHeader from '@/components/SearchHeader';
import PostCard from '@/components/PostCard';
import ProfileSidebar from '@/components/ProfileSidebar';
import { Plus } from 'lucide-react-native';

export default function HomePage() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const mockPosts = [
    {
      id: '1',
      author: {
        name: 'Dr. Emily Rodriguez',
        headline: 'Professor of Computer Science | AI Research',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      content: 'Excited to share our latest breakthrough in neural network optimization! Our new algorithm reduces training time by 35% while maintaining accuracy. Looking forward to collaborating with more researchers in this space.',
      type: 'text' as const,
      likes: 47,
      comments: 12,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      author: {
        name: 'Alex Chen',
        headline: 'PhD Student in Quantum Computing | Research Assistant',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      content: 'Just finished an amazing experiment on quantum entanglement. The results exceeded our expectations!',
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      type: 'image' as const,
      likes: 23,
      comments: 8,
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      author: {
        name: 'Dr. Sarah Kim',
        headline: 'Biomedical Engineer | Cancer Research',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      content: 'New research paper published on targeted drug delivery systems. This could revolutionize cancer treatment approaches.',
      link: {
        title: 'Novel Nanoparticle-Based Drug Delivery for Cancer Therapy',
        description: 'A comprehensive study on using nanoparticles for targeted cancer treatment with minimal side effects.',
        url: 'nature.com/articles/research-123',
        image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
      },
      type: 'link' as const,
      likes: 89,
      comments: 24,
      timestamp: '6 hours ago'
    },
    {
      id: '4',
      author: {
        name: 'Marcus Johnson',
        headline: 'Environmental Science Researcher | Climate Data Analysis',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      content: 'Our team is looking for passionate graduate students to join our climate modeling project. We\'re studying the effects of microplastics on marine ecosystems. This is a great opportunity for hands-on research experience!',
      type: 'text' as const,
      likes: 34,
      comments: 16,
      timestamp: '1 day ago'
    }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleViewFullProfile = () => {
    setSidebarVisible(false);
    router.push('/profile');
  };

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  return (
    <View style={styles.container}>
      <SearchHeader 
        onProfilePress={() => setSidebarVisible(true)}
        onMessagesPress={() => {/* Handle messages */}}
      />
      
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleCreatePost}>
        <Plus size={24} color="#ffffff" />
      </TouchableOpacity>

      <ProfileSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onViewFullProfile={handleViewFullProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
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