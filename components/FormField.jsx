import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { icons } from "../constants";
import { StyleSheet } from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={` space-y-2 ${otherStyles} `}>
      <Text className=" text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        style={[isFocused ? styles.focused : styles.unfocused]}
        className={`w-full h-16 px-4 bg-black-100 border border-indigo-50  rounded-2xl  flex-row items-center`}
      >
        <TextInput
          className=" flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  focused: {
    borderColor: "#FF9C01",
  },
  unfocused: {
    borderColor: "#232533",
  },
});
