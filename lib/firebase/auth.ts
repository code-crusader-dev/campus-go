"use client";

import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "./config";
import { User } from "@/types";

const getAdminEmails = (): string[] => {
  const emails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  return emails
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
};

export const isAdminEmail = (email: string): boolean => {
  return getAdminEmails().includes(email);
};

export const signInWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, googleProvider);
  const firebaseUser = result.user;

  const userRef = doc(db, "users", firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  const isAdmin = isAdminEmail(firebaseUser.email || "");

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: firebaseUser.email || "",
      displayName: firebaseUser.displayName || "Anonymous",
      photoURL: firebaseUser.photoURL || "",
      isAdmin,
      createdAt: serverTimestamp(),
    });
  } else if (userSnap.data().isAdmin !== isAdmin) {
    await setDoc(userRef, { isAdmin }, { merge: true });
  }

  const updatedSnap = await getDoc(userRef);

  return {
    id: firebaseUser.uid,
    ...updatedSnap.data(),
  } as User;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const getCurrentUserData = async (
  uid: string
): Promise<User | null> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  return {
    id: uid,
    ...userSnap.data(),
  } as User;
};

export const onAuthStateChange = (
  callback: (user: FirebaseUser | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};
