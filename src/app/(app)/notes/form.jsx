"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "boring-avatars";
import { useActionState, useEffect } from "react";
import { createNoteAction } from "./action";
import { toast } from "sonner";
import { deleteAction } from "./action";

export const Form = ({ username }) => {
  const [state, action, pending] = useActionState(createNoteAction, null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
    }
  }, [state]);

  return (
    <form className="space-y-2" action={action}>
      <Input name="title" className="border-[#2F2504]"/>
      <Textarea name="content" className="border-[#2F2504]"/>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar name={username} className="w-6 h-6" variant="beam" />
          <div className="font-medium text-sm">Posted as {username}</div>
        </div>
        <Button className="bg-[#594E36]" disabled={pending}>Add Note</Button>
      </div>
    </form>
  );
};

// export const Delbtn = ({ id }) => {
//   return (
//     <form  action={deleteAction} >
//     <input hidden name="id" readOnly value={id} />
//     <button className="w-fit">Delete</button>
    
//     </form>
//   );
// };


export const Delbtn = ({ id }) => {
  const [state, action, pending] = useActionState(deleteAction, null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message || "Note deleted!");
    }
  }, [state]);

  return (
    <form action={action} key={id}>
      <input hidden name="id" value={id} readOnly />
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        disabled={pending}
        className="bg-red-600 hover:bg-red-700"
      >
        Delete
      </Button>
    </form>
  );
};
