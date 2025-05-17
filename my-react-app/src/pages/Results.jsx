import { useEffect, useState } from 'react';

function Results() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({ candidateName: '', email: '', score: 0 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await fetch('http://localhost:5000/api/results');
    const data = await res.json();
    setResults(data);
  };

  const handleCreateOrUpdate = async () => {
    if (!form.candidateName || !form.email || isNaN(form.score)) {
      return alert('Please fill in all fields.');
    }

    if (editId) {
      // UPDATE
      const res = await fetch(`http://localhost:5000/api/results/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setResults(results.map(r => (r._id === editId ? updated : r)));
      setEditId(null);
    } else {
      // CREATE
      const res = await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const newResult = await res.json();
      setResults([newResult, ...results]);
    }

    setForm({ candidateName: '', email: '', score: 0 });
  };

  const handleEdit = (result) => {
    setForm({
      candidateName: result.candidateName,
      email: result.email,
      score: result.score,
    });
    setEditId(result._id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/results/${id}`, { method: 'DELETE' });
    setResults(results.filter(r => r._id !== id));
  };

  return (
    <div>
      <h2>{editId ? 'Edit Result' : 'Add Result'}</h2>

      <input
        placeholder="Candidate Name"
        value={form.candidateName}
        onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="number"
        placeholder="Score"
        value={form.score}
        onChange={(e) => setForm({ ...form, score: parseInt(e.target.value) || 0 })}
      />
      <button onClick={handleCreateOrUpdate}>
        {editId ? 'Update Result' : 'Add Result'}
      </button>

      {results.map(r => (
        <div key={r._id}>
          <p>{r.candidateName} - {r.score} ({r.status})</p>
          <button onClick={() => handleEdit(r)}>Edit</button>
          <button onClick={() => handleDelete(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Results;
