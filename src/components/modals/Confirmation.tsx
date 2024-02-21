import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '../ui/dialog'
import { ModalProps } from './Manifesto'




const Confirmation: React.FC<ModalProps & { onSubmit: () => void }> = ({ candidate, onSubmit, }) => {
  const handleConfirmVote = () => {
    onSubmit(); // Invoke the onSubmit callback passed from the parent
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Vote Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
            className='text-2xl font-semibold'
          >
            Vote confirmation
          </DialogTitle>
          <p>
            You are about to vote for {candidate.firstName} {candidate.lastName} of the {candidate.party} party. Are you sure you want to proceed?
          </p>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleConfirmVote}>Yes, I am sure
          
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Confirmation