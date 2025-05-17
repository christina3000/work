// import React, { useEffect, useState } from 'react';

// function Posts() {
//   const [posts, setPosts] = useState([]);
//   const [form, setForm] = useState({ title: '', content: '' }); // ✅ Added form state

//   useEffect(() => {
//     fetch('http://localhost:5000/api/posts')
//       .then(res => res.json())
//       .then(data => setPosts(data));
//   }, []);

//   const handleCreate = async () => {
//     const response = await fetch('http://localhost:5000/api/posts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(form)
//     });

//     const newPost = await response.json();
//     setPosts([...posts, newPost]); // Add new post to the list
//     setForm({ title: '', content: '' }); // Clear form after submission
//   };

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:5000/api/posts/${id}`, {
//       method: 'DELETE',
//     });
//     setPosts(prev => prev.filter(post => post._id !== id));
//   };

//   const handleUpdate = (id) => {
//     alert(`Update post with ID: ${id}`);
//   };

//   return (
//     <div className="container">
//       <h1>Posts</h1>

//       <input
//         placeholder="Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />
//       <input
//         placeholder="Content"
//         value={form.content}
//         onChange={(e) => setForm({ ...form, content: e.target.value })}
//       />
//       <button onClick={handleCreate}>Add Post</button>

//       <h2>All Posts</h2>
//       {posts.map(post => (
//         <div key={post._id}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//           <button onClick={() => handleUpdate(post._id)}>Update</button>
//           <button onClick={() => handleDelete(post._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Posts;


import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null); // Track editing state

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const handleCreateOrUpdate = async () => {
    if (!form.title || !form.content) return alert("Title and content are required.");

    if (editId) {
      // UPDATE
      const res = await fetch(`http://localhost:5000/api/posts/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const updatedPost = await res.json();
      setPosts(prev =>
        prev.map(post => (post._id === updatedPost._id ? updatedPost : post))
      );
      setEditId(null);
    } else {
      // CREATE
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const newPost = await res.json();
      setPosts([...posts, newPost]);
    }

    setForm({ title: '', content: '' }); // Reset form
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, content: post.content });
    setEditId(post._id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
    });
    setPosts(prev => prev.filter(post => post._id !== id));
  };

  return (
    <div className="container">
      <h1>{editId ? 'Edit Post' : 'Create Post'}</h1>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button onClick={handleCreateOrUpdate}>
        {editId ? 'Update Post' : 'Add Post'}
      </button>

      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleEdit(post)}>Edit</button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Posts;

