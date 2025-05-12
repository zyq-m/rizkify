import { router, Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import CustomSplash from "@/components/CustomSplash";
import { getData } from "@/utils/asyncStorage";
import { useUserStore } from "@/store/store";

export default function RootLayout() {
	const [showSplash, setShowSplash] = useState(true);
	const { setEmail } = useUserStore();

	async function loadUser() {
		const userEmail = await getData("email");

		if (userEmail) {
			setEmail(userEmail);
		} else {
			router.replace("/");
		}
	}

	useEffect(() => {
		loadUser();
		setTimeout(() => {
			setShowSplash(false);
		}, 2000);
	}, [showSplash]);

	return (
		<NativeBaseProvider>
			{showSplash ? (
				<CustomSplash />
			) : (
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="index" />
					<Stack.Screen name="signup" />
				</Stack>
			)}
		</NativeBaseProvider>
	);
}
