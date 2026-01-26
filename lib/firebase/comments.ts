// Comments CRUD operations

import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Comment } from '@/types';

const COMMENTS_COLLECTION = 'comments';

/**
 * Add a comment to a project
 */
export const addComment = async (
  projectId: string,
  userName: string,
  text: string,
  userEmail?: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
      projectId,
      userName,
      userEmail,
      text,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

/**
 * Get comments for a project
 */
export const getCommentsByProject = async (projectId: string): Promise<Comment[]> => {
  try {
    const q = query(
      collection(db, COMMENTS_COLLECTION),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const comments: Comment[] = [];
    
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data(),
      } as Comment);
    });
    
    return comments;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

/**
 * Delete a comment (admin only)
 */
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    const docRef = doc(db, COMMENTS_COLLECTION, commentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

/**
 * Get total comment count for a project
 */
export const getCommentCount = async (projectId: string): Promise<number> => {
  try {
    const comments = await getCommentsByProject(projectId);
    return comments.length;
  } catch (error) {
    console.error('Error getting comment count:', error);
    return 0;
  }
};
