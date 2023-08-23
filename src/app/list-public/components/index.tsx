'use client'

import { Select } from "@aws-sdk/client-dynamodb";
import axios from "axios";
import { useState } from "react";

export default function FilesPublicList() {
  const [filesData, setFilesData] = useState([]);

  async function handleSearchFiles() {
    const response = await axios.post(
      '/api/files-filter', { year: '2023' }
    );

    setFilesData(response.data)
  }

  return (
    <div>
      <h1>Public Files</h1>
      <button onClick={handleSearchFiles}>Search</button>
      <ul>
        {filesData.map((file: any) => (
          <li key={file.id}>{file.id}</li>
        ))}
      </ul>
    </div>
  )
}
