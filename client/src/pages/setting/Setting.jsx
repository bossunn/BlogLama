import React, { useContext, useState } from "react";
import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Setting() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;

      try {
        await axios.post("/upload", data);
        // setSuccess(true);
      } catch (error) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updateUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>

        <form className="settingForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
              className="settingPPImg"
            />
            <label htmlFor="fileInput">
              <i className="settingPPIcon far fa-user-circle"></i>
            </label>

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="settingSubmit">
            Update
          </button>

          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
