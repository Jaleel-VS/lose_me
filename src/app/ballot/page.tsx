
"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Confirmation from '@/components/modals/Confirmation';
import { useRouter } from 'next/navigation';
import database from '@/util/database';
import { Vote } from '@/models/vote';
import { UUID } from 'crypto';
import { auth } from '@/util/firebase';
import { Voter } from '@/models/voter';
import { HOME_ROUTE } from '@/constants/routes';
import candidates from '@/constants/candidates';
import { getCurrentUser, logout } from '../_auth/auth-handler';
import { ReloadIcon } from '@radix-ui/react-icons';
import { User } from 'firebase/auth';



// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");
  const [voter, setVoter] = useState<any>();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        const userID = user.uid;
        ``
        const promisedVoter: Promise<Voter | undefined> = database.getVoter(userID);

        const allVotes = database.getVotes();

        allVotes.then((votes) => {
          votes.forEach((vote) => {
            if (vote.voter.user_id === userID) {
              // Perform your action here for the matching vote
              alert("You've already voted!")
              router.push("/");
            }
            // Add more code here if needed for non-matching votes
          });
        });



        promisedVoter.then((voter) => {
          if (voter) {
            setVoter(voter);
          }
        });


      }
    });
  }
    , []);

  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };

  const handleSubmit = async () => {
    const selectedCandidateIndex = candidates.findIndex(candidate => candidate.id === checkedId);
    let realIndex = selectedCandidateIndex - 1;

    if (realIndex < 0) {
      realIndex = 0;
    } else {
      realIndex += 1;
    }
    console.log(realIndex)
    const thisVoter = voter;
    const vote: Vote = {
      // party id is a string
      party_id: realIndex.toString(),
      voter: thisVoter,
      // get random 6 digit
      vote_id: `v_${Math.floor(100000 + Math.random() * 900000)}`

    }

    try {
      await database.addVote(vote);
      alert("Vote successfully casted!");
      router.push(HOME_ROUTE);
    } catch (error) {
      console.error(error);
    }

  }

  const getProvinceFromCode = (code: string): string => {
    const provinces: { [key: string]: string } = {
      "NC": "Northern Cape",
      "NW": "North West",
      "WC": "Western Cape",
      "FS": "Free State",
      "EC": "Eastern Cape",
      "KZN": "KwaZulu-Natal",
      "MP": "Mpumalanga",
      "LP": "Limpopo",
      "GP": "Gauteng"
    };

    return provinces[code];
  }

    const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);


  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Vote for your favourite candidate</h1>
      {voter ? ( // Check if voter is found
        <div className="flex flex-col items-start gap-4">
          <p
          className='text-xl font-semibold'
          >
            Welcome, {voter.first_name} {voter.last_name} from the {
              getProvinceFromCode(voter.province)
            }.
          </p>
          {/* Map over candidates and render Candidate components */}
          <div className="grid grid-cols-2 gap-4">

          {candidates.map((candidate) => (
            // grid grid-cols-2
            <CandidateItem
              key={candidate.id}
              id={candidate.id}
              label={candidate.firstName}
              checked={checkedId === candidate.id}
              onChange={handleChange}
              candidate={candidate}
            />
          ))}
            </div>

        </div>
      ) : (
        <>
          <ReloadIcon />
          <p>Loading user data...</p>
        </>
      )}

      {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} onSubmit={handleSubmit} />
      )}
    </div>

  )
}
