import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import moment from "moment";
import { Delbtn, Form } from "./form";
import { getUsername } from "@/utils/getUsername";
import { Butterfly_Kids } from "next/font/google";
import Link from "next/link";

export default async function Page() {
  const username = await getUsername();
  const res = await fetch(`https://v1.appbackend.io/v1/rows/auD776G0Skgu/?filterKey=username&filterValue=${username}`);
  const { data: notes } = await res.json();

  // Handle delete
  const handleDelete = async (noteId) => {
    try {
      const result = await deleteNote(noteId);  // Call delete action
      alert(`Note with ID: ${noteId} has been deleted`);
      // Update the UI or state after delete
    } catch (error) {
      alert("Failed to delete note");
    }
  };

  // Handle edit
  const handleEdit = async (noteId, updatedData) => {
    try {
      const result = await editNote(noteId, updatedData);  // Call edit action
      alert(`Note with ID: ${noteId} has been edited`);
      // Update the UI or state after edit
    } catch (error) {
      alert("Failed to edit note");
    }
  };

  return (
    <div className="space-y-4 py-8">
      <h3 className="text-lg font-bold text-center">All Notes</h3>
      <Form username={username} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => {
          return (
            <Card key={note._id} className="bg-[#A5AE9E] border-[#2F2504] ">
              
              <CardContent className="space-y-2  ">
                <h3 className="text-lg font-medium">{note.title}</h3>
                <p className="text-sm">{note.content}</p>
               
                <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-[#2F2504]">{moment(note.createdAt).format("MMM Do, YYYY")}</p>
                  <div className="space-x-2">
               <Link href={'/notes/${note.id}'}>View</Link>
               <Link href={'/notes/${note.id}'}>Edit</Link>
               <Link href={'/notes/${note.id}'}>Delete</Link>
              <Delbtn id={note._id} />
                </div>
                </div>
              </CardContent>
            
            </Card>
          );
        })}
      </div>
    </div>
  );
}
