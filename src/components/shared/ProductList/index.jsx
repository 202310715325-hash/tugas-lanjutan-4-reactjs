export default function ProductList({ data = [] }) {
  const handleViewBook = (book) => {
    alert(`📖 Detail Buku:\n\nJudul: ${book.title}\nAuthor: ${book.author}\nTahun: ${book.year}\n\nDeskripsi:\n${book.description}`);
  };

  return (
    <>
      <section id="books" className="text-center mb-5">
        <h2>Best Seller Books</h2>
        <p className="text-muted">
          Koleksi buku terbaik pilihan pembaca
        </p>
      </section>

      <div className="row g-4">
        {data.map((book, i) => (
          <div className="col-md-4" key={book.id || i}>
            <div className="card shadow-sm h-100">
              <img
                src={book.image || `https://picsum.photos/300/200?random=${i}`}
                className="card-img-top"
                alt={book.title}
              />
              <div className="card-body">
                <h5>{book.title}</h5>
                <p className="text-muted">{book.author}</p>
                <p className="text-muted">Tahun: {book.year}</p>
                <p>{book.description}</p>

                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleViewBook(book)}
                  style={{ cursor: "pointer" }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}