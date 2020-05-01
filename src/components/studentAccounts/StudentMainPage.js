import React from "react";
import { Link } from "react-router-dom";

let imgUrl = "https://s3.amazonaws.com/pennezaudio/new_bg.png";

const StudentMainPage = () => {
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
          <p style={{ display: "inline", fontSize: 40 }}>READY TO </p>
          <p style={{ display: "inline", fontSize: 40, color: "#00b0ff" }}>
            READ
          </p>
        </div>
      </div>

      <div className="col s12" style={{ textAlign: "center" }}>
        <p style={{ fontSize: 24 }}>
          Read into a microphone where your parent or
        </p>
        <p style={{ fontSize: 24 }}>teacher will learn about how you read.</p>
      </div>

      <div className="row" style={{ textAlign: "center" }}>
        <Link
          to="/accounts/test"
          className="waves-effect waves-light btn-large light-blue accent-3 white-text center"
        >
          Let's GO
        </Link>
      </div>

      <div
        className="col s6 offset-s3"
        style={{ textAlign: "center", marginTop: 150 }}
      >
        <img
          src="https://s3.amazonaws.com/pennezaudio/g_order.png"
          alt="pennez"
          width="1000"
        />
      </div>
    </div>
  );
};

export default StudentMainPage;
