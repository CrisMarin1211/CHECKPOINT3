import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Song } from '../types/Song';

const firebaseConfig = {
  apiKey: "AIzaSyD-zkvKD8yeHyWOKP7e3IKdH3qGGJJdu0c",
  authDomain: "checkpoint3-93ada.firebaseapp.com",
  projectId: "checkpoint3-93ada",
  storageBucket: "checkpoint3-93ada.appspot.com",
  messagingSenderId: "88249134342",
  appId: "1:88249134342:web:9af8620d2d370c4efd4287"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const songDocuments = collection(db, 'songs');

export const addSongs = async (song: Song) => {
	try {
		await addDoc(songDocuments, song);
		console.log('Se añadió');
	} catch (error) {
		console.error(error);
	}
};

export const getSongs = async () => {
	const querySnapshot = await getDocs(songDocuments);
	const songs: Song[] = [];

	querySnapshot.docs.forEach((doc) => {
		const data: Omit<Song, 'id'> = doc.data() as any;
		const songData = doc.data() as Song;
		songs.push(songData);
	});
	console.log(songs);
	return songs;
};