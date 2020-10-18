import React from "react";
import LoadingImg from "./Loading.svg";
export default function Loading() {
  return (
    <div className="container loading">
      <img src={LoadingImg} alt="loading" width={50} />
    </div>
  );
}
