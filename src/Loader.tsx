const Loader = ({ isLoading }: { isLoading: boolean }) => {
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
