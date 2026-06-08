import { Link } from "react-router-dom";

export default function AdminHeader() {
    return (
        <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="col-md-3">
                <Link to="/admin" className="d-inline-flex align-items-center text-decoration-none">
                    <i className="fa-solid fa-gears fa-2xl" style={{ color: "#667eea" }}></i>
                    <span className="ms-2 fs-4 fw-bold">Admin Panel</span>
                </Link>
            </div>

            <ul className="nav">
                <li>
                    <Link to="/admin" className="nav-link active">
                        ⚙️ Dashboard
                    </Link>
                </li>
            </ul>

            <div className="col-md-3 text-end">
                <Link to="/" className="btn btn-outline-secondary">
                    ← Kembali ke User
                </Link>
            </div>
        </header>
    );
}
