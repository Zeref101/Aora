import { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButtom from "../../components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
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
              Log in to Aora
            </Text>
          </View>
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
            title={"Sign In"}
            handlePress={submit}
            containerStyles={"mt-7 w-full"}
            isLoading={isSubmitting}
          />
          <View className=" mt-4 flex flex-col justify-center items-center">
            <Text className=" font-pregular text-gray-100">
              Don't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
