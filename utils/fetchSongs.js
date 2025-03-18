import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase/Firebase"; // Ensure correct Firebase import

export const fetchSongs = async () => {
  try {
    const songsCollection = collection(db, "songs");
    const snapshot = await getDocs(songsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading songs: ", error);
    return [];
  }
};
