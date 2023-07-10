import React, { useState } from "react";
import NavBar from "../Navbar/NavBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import "./upload.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [boder, setBorder] = useState("border-primary");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const reDirect = useNavigate();

  /* drag and drop space */
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files[0];
    setBorder("border-success");
    setFile(files);
    // console.log(files);
  };

  /* input space */
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const fileInputChange = (event) => {
    const files = event.target.files[0];
    setBorder("border-success");
    setFile(files);
    // console.log(files);
  };

  /* submit space */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBorder("border-primary");

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("title", title);

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/upload", formData, config);
    // console.log(res);
    if (res.status !== 201) {
      console.log(res);
    } else {
      toast.success("Data added successfully", {
        position: "top-right",
      });
      reDirect("/");
      setTitle("");
      setFile(null);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h1 className="text-center">Upload Your Image Here</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <>
              <div
                className={`drop-container ${boder}`}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
              >
                <div className="drop-message">
                  <label
                    htmlFor="fileInputButton"
                    className="file-input-button"
                  >
                    <input
                      id="fileInputButton"
                      name="photo"
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={fileInputChange}
                    />
                    <div className="upload-icon"></div>
                    Drag & Drop files here or click to upload
                  </label>

                  {file ? <h6>{file.name}</h6> : " "}
                </div>
              </div>
            </>
          </Form.Group>

          <Button variant="primary" type="reset">
            Clear
          </Button>
          {"  "}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Upload;
