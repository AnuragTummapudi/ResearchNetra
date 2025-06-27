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
  MapPin,
  Clock,
  DollarSign,
  Star,
  Bookmark,
  Send,
} from 'lucide-react-native';

interface Opportunity {
  id: string;
  title: string;
  institution: string;
  location: string;
  duration: string;
  stipend: string;
  domain: string;
  description: string;
  requirements: string[];
  professor: {
    name: string;
    avatar: string;
  };
  posted: string;
  applicants: number;
  matchScore: number;
  saved: boolean;
}

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);

  const mockOpportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Machine Learning Research Assistant',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      duration: '6 months',
      stipend: '$3,000/month',
      domain: 'Artificial Intelligence',
      description: 'Join our cutting-edge research on neural network optimization and deep learning applications in computer vision.',
      requirements: ['Python', 'TensorFlow/PyTorch', 'Linear Algebra', 'Statistics'],
      professor: {
        name: 'Dr. Emily Rodriguez',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      posted: '2 days ago',
      applicants: 23,
      matchScore: 92,
      saved: false,
    },
    {
      id: '2',
      title: 'Quantum Computing Research Intern',
      institution: 'MIT',
      location: 'Cambridge, MA',
      duration: '4 months',
      stipend: '$4,000/month',
      domain: 'Quantum Physics',
      description: 'Contribute to groundbreaking research in quantum algorithms and quantum error correction.',
      requirements: ['Quantum Mechanics', 'Python', 'Mathematics', 'Physics Background'],
      professor: {
        name: 'Prof. Michael Brown',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      posted: '1 week ago',
      applicants: 45,
      matchScore: 85,
      saved: true,
    },
    {
      id: '3',
      title: 'Biomedical Engineering Research Position',
      institution: 'Harvard Medical School',
      location: 'Boston, MA',
      duration: '8 months',
      stipend: '$3,500/month',
      domain: 'Biomedical Engineering',
      description: 'Research focused on developing novel drug delivery systems using nanotechnology.',
      requirements: ['Bioengineering', 'Chemistry', 'MATLAB', 'Research Experience'],
      professor: {
        name: 'Dr. Sarah Kim',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      posted: '3 days ago',
      applicants: 18,
      matchScore: 78,
      saved: false,
    },
  ];

  const tabs = [
    { id: 'browse', label: 'Browse' },
    { id: 'applied', label: 'Applied' },
    { id: 'saved', label: 'Saved' },
  ];

  const toggleSave = (id: string) => {
    setSavedOpportunities(prev =>
      prev.includes(id)
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id]
    );
  };

  const handleApply = (opportunity: Opportunity) => {
    router.push({
      pathname: '/apply-opportunity',
      params: { 
        opportunityId: opportunity.id,
        title: opportunity.title,
        institution: opportunity.institution
      }
    });
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return '#059669';
    if (score >= 80) return '#2563eb';
    if (score >= 70) return '#ea580c';
    return '#6b7280';
  };

  const filteredOpportunities = mockOpportunities.filter(opportunity =>
    opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Research Opportunities</Text>
        <View style={styles.searchContainer}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            placeholder="Search opportunities..."
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

      {/* Opportunities List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredOpportunities.map((opportunity) => (
          <View key={opportunity.id} style={styles.opportunityCard}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.professorInfo}>
                <Image source={{ uri: opportunity.professor.avatar }} style={styles.professorAvatar} />
                <View>
                  <Text style={styles.professorName}>{opportunity.professor.name}</Text>
                  <Text style={styles.institution}>{opportunity.institution}</Text>
                </View>
              </View>
              <View style={styles.cardActions}>
                <View style={[styles.matchScore, { backgroundColor: getMatchScoreColor(opportunity.matchScore) }]}>
                  <Star size={12} color="#ffffff" fill="#ffffff" />
                  <Text style={styles.matchScoreText}>{opportunity.matchScore}%</Text>
                </View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => toggleSave(opportunity.id)}
                >
                  <Bookmark
                    size={16}
                    color={savedOpportunities.includes(opportunity.id) ? '#2563eb' : '#6b7280'}
                    fill={savedOpportunities.includes(opportunity.id) ? '#2563eb' : 'none'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Content */}
            <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
            <Text style={styles.domain}>{opportunity.domain}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {opportunity.description}
            </Text>

            {/* Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.detailText}>{opportunity.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.detailText}>{opportunity.duration}</Text>
              </View>
              <View style={styles.detailItem}>
                <DollarSign size={14} color="#6b7280" />
                <Text style={styles.detailText}>{opportunity.stipend}</Text>
              </View>
            </View>

            {/* Requirements */}
            <View style={styles.requirementsContainer}>
              {opportunity.requirements.slice(0, 3).map((req, index) => (
                <View key={index} style={styles.requirementTag}>
                  <Text style={styles.requirementText}>{req}</Text>
                </View>
              ))}
              {opportunity.requirements.length > 3 && (
                <Text style={styles.moreRequirements}>+{opportunity.requirements.length - 3} more</Text>
              )}
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>
                {opportunity.applicants} applicants • {opportunity.posted}
              </Text>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => handleApply(opportunity)}
              >
                <Send size={16} color="#ffffff" />
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
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
  opportunityCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  professorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  professorName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  institution: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  matchScoreText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  saveButton: {
    padding: 4,
  },
  opportunityTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
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
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 4,
  },
  requirementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  requirementTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  moreRequirements: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    alignSelf: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  applyButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 6,
  },
});