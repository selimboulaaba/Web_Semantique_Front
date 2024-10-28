import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-blue bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">Ville-Verte</Link>
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
            <div className="collapse navbar-collapse ms-5" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/events">Event</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Environment">Environment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Plant">Plante </Link>
                </li>
                <li className="nav-item">

                  <Link className="nav-link text-white" to="/gardens">Jardin  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Store">Store  </Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Seed">Seed  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Blog ">Blog</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/quiz ">Quiz  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/tuto ">Tutorial  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Review">Review</Link>
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
