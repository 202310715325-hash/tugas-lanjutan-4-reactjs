import { useState } from "react";
import "./admin.css";
import AdminHeader from "./AdminHeader";
import Footer from "../../shared/Footer";
import GenreManager from "./GenreManager";
import AuthorManager from "./AuthorManager";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("genre");

    return (
        <>
            <AdminHeader />
            <div className="admin-container">
                <div className="admin-header">
                    <h1>📊 Admin Panel</h1>
                    <p>Kelola Genre dan Author</p>
                </div>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === "genre" ? "active" : ""}`}
                        onClick={() => setActiveTab("genre")}
                    >
                        📚 Genre
                    </button>
                    <button
                        className={`tab-btn ${activeTab === "author" ? "active" : ""}`}
                        onClick={() => setActiveTab("author")}
                    >
                        ✍️ Author
                    </button>
                </div>

                <div className="admin-content">
                    {activeTab === "genre" && <GenreManager />}
                    {activeTab === "author" && <AuthorManager />}
                </div>
            </div>
            <Footer />
        </>
    );
}
