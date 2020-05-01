import React from "react";

let imgUrl = "https://s3.amazonaws.com/pennezaudio/new_bg.png";

const Landing = () => {
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
          height: 700
        }}
      >
        <div>
          <div className="row">
            <div className="col s4 offset-s7">{""}</div>
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
          <p style={{ display: "inline", fontSize: 40 }}>TAKE OUR </p>
          <p style={{ display: "inline", fontSize: 40, color: "#00b0ff" }}>
            ASSESSMENT
          </p>
        </div>
      </div>

      <div className="col s12" style={{ textAlign: "center" }}>
        <p style={{ fontSize: 24 }}>
          Speak into the online quiz, receive feedback on
        </p>
        <p style={{ fontSize: 24 }}>your child's reading skills. Our online</p>
        <p style={{ fontSize: 24 }}>
          assessment will detect fluency and vocabulary
        </p>
        <p style={{ fontSize: 24 }}>
          skills. A baseline reading score will be shared.
        </p>
      </div>
    </div>
  );
};

export default Landing;
