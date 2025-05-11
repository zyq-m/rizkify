import {
	Box,
	Button,
	FormControl,
	Input,
	Heading,
	Text,
	VStack,
	HStack,
	Center,
} from "native-base";
import { Link, router } from "expo-router";
import { useUserStore } from "@/store/store";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { setItem } from "expo-secure-store";

import api from "@/utils/axios";
import { socket } from "@/utils/io";

type LoginForm = {
	email?: string;
	password: string;
};

export default function LoginScreen() {
	const { control, handleSubmit, setValue } = useForm<LoginForm>();
	const { email, setAuth, setEmail } = useUserStore();

	const onLogin = handleSubmit(async (data) => {
		try {
			const user = await api.post("/auth/login", data);

			setItem("accessToken", user.data.accessToken);
			setItem("refreshToken", user.data.refreshToken);

			if (data.email) {
				setEmail(data.email);
				setAuth(true); // set true
				socket.emit("register", data.email);
			}

			router.replace("/(sidebar)/(tabs)");
		} catch (error) {
			console.log(error);
		}
	});

	useEffect(() => {
		setValue("email", email);
	}, []);

	return (
		<Center w="100%" h="full" alignItems="center" bg="#FFF8E1">
			<Box safeArea p="2" py="8" w="90%">
				<Heading
					size="lg"
					fontWeight="600"
					color="coolGray.800"
					_dark={{
						color: "warmGray.50",
					}}
				>
					Welcome
				</Heading>
				<Heading
					mt="1"
					_dark={{
						color: "warmGray.200",
					}}
					color="coolGray.600"
					fontWeight="medium"
					size="xs"
				>
					Sign in to continue!
				</Heading>

				<VStack space={3} mt="5">
					<FormControl>
						<FormControl.Label>Email</FormControl.Label>
						<Controller
							name="email"
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input value={value} onChangeText={onChange} onBlur={onBlur} />
							)}
						/>
					</FormControl>
					<FormControl>
						<FormControl.Label>Password</FormControl.Label>
						<Controller
							name="password"
							control={control}
							render={({ field: { value, onBlur, onChange } }) => (
								<Input
									type="password"
									value={value}
									onBlur={onBlur}
									onChangeText={onChange}
								/>
							)}
						/>
						<Link
							href="/signup"
							_text={{
								fontSize: "xs",
								fontWeight: "500",
								color: "indigo.500",
							}}
							alignSelf="flex-end"
							mt="1"
						>
							Forget Password?
						</Link>
					</FormControl>
					<Button mt="2" bg="#EFB255" onPress={onLogin}>
						Sign in
					</Button>
					<HStack mt="6" justifyContent="center">
						<Text
							fontSize="sm"
							color="coolGray.600"
							_dark={{
								color: "warmGray.200",
							}}
						>
							I'm a new user.{" "}
						</Text>
						<Link
							_text={{
								color: "indigo.500",
								fontWeight: "medium",
								fontSize: "sm",
							}}
							href="/signup"
						>
							Sign Up
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Center>
	);
}
