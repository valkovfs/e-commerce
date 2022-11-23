import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBwEm6W_V1N-636kq3gAfNUe-HjN6yKMPs",
  authDomain: "e-commerce-db-957c9.firebaseapp.com",
  projectId: "e-commerce-db-957c9",
  storageBucket: "e-commerce-db-957c9.appspot.com",
  messagingSenderId: "984447147494",
  appId: "1:984447147494:web:c72ccf4322b69355db4a27"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const sighInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.field.toLowerCase())
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = await collection(db, 'categories');
  const q = await query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
};
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = await doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    };
    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return
  };
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth)
      },
      reject
    )
  })
}