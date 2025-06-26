"use client";

import { useState, useEffect } from "react";
import { editNote } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const EditFormModal = ({ note }) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      await editNote(note._id, { title, content, username });
      toast.success("Note updated!");
      setOpen(false);
    } catch (err) {
      toast.error("Failed to update note");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded space-y-2 w-[90%] md:w-[400px]"
          >
            <h3 className="text-lg font-bold">Edit Note</h3>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending} className="bg-green-600 hover:bg-green-700">
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
