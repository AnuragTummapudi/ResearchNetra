import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { Heart, MessageCircle, Share2, MoveHorizontal as MoreHorizontal, ExternalLink } from 'lucide-react-native';

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      headline: string;
      avatar: string;
    };
    content: string;
    image?: string;
    link?: {
      title: string;
      description: string;
      url: string;
      image: string;
    };
    likes: number;
    comments: number;
    timestamp: string;
    type: 'text' | 'image' | 'link';
  };
}

const { width } = Dimensions.get('window');

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this post by ${post.author.name}: ${post.content}`,
        title: 'Research Post',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share this post');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author.name}</Text>
          <Text style={styles.authorHeadline}>{post.author.headline}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Image */}
      {post.type === 'image' && post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Link Preview */}
      {post.type === 'link' && post.link && (
        <TouchableOpacity style={styles.linkPreview}>
          <Image source={{ uri: post.link.image }} style={styles.linkImage} />
          <View style={styles.linkContent}>
            <Text style={styles.linkTitle} numberOfLines={2}>
              {post.link.title}
            </Text>
            <Text style={styles.linkDescription} numberOfLines={2}>
              {post.link.description}
            </Text>
            <View style={styles.linkUrl}>
              <ExternalLink size={14} color="#6b7280" />
              <Text style={styles.linkUrlText}>{post.link.url}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Heart 
            size={20} 
            color={liked ? '#dc2626' : '#6b7280'} 
            fill={liked ? '#dc2626' : 'none'}
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#6b7280" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Share2 size={20} color="#6b7280" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 36, // reduced from 48
    height: 36, // reduced from 48
    borderRadius: 18, // reduced from 24
    marginRight: 8, // reduced from 12
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 14, // reduced from 16
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  authorHeadline: {
    fontSize: 11, // reduced from 13
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 1, // reduced from 2
  },
  timestamp: {
    fontSize: 10, // reduced from 12
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 2, // reduced from 4
  },
  moreButton: {
    padding: 4,
  },
  content: {
    fontSize: 13, // reduced from 15
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 18, // reduced from 22
    marginBottom: 8, // reduced from 12
  },
  postImage: {
    width: width - 40, // reduced from width - 32
    height: 160, // reduced from 200
    borderRadius: 8,
    marginBottom: 8, // reduced from 12
  },
  linkPreview: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8, // reduced from 12
  },
  linkImage: {
    width: '100%',
    height: 90, // reduced from 120
  },
  linkContent: {
    padding: 8, // reduced from 12
  },
  linkTitle: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2, // reduced from 4
  },
  linkDescription: {
    fontSize: 11, // reduced from 13
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4, // reduced from 8
  },
  linkUrl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkUrlText: {
    fontSize: 10, // reduced from 12
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 2, // reduced from 4
  },
  actions: {
    flexDirection: 'row',
    paddingTop: 4, // reduced from 8
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, // reduced from 24
  },
  actionText: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 4, // reduced from 6
  },
  likedText: {
    color: '#dc2626',
  },
});