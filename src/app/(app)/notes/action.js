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

// actions.js

// Fungsi untuk menghapus note
// actions.js

// Function to delete a note
export const deleteNote = async (noteId) => {
  try {
    // Send DELETE request to the API to delete the note by ID
    const res = await fetch(`https://v1.appbackend.io/v1/rows/auD776G0Skgu/${noteId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error("Failed to delete the note");
    }

    // Return result if successful (e.g., response from API)
    return await res.json();
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

// Function to edit a note
export const editNote = async (noteId, updatedData) => {
  try {
    // Send PATCH or PUT request to the API to update the note by ID
    const res = await fetch(`https://v1.appbackend.io/v1/rows/auD776G0Skgu/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed to edit the note");
    }

    // Return result if successful (e.g., response from API)
    return await res.json();
  } catch (error) {
    console.error("Error editing note:", error);
    throw error;
  }
};
