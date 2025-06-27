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
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CreditCard as Edit, MapPin, Calendar, ExternalLink, Plus, Trash2, Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

interface ProfileSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list';
}

export default function FullProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Anurag Tummapudi',
    headline: 'PhD Candidate in Machine Learning | Research Assistant',
    about: 'Passionate researcher in machine learning and artificial intelligence with a focus on neural network optimization and computer vision applications. Currently pursuing PhD at Stanford University under the supervision of Dr. Emily Rodriguez.',
    location: 'Stanford, CA',
    email: 'anurag.tummapudi@stanford.edu',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg', // changed to a boy photo
  });

  const [sections, setSections] = useState<{
    experience: Array<{
      id: string;
      title: string;
      company: string;
      duration: string;
      location: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      title: string;
      institution: string;
      duration: string;
      location: string;
      description: string;
    }>;
    publications: Array<{
      id: string;
      title: string;
      venue: string;
      year: string;
      authors: string;
      url: string;
    }>;
    certifications: Array<{
      id: string;
      title: string;
      issuer: string;
      date: string;
      url: string;
    }>;
  }>(
    {
      experience: [
        {
          id: '1',
          title: 'Research Assistant',
          company: 'Stanford AI Lab',
          duration: '2022 - Present',
          location: 'Stanford, CA',
          description: 'Conducting research on neural network optimization and developing novel algorithms for deep learning applications.',
        },
        {
          id: '2',
          title: 'Machine Learning Intern',
          company: 'Google Research',
          duration: 'Summer 2021',
          location: 'Mountain View, CA',
          description: 'Worked on computer vision projects and contributed to TensorFlow optimization libraries.',
        },
      ],
      education: [
        {
          id: '1',
          title: 'PhD in Computer Science',
          institution: 'Stanford University',
          duration: '2020 - 2024 (Expected)',
          location: 'Stanford, CA',
          description: 'Focus on Machine Learning and Artificial Intelligence',
        },
        {
          id: '2',
          title: 'Master of Science in Computer Science',
          institution: 'MIT',
          duration: '2018 - 2020',
          location: 'Cambridge, MA',
          description: 'Specialization in Machine Learning and Data Science',
        },
      ],
      publications: [
        {
          id: '1',
          title: 'Neural Network Optimization Through Adaptive Learning Rates',
          venue: 'ICML 2023',
          year: '2023',
          authors: 'A. Tummapudi, E. Rodriguez, M. Johnson',
          url: 'https://proceedings.mlr.press/v202/tummapudi23a.html',
        },
        {
          id: '2',
          title: 'Efficient Computer Vision Models for Mobile Applications',
          venue: 'CVPR 2022',
          year: '2022',
          authors: 'A. Tummapudi, A. Kumar, L. Wang',
          url: 'https://openaccess.thecvf.com/content/CVPR2022/html/Tummapudi_Efficient_Computer_Vision_Models_for_Mobile_Applications_CVPR_2022_paper.html',
        },
      ],
      certifications: [
        {
          id: '1',
          title: 'Deep Learning Specialization',
          issuer: 'Coursera - DeepLearning.AI',
          date: '2021',
          url: 'https://coursera.org/verify/specialization/ABC123',
        },
        {
          id: '2',
          title: 'Google Cloud Professional ML Engineer',
          issuer: 'Google Cloud',
          date: '2020',
          url: 'https://cloud.google.com/certification/machine-learning-engineer',
        },
      ],
    }
  );

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes if needed
  };

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Feature Not Available', 'Image upload is not available on web. Please use the mobile app.');
      return;
    }

    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(prev => ({ ...prev, avatar: result.assets[0].uri }));
    }
  };

  // Define a type for section keys
  type SectionKey = keyof typeof sections;

  const addItem = (sectionName: SectionKey) => {
    const newItem = {
      id: Date.now().toString(),
      title: '',
      // Add other default fields based on section type
    };
    setSections(prev => ({
      ...prev,
      [sectionName]: [...prev[sectionName], newItem],
    }));
  };

  const removeItem = (sectionName: SectionKey, itemId: string) => {
    setSections(prev => ({
      ...prev,
      [sectionName]: prev[sectionName].filter((item: any) => item.id !== itemId),
    }));
  };

  const renderEditableField = (label: string, value: string, onChangeText: (text: string) => void, multiline = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  const renderSection = (
    title: string,
    items: any[],
    sectionKey: SectionKey,
    renderItem: (item: any) => React.ReactNode
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {isEditing && (
          <TouchableOpacity onPress={() => addItem(sectionKey)} style={styles.addButton}>
            <Plus size={16} color="#2563eb" />
          </TouchableOpacity>
        )}
      </View>
      {items.map((item, index) => (
        <View key={item.id} style={styles.sectionItem}>
          {renderItem(item)}
          {isEditing && (
            <TouchableOpacity
              onPress={() => removeItem(sectionKey, item.id)}
              style={styles.removeButton}
            >
              <Trash2 size={16} color="#dc2626" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          style={styles.editButton}
        >
          <Edit size={20} color="#2563eb" />
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            {isEditing && (
              <TouchableOpacity style={styles.avatarEditButton} onPress={pickImage}>
                <Camera size={16} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
          
          {isEditing ? (
            <View style={styles.editingContainer}>
              {renderEditableField('Name', profile.name, (text) => setProfile(prev => ({ ...prev, name: text })))}
              {renderEditableField('Headline', profile.headline, (text) => setProfile(prev => ({ ...prev, headline: text })), true)}
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.headline}>{profile.headline}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#6b7280" />
                <Text style={styles.location}>{profile.location}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>247</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Publications</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Citations</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          {isEditing ? (
            renderEditableField('About', profile.about, (text) => setProfile(prev => ({ ...prev, about: text })), true)
          ) : (
            <Text style={styles.aboutText}>{profile.about}</Text>
          )}
        </View>

        {/* Experience Section */}
        {renderSection('Experience', sections.experience, 'experience', (item) => (
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.company}</Text>
            <Text style={styles.itemDuration}>{item.duration} • {item.location}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        ))}

        {/* Education Section */}
        {renderSection('Education', sections.education, 'education', (item) => (
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.institution}</Text>
            <Text style={styles.itemDuration}>{item.duration} • {item.location}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        ))}

        {/* Publications Section */}
        {renderSection('Publications', sections.publications, 'publications', (item) => (
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.venue} • {item.year}</Text>
            <Text style={styles.itemDescription}>{item.authors}</Text>
            {item.url && (
              <TouchableOpacity style={styles.linkButton}>
                <ExternalLink size={14} color="#2563eb" />
                <Text style={styles.linkText}>View Publication</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Certifications Section */}
        {renderSection('Certifications', sections.certifications, 'certifications', (item) => (
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.issuer}</Text>
            <Text style={styles.itemDuration}>{item.date}</Text>
            {item.url && (
              <TouchableOpacity style={styles.linkButton}>
                <ExternalLink size={14} color="#2563eb" />
                <Text style={styles.linkText}>View Certificate</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {isEditing && (
          <View style={styles.editingActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingHorizontal: 12, // reduced from 16
    paddingVertical: 10, // reduced from 16
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 2, // reduced
  },
  headerTitle: {
    fontSize: 16, // reduced from 18
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12, // reduced from 16
    paddingVertical: 16, // reduced from 24
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10, // reduced from 16
  },
  avatar: {
    width: 90, // reduced from 120
    height: 90, // reduced from 120
    borderRadius: 45, // reduced from 60
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563eb',
    width: 28, // reduced from 32
    height: 28, // reduced from 32
    borderRadius: 14, // reduced from 16
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, // reduced from 3
    borderColor: '#ffffff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20, // reduced from 24
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 6, // reduced from 8
  },
  headline: {
    fontSize: 13, // reduced from 16
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 6, // reduced from 8
    lineHeight: 18, // reduced from 22
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 4,
  },
  editingContainer: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 10, // reduced from 16
  },
  fieldLabel: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 2, // reduced from 4
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 10, // reduced from 12
    paddingVertical: 6, // reduced from 8
    fontSize: 13, // reduced from 15
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  multilineInput: {
    height: 60, // reduced from 80
    textAlignVertical: 'top',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 12, // reduced from 20
    marginBottom: 6, // reduced from 8
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16, // reduced from 20
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 10, // reduced from 12
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2, // reduced from 4
  },
  section: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12, // reduced from 16
    paddingVertical: 14, // reduced from 20
    marginBottom: 6, // reduced from 8
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // reduced from 16
  },
  sectionTitle: {
    fontSize: 15, // reduced from 18
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  addButton: {
    padding: 2, // reduced from 4
  },
  aboutText: {
    fontSize: 13, // reduced from 15
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 18, // reduced from 22
  },
  sectionItem: {
    paddingVertical: 8, // reduced from 12
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8, // reduced from 12
    right: 0,
    padding: 2, // reduced from 4
  },
  itemTitle: {
    fontSize: 13, // reduced from 16
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2, // reduced from 4
  },
  itemSubtitle: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 2, // reduced from 4
  },
  itemDuration: {
    fontSize: 11, // reduced from 13
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4, // reduced from 8
  },
  itemDescription: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 16, // reduced from 20
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6, // reduced from 8
  },
  linkText: {
    fontSize: 11, // reduced from 13
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
    marginLeft: 4,
  },
  editingActions: {
    flexDirection: 'row',
    paddingHorizontal: 12, // reduced from 16
    paddingVertical: 12, // reduced from 20
    backgroundColor: '#ffffff',
    marginTop: 6, // reduced from 8
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 8, // reduced from 12
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    marginRight: 6, // reduced from 8
  },
  cancelButtonText: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 8, // reduced from 12
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    marginLeft: 6, // reduced from 8
  },
  saveButtonText: {
    fontSize: 12, // reduced from 14
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});