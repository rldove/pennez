import React from "react";
import { Link } from "react-router-dom";

let imgUrl = "https://s3.amazonaws.com/pennezaudio/new_bg.png";

const SupervisorMainPage = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(" + imgUrl + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          rot: 180,
          marginTop: -45,
          height: 800
        }}
      >
        <div>
          <div className="row">
            <div className="col s4 offset-s6">{""}</div>
          </div>
        </div>
      </div>

      <div className="col s12" style={{ textAlign: "center" }}>
        <img
          src="https://s3.amazonaws.com/pennezaudio/Pennez.Logos_final.web-01.png"
          alt="pennez"
          height="120"
          width="120"
        />
        <div>
          <p style={{ display: "inline", fontSize: 40 }}>VIEW STUDENT </p>
          <p style={{ display: "inline", fontSize: 40, color: "#00b0ff" }}>
            SCORES
          </p>
        </div>
      </div>

      <div className="col s12" style={{ textAlign: "center" }}>
        <p style={{ fontSize: 24 }}>
          Listen to your child's reading, comment on
        </p>
        <p style={{ fontSize: 24 }}>
          their reading, and view their fluency score.
        </p>
      </div>

      <div className="row" style={{ textAlign: "center" }}>
        <Link
          to="/studentVoice"
          className="waves-effect waves-light btn-large light-blue accent-3 white-text center"
        >
          VIEW STUDENT DATA
        </Link>
      </div>

      <div className="container">
        <div className="row" style={{ marginTop: 200 }}>
          <div className="col s3" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 24 }}>Listen To A Student </p>
          </div>
          <div className="col s3" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 24 }}>Review Story </p>

            <img
              src="https://s3.amazonaws.com/pennezaudio/page1.png"
              alt="pennez"
              width="300"
            />
          </div>{" "}
          <div className="col s3" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 24 }}>Review Data </p>

            <img
              src="https://s3.amazonaws.com/pennezaudio/page2.png"
              alt="pennez"
              width="300"
            />
          </div>{" "}
          <div className="col s3" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 24 }}>Comment</p>

            <img
              src="https://s3.amazonaws.com/pennezaudio/page3.png"
              alt="pennez"
              width="200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorMainPage;
