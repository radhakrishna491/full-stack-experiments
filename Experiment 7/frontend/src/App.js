import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {products.map(p => (
          <div className="col-md-4" key={p.id}>
            <div className="card p-3 mb-3">
              <h5>{p.name}</h5>
              <p>₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
