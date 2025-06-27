import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, Link, Send } from 'lucide-react-native';

export default function CreatePostPage() {
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState<'text' | 'image' | 'link'>('text');

  const handlePost = () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please enter some content for your post.');
      return;
    }

    Alert.alert('Success', 'Your post has been published!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Send size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Post Type Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, postType === 'text' && styles.activeTypeButton]}
            onPress={() => setPostType('text')}
          >
            <Text style={[styles.typeButtonText, postType === 'text' && styles.activeTypeButtonText]}>
              Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, postType === 'image' && styles.activeTypeButton]}
            onPress={() => setPostType('image')}
          >
            <ImageIcon size={16} color={postType === 'image' ? '#ffffff' : '#6b7280'} />
            <Text style={[styles.typeButtonText, postType === 'image' && styles.activeTypeButtonText]}>
              Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, postType === 'link' && styles.activeTypeButton]}
            onPress={() => setPostType('link')}
          >
            <Link size={16} color={postType === 'link' ? '#ffffff' : '#6b7280'} />
            <Text style={[styles.typeButtonText, postType === 'link' && styles.activeTypeButtonText]}>
              Link
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Input */}
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder="What's on your mind? Share your research insights, discoveries, or questions..."
            multiline
            numberOfLines={8}
            value={postContent}
            onChangeText={setPostContent}
            placeholderTextColor="#9ca3af"
            textAlignVertical="top"
          />
        </View>

        {/* Additional Options based on post type */}
        {postType === 'image' && (
          <View style={styles.additionalOptions}>
            <TouchableOpacity style={styles.optionButton}>
              <ImageIcon size={20} color="#2563eb" />
              <Text style={styles.optionButtonText}>Add Image</Text>
            </TouchableOpacity>
          </View>
        )}

        {postType === 'link' && (
          <View style={styles.additionalOptions}>
            <TextInput
              style={styles.linkInput}
              placeholder="Enter URL..."
              placeholderTextColor="#9ca3af"
            />
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for a great post:</Text>
          <Text style={styles.tipText}>• Share your research findings or insights</Text>
          <Text style={styles.tipText}>• Ask questions to engage the community</Text>
          <Text style={styles.tipText}>• Use relevant hashtags to reach more researchers</Text>
          <Text style={styles.tipText}>• Be respectful and constructive in your discussions</Text>
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
  postButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTypeButton: {
    backgroundColor: '#2563eb',
  },
  typeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 4,
  },
  activeTypeButtonText: {
    color: '#ffffff',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  contentInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    lineHeight: 24,
    minHeight: 120,
  },
  additionalOptions: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  optionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 8,
  },
  linkInput: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tipsContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 4,
  },
});