import { useState, useEffect } from "react";
import genresData from "../../../Utils/genres";
import "./manager.css";

export default function GenreManager() {
    const [genres, setGenres] = useState([]);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        // Load dari localStorage, jika ada. Jika tidak ada, gunakan default data
        const savedGenres = localStorage.getItem("genres");
        if (savedGenres) {
            setGenres(JSON.parse(savedGenres));
        } else {
            setGenres(genresData);
            localStorage.setItem("genres", JSON.stringify(genresData));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddGenre = (e) => {
        e.preventDefault();
        if (formData.name.trim() === "") {
            alert("Nama genre tidak boleh kosong!");
            return;
        }
        const newGenre = {
            id: Math.max(...genres.map((g) => g.id), 0) + 1,
            name: formData.name,
            description: formData.description,
        };
        const updatedGenres = [...genres, newGenre];
        setGenres(updatedGenres);
        localStorage.setItem("genres", JSON.stringify(updatedGenres));
        setFormData({ name: "", description: "" });
        setIsFormOpen(false);
        alert("✅ Genre berhasil ditambahkan!");
    };

    const handleEditClick = (genre) => {
        setEditingId(genre.id);
        setFormData({ name: genre.name, description: genre.description });
        setIsEditModalOpen(true);
    };

    const handleUpdateGenre = (e) => {
        e.preventDefault();
        if (formData.name.trim() === "") {
            alert("Nama genre tidak boleh kosong!");
            return;
        }
        const updatedGenres = genres.map((g) =>
            g.id === editingId
                ? { ...g, name: formData.name, description: formData.description }
                : g
        );
        setGenres(updatedGenres);
        localStorage.setItem("genres", JSON.stringify(updatedGenres));
        setFormData({ name: "", description: "" });
        setEditingId(null);
        setIsEditModalOpen(false);
        alert("✅ Genre berhasil diperbarui!");
    };

    const handleDeleteGenre = (id) => {
        if (confirm("⚠️ Apakah Anda yakin ingin menghapus genre ini?")) {
            const updatedGenres = genres.filter((g) => g.id !== id);
            setGenres(updatedGenres);
            localStorage.setItem("genres", JSON.stringify(updatedGenres));
            alert("✅ Genre berhasil dihapus!");
        }
    };

    const filteredGenres = genres.filter(
        (genre) =>
            genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            genre.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="manager-container">
            <div className="manager-header">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="🔍 Cari genre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button
                    className="btn-add"
                    onClick={() => setIsFormOpen(!isFormOpen)}
                >
                    {isFormOpen ? "❌ Tutup" : "➕ Tambah Genre"}
                </button>
            </div>

            {isFormOpen && (
                <div className="form-container">
                    <form onSubmit={handleAddGenre} className="add-form">
                        <div className="form-group">
                            <label htmlFor="name">Nama Genre *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Masukkan nama genre..."
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Deskripsi</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Masukkan deskripsi genre..."
                                value={formData.description}
                                onChange={handleInputChange}
                                className="form-textarea"
                                rows="3"
                            />
                        </div>

                        <button type="submit" className="btn-submit">
                            💾 Simpan Genre
                        </button>
                    </form>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>✏️ Edit Genre</h2>
                            <button
                                className="modal-close"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleUpdateGenre} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="edit-name">Nama Genre *</label>
                                <input
                                    type="text"
                                    id="edit-name"
                                    name="name"
                                    placeholder="Masukkan nama genre..."
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-description">Deskripsi</label>
                                <textarea
                                    id="edit-description"
                                    name="description"
                                    placeholder="Masukkan deskripsi genre..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="form-textarea"
                                    rows="3"
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="submit" className="btn-submit">
                                    💾 Perbarui Genre
                                </button>
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="data-grid">
                {filteredGenres.length === 0 ? (
                    <div className="empty-state">
                        <p>📭 Tidak ada genre yang ditemukan</p>
                    </div>
                ) : (
                    filteredGenres.map((genre) => (
                        <div key={genre.id} className="card">
                            <div className="card-header">
                                <h3>{genre.name}</h3>
                                <span className="badge">#{genre.id}</span>
                            </div>
                            <p className="card-description">{genre.description}</p>
                            <div className="card-actions">
                                <button
                                    className="btn-edit"
                                    onClick={() => handleEditClick(genre)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDeleteGenre(genre.id)}
                                >
                                    🗑️ Hapus
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="stats">
                <p>Total Genre: <strong>{genres.length}</strong></p>
            </div>
        </div>
    );
}
