import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/config";

export const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ajusta la colección y orden si en Firestore usas otro nombre/orden
    const q = query(collection(db, "players"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setPlayers(list);
      setLoading(false);
    }, (error) => {
      console.error("Players onSnapshot error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPlayer = async (player) => {
    try {
      await addDoc(collection(db, "players"), player);
    } catch (err) {
      console.error("addPlayer error:", err);
      throw err;
    }
  };

  const updatePlayer = async (id, data) => {
    try {
      const ref = doc(db, "players", id);
      await updateDoc(ref, data);
    } catch (err) {
      console.error("updatePlayer error:", err);
      throw err;
    }
  };

  const deletePlayer = async (id) => {
    try {
      await deleteDoc(doc(db, "players", id));
    } catch (err) {
      console.error("deletePlayer error:", err);
      throw err;
    }
  };

  return (
    <PlayersContext.Provider value={{
      players,
      loading,
      addPlayer,
      updatePlayer,
      deletePlayer
    }}>
      {children}
    </PlayersContext.Provider>
  );
}