import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = nanoid();
    let payload = { ...form, id };
    userData.push(payload);
    setForm([...userData]);
    event.target.reset();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const deleteUser = (id) => {
    const new_user = userData.filter((item) => item.id !== id);
    setUserData([...new_user]);
  };

  return (
    <div className="app">
      <form className="form-user" onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name <br />
          <input
            type="text"
            name="firstName"
            required
            placeholder="Dilshodbek"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="lastName">
          Last Name <br />
          <input
            type="text"
            name="lastName"
            required
            placeholder="Itolmasov"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="birthDate">
          Age
          <br />
          <input
            type="text"
            name="birthDate"
            placeholder="20"
            className="ageInput"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="telNumber">
          Phone Number <br />
          <input
            type="tel"
            name="telNumber"
            required
            placeholder="+998 (93) 571-14-42"
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn-add">
          Add User
        </button>
      </form>

      <div className="InputSearch" onChange={(e) => setSearch(e.target.value)}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </div>

      <table>
        <thead>
          <tr>
            <th> T/r</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th> Age</th>
            <th>Phone Number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData
            ?.filter((item) => {
              return search.toLocaleLowerCase() === ""
                ? item
                : item.firstName.toLocaleLowerCase().includes(search) ||
                    item.lastName.toLocaleLowerCase().includes(search);
            })
            .map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{+user.birthDate}</td>
                <td>{user.telNumber}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    <MdDelete className="delete-icon" />
                  </button>
                </td>
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
