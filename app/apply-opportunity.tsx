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
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, FileText } from 'lucide-react-native';

export default function ApplyOpportunityPage() {
  const { opportunityId, title, institution } = useLocalSearchParams();
  const [coverLetter, setCoverLetter] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmitApplication = () => {
    if (!coverLetter.trim()) {
      Alert.alert('Error', 'Please write a cover letter for your application.');
      return;
    }

    Alert.alert(
      'Application Submitted',
      `Your application for "${title}" at ${institution} has been submitted successfully!`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
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
        <Text style={styles.headerTitle}>Apply</Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitApplication}>
          <Send size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Opportunity Info */}
        <View style={styles.opportunityInfo}>
          <Text style={styles.opportunityTitle}>{title}</Text>
          <Text style={styles.opportunityInstitution}>{institution}</Text>
        </View>

        {/* Profile Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Profile Summary</Text>
          <Text style={styles.sectionDescription}>
            This information from your profile will be included with your application:
          </Text>
          <View style={styles.profileSummary}>
            <Text style={styles.profileItem}>• Education: PhD in Computer Science (Stanford University)</Text>
            <Text style={styles.profileItem}>• Experience: Research Assistant at Stanford AI Lab</Text>
            <Text style={styles.profileItem}>• Publications: 2 published papers</Text>
            <Text style={styles.profileItem}>• Skills: Python, TensorFlow, Machine Learning</Text>
          </View>
        </View>

        {/* Cover Letter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cover Letter *</Text>
          <Text style={styles.sectionDescription}>
            Explain why you're interested in this opportunity and what you can contribute.
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Dear Professor,

I am writing to express my strong interest in the research position...

Please explain:
• Why you're interested in this specific research area
• Relevant experience and skills you bring
• What you hope to learn and contribute
• Your availability and commitment level"
            multiline
            numberOfLines={12}
            value={coverLetter}
            onChangeText={setCoverLetter}
            placeholderTextColor="#9ca3af"
            textAlignVertical="top"
          />
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <Text style={styles.sectionDescription}>
            Any additional details you'd like to share (optional).
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Additional information, relevant coursework, projects, or other details..."
            multiline
            numberOfLines={6}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholderTextColor="#9ca3af"
            textAlignVertical="top"
          />
        </View>

        {/* Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attachments</Text>
          <TouchableOpacity style={styles.attachmentButton}>
            <FileText size={20} color="#2563eb" />
            <Text style={styles.attachmentButtonText}>Attach Resume/CV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attachmentButton}>
            <FileText size={20} color="#2563eb" />
            <Text style={styles.attachmentButtonText}>Attach Transcript</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitApplicationButton} onPress={handleSubmitApplication}>
          <Send size={20} color="#ffffff" />
          <Text style={styles.submitApplicationButtonText}>Submit Application</Text>
        </TouchableOpacity>
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
  submitButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  opportunityInfo: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  opportunityTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  opportunityInstitution: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  profileSummary: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  profileItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginBottom: 4,
    lineHeight: 20,
  },
  textArea: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 120,
    lineHeight: 22,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 8,
  },
  attachmentButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 8,
  },
  submitApplicationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  submitApplicationButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
});