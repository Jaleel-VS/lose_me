/*

This class handles all database operations. 
It is a singleton class, meaning that only one instance of this class can be created.
 This is to ensure that only one connection to the database is made and 
 that all database operations are handled by the same instance of the class.
 */



import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, query, where, addDoc, setDoc } from "firebase/firestore";
import { Vote } from "@/models/vote";
import { Voter } from "@/models/voter";


// Singleton class to handle all database operations
class Database {
    private static instance: Database;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }


    async addVoter(voter: Voter): Promise<void> {
        const voterRef = doc(collection(db, 'voters'), voter.user_id);
        console.log('voterRef', voterRef);

        try {
            await setDoc(voterRef, voter);
            console.log('Voter document added successfully!');
        } catch (error) {
            console.error('Error adding voter document: ', error);
            throw error;
        }
    }

    async getVoter(voterId: string): Promise<Voter | undefined> {
        const voterRef = doc(collection(db, 'voters'), voterId);

        try {
            const voterDoc = await getDoc(voterRef);
            if (voterDoc.exists()) {
                return voterDoc.data() as Voter;
            } else {
                console.log('No such document!');
                return undefined;
            }
        } catch (error) {
            console.error('Error getting voter document: ', error);
            throw error;
        }
    }


    async addVote(vote: Vote): Promise<void> {
        try {
            const voteRef = await addDoc(collection(db, 'votes'), vote);
            console.log('Vote document added with ID: ', voteRef.id);
        } catch (error) {
            console.error('Error adding vote document: ', error);
            throw error;
        }
    }


    async getVotes(): Promise<Vote[]> {
        const votes: Vote[] = [];
        const votesRef = collection(db, 'votes');
        const votesSnapshot = await getDocs(votesRef);
        votesSnapshot.forEach((doc) => {
            votes.push(doc.data() as Vote);
        });
        return votes;
    }


    async getVoterByEmail(email: string): Promise<Voter | undefined> {
        const votersRef = collection(db, 'voters');
        const q = query(votersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            return querySnapshot.docs[0].data() as Voter;
        }
        return undefined;
    }


    async getVoters(): Promise<Voter[]> {
        const voters: Voter[] = [];
        const votersRef = collection(db, 'voters');
        const votersSnapshot = await getDocs(votersRef);
        votersSnapshot.forEach((doc) => {
            voters.push(doc.data() as Voter);
        });
        return voters;
    }



}

export default Database.getInstance();