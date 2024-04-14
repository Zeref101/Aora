import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import { icons } from "../constants";
import { StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  return (
    <View
      style={[isFocused ? styles.focused : styles.unfocused]}
      className={`w-full h-16 px-4 bg-black-100 border border-indigo-50  rounded-2xl  flex-row items-center`}
    >
      <TextInput
        className=" text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e) => setQuery(e)}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      <TouchableOpacity
        className=""
        onPress={() => {
          if (query === "") {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          className=" w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  focused: {
    borderColor: "#FF9C01",
  },
  unfocused: {
    borderColor: "#232533",
  },
});
