import React from "react";

const TitleHeader = () => {
  return (
    <>
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            25% { background-position: 50% 100%; }
            50% { background-position: 100% 50%; }
            75% { background-position: 50% 0%; }
            100% { background-position: 0% 50%; }
          }

          .title-gradient {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(
              135deg,
              #006400,
              #228B22,
              #32CD32,
              #90EE90,
              #00FF7F,
              #3CB371,
              #2E8B57,
              #7CFC00,
              #ADFF2F,
              #98FB98
            );
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            opacity: 0.8;
            animation: gradientBG 15s ease infinite;
            transition: opacity 0.3s;
          }

          .title-gradient:hover {
            opacity: 1;
          }
        `}
      </style>

      <div className="flex justify-center items-center p-4">
        <h1 className="text-5xl font-extrabold text-center title-gradient">
          Virtual Herbal Garden
        </h1>
      </div>
    </>
  );
};

export default TitleHeader;
