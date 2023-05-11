import React, { useState, useEffect } from "react";

interface Issue {
  id: number;
  title: string;
  description: string;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export function App(): JSX.Element {
  const [issues, setIssues] = useState<Issue[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    fetch(`${BASE_URL}`)
      .then((response) => response.json())
      .then((data: Issue[]) => setIssues(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((data: Issue) => setIssues([...issues, data]));
  };

  const handleDelete = (id: number): void => {
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const filteredIssues = issues.filter((issue) => issue.id !== id);
        setIssues(filteredIssues);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (id: number): void => {
    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((data: Issue) => {
        const updatedIssues = issues.map((issue) => {
          if (issue.id === id) {
            return data;
          } else {
            return issue;
          }
        });
        setIssues(updatedIssues);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Issues</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>{" "}
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>{" "}
        <button type="submit">Add Issue</button>
      </form>
      <div className="issues">
        <ul>
          {issues.map((issue) => (
            <li key={issue.id} className="issue">
              {issue.title} - {issue.description}{" "}
              <button className="deleteBtn" onClick={() => handleDelete(issue.id)}>Delete</button>{" "}
              <button className="updateBtn" onClick={() => handleUpdate(issue.id)}>Update</button>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>)
}
