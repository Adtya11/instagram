import { firebaseApp, FieldValue } from '../lib/firebase';

export async function doesUsernameExists(username: string) {
    const result = await firebaseApp.firestore().collection('users').where('username', '==', username).get();
    return result.docs.map((user) => user.data().length > 0);
}

export async function doesEmailAddressExists(emailAddress: string) {
    const result = await firebaseApp.firestore().collection('users').where('emailAddress', '==', emailAddress).get();
    return result.docs.map((email) => email.data().length > 0);
}