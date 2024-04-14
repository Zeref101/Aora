import { Avatars, Client, Databases } from 'react-native-appwrite';
import { Account } from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';
import { Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.zeref.aora',
    projectId: '661b3d3384887bee251a',
    databaseId: '661b3f1593ce89060231',
    userCollectionId: '661b3f3939c56ab7f98b',
    videoCollectionId: '661b3f5fcafc2191e7c7',
    storageId: '661b41497c9dac8fcca3',

}
// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email, password, username) => {
    console.log(email, password, username);
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        const session = await signIn(email, password);

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                avatar: avatarUrl,
                username: username
            }
        )
        if (newUser) {
            console.log(JSON.stringify(newUser))
        } else {
            console.log("404 not found")
        }

        return newUser;

    } catch (error) {
        throw new Error(error)
    }

}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getCurrentAccount() {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0];
}

export async function getAllPosts() {
    try {

        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,

        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getLatestPosts() {
    try {

        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]

        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
export async function searchPosts(query) {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search("title", query)]
        );

        if (!posts) throw new Error("Something went wrong");

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
export async function getUserPosts(userId) {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("creator", userId)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}