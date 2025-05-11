import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function TermsCondition() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Terms & Conditions</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.paragraph}>
          Welcome to our app! Please read these Terms & Conditions carefully
          before using our services.
        </Text>

        <Text style={styles.subHeader}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using this app, you agree to be bound by these Terms
          & Conditions and all applicable laws and regulations.
        </Text>

        <Text style={styles.subHeader}>2. Use License</Text>
        <Text style={styles.paragraph}>
          Permission is granted to temporarily download one copy of the
          materials for personal, non-commercial transitory viewing only.
        </Text>

        <Text style={styles.subHeader}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You agree not to misuse the app or help anyone else do so. This
          includes but is not limited to hacking, transmitting viruses, or
          infringing on others' rights.
        </Text>

        <Text style={styles.subHeader}>4. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          In no event shall we be liable for any damages arising out of the use
          or inability to use the app.
        </Text>

        <Text style={styles.subHeader}>5. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms at any time. Your continued
          use of the app constitutes acceptance of those changes.
        </Text>

        <Text style={styles.paragraph}>
          If you have any questions about these Terms & Conditions, please
          contact us.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});
