import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAdd = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }

    //post data to server

    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
      })


  }


  return (
    <div className="App">
      <h1>My own data: {users.length} </h1>

      <form onSubmit={handleAdd}>
        <input type="text" name="name" id="" placeholder='Name' required />
        <br />
        <br />
        <input type="text" name="email" id="" placeholder='Email' required />
        <br />
        <br />
        <input type="submit" value="Ass User" />
      </form>


      <ul>
        {
          users.map(user => <li key={user.id}> id: {user.id} name: {user.name} email: {user.email} phone: {user.phone}</li>)
        }
      </ul>

    </div>
  );
}

export default App;
