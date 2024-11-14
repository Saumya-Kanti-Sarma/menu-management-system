import React from 'react';
function NotFound() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw"
        }}
      >
        <h1 style={{ fontSize: "50px" }}>Ommitus.com/not-found-page</h1> <br />

        <h1 style={{ fontSize: "20px" }}>Hello Explorer!</h1>
        <h2 style={{ fontSize: "20px" }}>It looks like you have lost your path...</h2> <br />

        <h2>404 - Page Not Found</h2>
        <a href="/">Return Home</a>
      </div>
    </>
  );
}

export default NotFound;
