import axios from "axios";

export async function GetFiles() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/list`
    );
    return response.data || [];
  } catch (err) {
    console.error('Error on fetching List Files');
    throw err;
    // throw new Error(JSON.stringify(err.message));
  }
}