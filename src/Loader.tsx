import React from "react";

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {
  return isLoading ? (
    <div className="overlay">
      <div className="loader">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : null;
};

export default Loader;
