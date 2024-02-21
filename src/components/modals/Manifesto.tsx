// ModalComponent.tsx
import React from 'react';
import { Candidate } from '@/models/candidate';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export type ModalProps = {
  candidate: Candidate;
};

const ManifestoModel: React.FC<ModalProps> = ({ candidate }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"
        className='text-sm bg-purple-600 text-white'
        >View Manifesto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
          className='text-2xl font-semibold'
          >
            {candidate.firstName} {candidate.lastName} - {candidate.party}
          </DialogTitle>
            {candidate.manifesto}
        </DialogHeader>
        
        <DialogFooter>
          <DialogDescription>

          Information verified by the Electoral Commission of South Africa
          </DialogDescription>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManifestoModel;
