import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function AboutUs() {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>About Us</Text>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
			>
				<Text style={styles.paragraph}>
					Rizkify is a digital platform designed to reduce food waste by
					connecting individuals and organisations with surplus food to those
					who need it — safely, quickly, and responsibly.
				</Text>

				<Text style={styles.paragraph}>
					Originally developed at Universiti Sultan Zainal Abidin (UniSZA), this
					app aims to create a sustainable food-sharing ecosystem that empowers
					communities, promotes responsible consumption, and supports those
					facing food insecurity.
				</Text>

				<Text style={styles.paragraph}>
					We believe that even small acts — like sharing extra food — can create
					lasting impact.
				</Text>

				<Text style={styles.paragraph}>
					Whether you're a student, a staff member, a vendor, or a community
					volunteer,Rizkify gives you the tools to donate, receive, and make a
					difference.
				</Text>

				<Text style={styles.subHeader}>🌱 Our Mission</Text>
				<Text style={styles.paragraph}>
					To reduce avoidable food waste through technology, community
					collaboration, and the power of sharing.
				</Text>

				<Text style={styles.subHeader}>🤝 Our Values</Text>
				<Text style={styles.paragraph}>Sustainability</Text>
				<Text style={styles.paragraph}>Empathy</Text>
				<Text style={styles.paragraph}>Inclusivity</Text>
				<Text style={styles.paragraph}>Action over waste</Text>

				<Text style={styles.subHeader}>📲 Get Involved</Text>
				<Text style={styles.paragraph}>
					Use Rizkify to list or request surplus food. Every meal shared is a
					step toward a more caring, sustainable world.
				</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 12,
		textAlign: "center",
	},
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	subHeader: {
		fontSize: 20,
		fontWeight: "600",
		marginTop: 16,
		marginBottom: 6,
	},
	paragraph: {
		fontSize: 16,
		lineHeight: 22,
		color: "#333",
		marginBottom: 16,
	},
});
