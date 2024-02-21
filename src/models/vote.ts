import { Voter } from "./voter";

export interface Vote {
  vote_id: string;
  voter: Voter
  party_id: string;
}
