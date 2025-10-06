import { useState, useEffect } from "react";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API}/api/snippets`)
      .then((res) => res.json())
      .then(setSnippets);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/snippets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    setSnippets([data, ...snippets]);
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center" }}>🗒️ SnippetShare</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <input
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={{
            width: "100%",
            height: "80px",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: 4,
            resize: "none",
          }}
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          style={{
            marginTop: "0.5rem",
            width: "100%",
            padding: "0.5rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Save Snippet
        </button>
      </form>

      {snippets.map((s) => (
        <div
          key={s._id}
          style={{
            background: "#f9f9f9",
            border: "1px solid #eee",
            padding: "1rem",
            marginBottom: "0.5rem",
            borderRadius: 6,
          }}
        >
          <h3 style={{ margin: 0 }}>{s.title}</h3>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>{s.content}</pre>
          <a
            href={`${API}/api/snippets/${s.shareId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.85rem", color: "#007bff" }}
          >
            Share Link
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
