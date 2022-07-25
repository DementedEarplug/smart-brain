import React, { useState } from "react";

import "./profile.css";

const Profile = ({
  toggleModal,
  loadUser,
  id,
  name,
  entries,
  joined,
  age,
  pet,
}) => {
  const [userName, setUserName] = useState(name);
  const [userAge, setUserAge] = useState(age);
  const [userPet, setUserPet] = useState(pet);

  const onSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/profile/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify({
          name: userName,
          age: userAge,
          pet: userPet,
        }),
      });
      const updatedUser = {
        id,
        name: userName,
        entries,
        joined,
        age: userAge,
        pet: userPet,
      };
      console.log(response);
      console.log(updatedUser);
      if (response.status === 200 || response.status === 304)
        loadUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onUserAgeChange = (e) => {
    setUserAge(e.target.value);
  };

  const onUserPetChange = (e) => {
    setUserPet(e.target.value);
  };

  return (
    <div className='profile-modal'>
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
        <main className='pa4 black-80 w-80'>
          <div className='text-center'>
            <img
              src='http://tachyons.io/img/logo.jpg'
              className='br-100 ba h3 w3 dib'
              alt='avatar'
            />
            <h1>{name || "Place Holderson"}</h1>
            <h4>
              Images submitted: <br /> {entries || 0}
            </h4>
            <p>
              Member Since: <br />{" "}
              {new Date(joined).toLocaleDateString() || "The Begining of Times"}
            </p>
          </div>
          <hr />
          <label className='mt2 fw6' htmlFor='user-name'>
            Name
          </label>
          <input
            className='pa2 ba w-100'
            type='text'
            name='user-name'
            id='user-name'
            placeholder={userName}
            onChange={(e) => onUserNameChange(e)}
          />

          <label className='mt2 fw6' htmlFor='age'>
            Age
          </label>
          <input
            className='pa2 ba w-100'
            type='text'
            name='age'
            id='age'
            placeholder={userAge}
            onChange={(e) => onUserAgeChange(e)}
          />
          <label className='mt2 fw6' htmlFor='pet'>
            Pet
          </label>
          <input
            className='pa2 ba w-100'
            type='text'
            name='pet'
            id='pet'
            placeholder={userPet}
            onChange={(e) => onUserPetChange(e)}
          />
          <div
            className='mt4'
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
              onClick={() => onSave()}
            >
              Save
            </button>
            <button
              className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
              onClick={() => toggleModal()}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className='modal-close' onClick={() => toggleModal()}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
