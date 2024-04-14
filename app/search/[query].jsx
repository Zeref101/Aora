import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { EmptyState } from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        key={(item) => item.$id}
        renderItem={({ item }) => {
          console.log(item.creator.username, item.creator.avatar);
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => {
          return (
            <View className=" justify-center items-center px-4 ">
              <Image
                source={images.empty}
                className=" w-[270px] h-[215px]"
                resizeMode="contain"
              />
              <Text className=" text-xl text-center font-psemibold text-white mt-2">
                No Videos Found
              </Text>
              <Text className="font-pmedium text-sm text-gray-100">
                No videos found for this search query
              </Text>
              <CustomButton
                title={"Create video"}
                handlePress={() => router.push("/create")}
                containerStyles={"w-full my-5"}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
