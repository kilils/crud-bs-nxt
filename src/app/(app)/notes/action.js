"use server";

import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";

export async function createNoteAction(_, formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const username = await getUsername();

  await fetch("https://v1.appbackend.io/v1/rows/auD776G0Skgu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ title, content, username }]),
  });

  revalidatePath("/notes");

  return {
    status: "success",
    message: "Note has been added!",
  };
}




// Function to delete a note
export async function deleteAction(_, formData) {
  const noteId = formData.get("id");
  console.log("Deleting ID:", noteId);

  const response = await fetch("https://v1.appbackend.io/v1/rows/auD776G0Skgu", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([noteId]),
  });

  if (!response.ok) {
    throw new Error("Failed to delete");
  }

  revalidatePath("/notes");

  return { status: "success", message: "Note deleted!" };
}

export const editNote = async (noteId, updatedData) => {
  const payload = {
    _id: noteId,
    ...updatedData,
  };
console.log("RESPONSE:", noteId);
  const res = await fetch("https://v1.appbackend.io/v1/rows/auD776G0Skgu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([payload]), // ❗ bentuk array!
  });

  const responseText = await res.text();
  console.log("RESPONSE:", responseText);

  if (!res.ok) {
    throw new Error("Failed to edit the note");
  }

  revalidatePath("/notes");
  return JSON.parse(responseText);
};


export async function editNoteAction(formData) {
  const _id = formData.get("_id");
  const title = formData.get("title");
  const content = formData.get("content");
  const username = formData.get("username");

  const payload = {
    _id,
    title,
    content,
    username,
  };

  //console.log("EDIT PAYLOAD:", payload);

  const res = await fetch("https://v1.appbackend.io/v1/rows/auD776G0Skgu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), 
  });

  const responseText = await res.text();
  // console.log("RESPONSE:", responseText);

  if (!res.ok) {
    throw new Error("Failed to update note");
  }

  revalidatePath("/notes");

  return { status: "success", message: "Note updated!" };
}

