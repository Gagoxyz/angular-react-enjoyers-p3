
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const getPlayers = async () => {
    try {
        const documentData = await getDocs(collection(db, "players"));

        const players = [];
        documentData.forEach(doc => {
            players.push({id: doc.id, ...doc.data() });
        });

        return players;
    } catch (error) {
        console.error("Error al obtener los jugadores: ", error);
        return [];
    }
};

import { doc, getDoc } from 'firebase/firestore';

export const getPlayerById = async (id) => {
    try {
        const docRef = doc(db, 'players', id);
        const snap = await getDoc(docRef);
        if (snap.exists()) return { id: snap.id, ...snap.data() };
        return null;
    } catch (error) {
        console.error('Error al obtener jugador por id:', error);
        return null;
    }
};