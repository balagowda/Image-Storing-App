import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [data, setData] = useState("");

  const getData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status == 201) {
      // console.log("data get");
      setData(res.data.data);
    } else {
      console.log("error");
    }
  };

  const deleteData = async (id) => {
    // console.log(id);
    const res = await axios.delete(`/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status == 201) {
      getData();
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-2">
        <h1 className="text-center">Image uploading Website</h1>

        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/upload" className="text-decoration-none text-light">
              {" "}
              Add Image
            </NavLink>
          </Button>
        </div>

        <div className="align-iteams-center mt-5">
          <div className="row d-flex justify-content-around">
            {data.length > 0
              ? data.map((pic, i) => {
                  return (
                    <>
                      <Card
                        style={{ width: "22rem" }}
                        className="mb-3 col-md-4 shadow"
                        key={i}
                      >
                        <Card.Img
                          variant="top"
                          src={`/uploads/${pic.image}`}
                          style={{
                            width: "100%",
                            height: "200px",
                            textAlign: "center",
                            margin: "auto",
                          }}
                          className="mt-2"
                        />
                        <Card.Body className="text-center">
                          <Card.Title>
                            {" "}
                            <strong>{pic.title}</strong>
                          </Card.Title>
                          <Card.Text>
                            <b> Upload Date :</b>{" "}
                            {moment(pic.date).format("DD-MM-YYYY")}
                            <br />
                            <b>Upload Time :</b>{" "}
                            {moment(pic.date).format("hh:mm")}
                          </Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => deleteData(pic.id)}
                            className="col-lg-6 text-center"
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
