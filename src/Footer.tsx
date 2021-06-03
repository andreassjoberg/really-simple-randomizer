const Footer = () => {
  return (
    <footer className="navbar fixed-bottom bg-dark text-light justify-content-center py-2">
      <div className="row">
        <div className="col-12">
          <a
            href="https://www.andreassjoberg.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andreas Sjöberg
        </a>
          <span className="mx-1">with</span>
          <a
            href="https://github.com/andreassjoberg/really-simple-randomizer/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
          >
            contributors
        </a>
        &nbsp;[
        <a
            href="https://github.com/andreassjoberg/really-simple-randomizer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
        </a>
        ]
        <small className="align-self-center ml-1">1.2</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
