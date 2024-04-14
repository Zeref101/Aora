import { useState } from "react";
import { View, Text, Image, TextInput, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButtom from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView bounces contentContainerStyle={{ height: "100.1%" }}>
        <View className=" flex flex-col items-center w-full justify-center h-full px-4 my-6">
          <View className=" w-full flex flex-col justify-start">
            <Image
              source={images.logo}
              resizeMode="contain"
              className=" w-[115px] h-[35px]"
            />
            <Text className=" text-2xl text-white font-semibold mt-10 font-psemibold">
              Sign up to Aora
            </Text>
          </View>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) =>
              setForm({
                ...form,
                username: e,
              })
            }
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
            otherStyles="mt-7"
          />
          <CustomButtom
            title={"Sign Up"}
            handlePress={submit}
            containerStyles={"mt-7 w-full"}
            isLoading={isSubmitting}
          />
          <View className=" mt-4 flex flex-col justify-center items-center">
            <Text className=" font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
