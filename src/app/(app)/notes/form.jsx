"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "boring-avatars";
import { useActionState, useEffect, useState, useTransition, useRef } from "react";
import { createNoteAction } from "./action";
import { toast } from "sonner";
import { deleteAction } from "./action";
import { editNoteAction } from "./action";

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




export const EditForm = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formData = new FormData(formRef.current);

    startTransition(async () => {
      try {
        await editNoteAction(formData);
        setIsEditing(false); // ✅ setelah sukses, tutup form
        toast.success("Note updated!")
      } catch (err) {
        console.error("Edit failed", err);
      }
    });
  };

  return (
    <>
      {!isEditing && (
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}

      {isEditing && (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-2 mt-2">
          <input type="hidden" name="_id" value={note._id} readOnly />
          <input type="hidden" name="username" value={note.username} readOnly />
          <Input name="title" defaultValue={note.title} className="border-[#2F2504]" />
          <Textarea name="content" defaultValue={note.content} className="border-[#2F2504]" />
          <div className="flex gap-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700" size="sm" disabled={isPending}>
              Save
            </Button>
            <Button type="button" onClick={() => setIsEditing(false)} variant="ghost" size="sm">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </>
  );
};


export const ViewModal = ({ note }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setShow(true)}>
        View
      </Button>

      {show && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded shadow-xl max-w-md w-full relative">
            {/* Close button top-right */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              &times;
            </button>

            {/* Modal content */}
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="text-sm text-gray-600 mb-4">By {note.username}</p>
            <p className="text-base">{note.content}</p>

            {/* Optional: Close button center bottom */}
            <div className="mt-6 flex justify-center">
              <Button variant="ghost" onClick={() => setShow(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
