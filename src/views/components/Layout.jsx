import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-blue bg-info">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              MyApp
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/events">
                    Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Environment">
                    Environment{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Plant">
                    Plant{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Store">
                    Store{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Seed">
                    Seed{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Jardin">
                    Jardin{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Blog ">
                    Blog{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Review">
                    Review{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mt-3">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
