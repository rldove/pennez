const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("/api/*", { target: "http://localhost:5000" }));

  app.use(proxy("/api/surveys/thanks", { target: "http://localhost:5000" }));
  app.use(proxy("/api/surveys/list", { target: "http://localhost:5000" }));

  app.use(proxy("/api/accounts/parents", { target: "http://localhost:5000" }));
  app.use(proxy("/api/accounts/teachers", { target: "http://localhost:5000" }));
  app.use(
    proxy("/api/accounts/parentprofile", { target: "http://localhost:5000" })
  );
  app.use(
    proxy("/api/accounts/teacherprofile", { target: "http://localhost:5000" })
  );

  app.use(proxy("/api/parent/login", { target: "http://localhost:5000" }));
  app.use(proxy("/api/teacher/login", { target: "http://localhost:5000" }));
  app.use(proxy("/api/student/login", { target: "http://localhost:5000" }));

  app.use(proxy("/api/students/list", { target: "http://localhost:5000" }));
  app.use(proxy("/api/students/voice", { target: "http://localhost:5000" }));
  app.use(proxy("/api/students/source", { target: "http://localhost:5000" }));
  app.use(proxy("/api/student/profile", { target: "http://localhost:5000" }));

  app.use(
    proxy("/api/aws/transcribe/new", { target: "http://localhost:5000" })
  );
  app.use(
    proxy("/api/aws/transcribe/status", { target: "http://localhost:5000" })
  );
  app.use(
    proxy("/api/aws/transcribe/results", { target: "http://localhost:5000" })
  );

  app.use(
    proxy("/api/readingsources/upload", { target: "http://localhost:5000" })
  );
  app.use(proxy("/api/admin/voiceall", { target: "http://localhost:5000" }));
  app.use(
    proxy("/api/students/voice/comment", { target: "http://localhost:5000" })
  );
  app.use(proxy("/parent/studentVoice", { target: "http://localhost:5000" }));
  app.use(
    proxy("/api/students/profile/edit", { target: "http://localhost:5000" })
  );
  app.use(
    proxy("/api/parents/profile/edit", { target: "http://localhost:5000" })
  );
  app.use(
    proxy("/api/teachers/profile/edit", { target: "http://localhost:5000" })
  );
};
