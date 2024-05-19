import { useState } from "react";

import "./App.css";
// import ReactConfetti from "./components/ReactConfetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const user = {
      name: formData.get("firstName"),
      lastname: formData.get("lastName"),
      birthDate: formData.get("birthDate"),
      tel: formData.get("telNumber"),
    };

    userData.push(user);
    setUserData([...userData]);

    e.target.reset();
    toast.success("New user created!");
  };

  return (
    <div className="app">
      <form className="form-user" onSubmit={handleForm}>
        <label htmlFor="firstName">
          First Name <br />
          <input
            type="text"
            name="firstName"
            required
            placeholder="Dilshodbek"
          />
        </label>
        <label htmlFor="lastName">
          Last Name <br />
          <input type="text" name="lastName" required placeholder="Itolmasov" />
        </label>
        <label htmlFor="birthDate">
          Birth Date <br />
          <input type="date" name="birthDate" required />
        </label>
        <label htmlFor="telNumber">
          Phone Number <br />
          <input
            type="tel"
            name="telNumber"
            required
            placeholder="+998 (93) 571-14-42"
          />
        </label>
        <button type="submit" className="btn-add">
          Add User
        </button>
      </form>

      <div className="InputSearch" onChange={(e) => setSearch(e.target.value)}>
        <input type="search" name="search" id="search" placeholder="Search"
        
        />
      
      </div>

      <table>
        <thead>
          <tr>
            <th> T/r</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th> Birth Date</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {userData
            ?.filter((item) => {
              return search.toLocaleLowerCase() === ""
                ? item
                : item.name.toLocaleLowerCase().includes(search);
            })
            .map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.birthDate}</td>
                <td>{user.tel}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* {confetty && <ReactConfetti />} */}

      <ToastContainer />
    </div>
  );
};

export default App;
