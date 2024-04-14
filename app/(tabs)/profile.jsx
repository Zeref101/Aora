import { useEffect } from "react";
import { router } from "expo-router";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, searchPosts, signOut } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";
import { images } from "../../constants";
import { icons } from "../../constants";
import { Text } from "react-native";
import CustomButton from "../../components/CustomButton";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    router.replace("/sign-in");
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
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
              No videos found for this profile
            </Text>
            <CustomButton
              title={"Create video"}
              handlePress={() => router.push("/create")}
              containerStyles={"w-full my-5"}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
