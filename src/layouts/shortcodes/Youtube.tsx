import React from "react";
// import LiteYouTubeEmbed from "react-lite-youtube-embed";
// import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube = ({
  id,
  title,
  ...rest
}: {
  id: string;
  title: string;
  [key: string]: string | number | boolean | undefined;
}) => {
  return (
    <div>
      <h1>Youtube</h1>
    </div>
  );

  //   id,
//   title,
//   ...rest
// }: {
//   id: string;
//   title: string;
//   [key: string]: any;
// }) => {
//   return (
//     <LiteYouTubeEmbed
//       wrapperClass="yt-lite rounded-lg"
//       id={id}
//       title={title}
//       {...rest}
//     />
//   );
};

export default Youtube;
