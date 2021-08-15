import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { USER_TYPE } from './store/UserReducer';
function App() {
  const [userid, setUserid] = useState(0);
  const dispatch = useDispatch();

  const onChangeUserId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const useridFromInput = e.target.value ? Number(e.target.value) : 0;
    console.log("userid", useridFromInput);
    setUserid(useridFromInput);

    const usersResponse = await
      fetch('https://jsonplaceholder.typicode.com/users');

    if (usersResponse.ok) {
      const users = await usersResponse.json();
      console.log("users", users);

      //find the user in array
      const usr = users.find((userItem: any) => {
        return userItem && userItem.id ===
          useridFromInput;
      });
      console.log("usr", usr);

      //dispatching action to update store with user infos
      dispatch({
        type: USER_TYPE,
        payload: {
          id: usr.id,
          username: usr.username,
          email: usr.email,
          city: usr.address.city
        }
      });
    }
  }
  return (
    <div className="App">
      <label>user id</label>
      <input value={userid} onChange={onChangeUserId} />
    </div>
  );
}
export default App;