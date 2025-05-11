import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function AboutUs() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.paragraph}>
          Welcome to our app! We are dedicated to providing the best experience
          possible.
        </Text>

        <Text style={styles.subHeader}>Our Mission</Text>
        <Text style={styles.paragraph}>
          Our mission is to empower users by delivering high-quality,
          user-friendly applications that make life easier and more enjoyable.
        </Text>

        <Text style={styles.subHeader}>Our Team</Text>
        <Text style={styles.paragraph}>
          We are a passionate group of developers, designers, and product
          managers who work together to create innovative solutions.
        </Text>

        <Text style={styles.subHeader}>Contact Us</Text>
        <Text style={styles.paragraph}>
          Have questions or feedback? Reach out to us.
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
