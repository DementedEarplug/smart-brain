import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const submit = (e) => {
    e.preventDefault();
    onButtonSubmit();
  };

  return (
    <div>
      <p className='f3'>
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className='center'>
        <form onSubmit={submit}>
          <div className='form center pa4 br3 shadow-5'>
            <input
              className='f4 pa2 w-70 center'
              type='tex'
              onChange={onInputChange}
            />
            <input
              className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
              type='submit'
              value='Detect'
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
