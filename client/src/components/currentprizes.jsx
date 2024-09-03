import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";
import axios from "axios";

const CurrentPrizes = () => {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/prizes");
        const prizes = response.data;

        // Filter prizes where the draw date is today or in the future
        const filteredCurrentPrizes = prizes.filter(
          (prize) => new Date(prize.drawDate) >= new Date()
        );
        setPrizes(filteredCurrentPrizes);
      } catch (err) {
        setError("Failed to fetch prizes. Please try again later.");
        console.error("Error fetching prizes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrizes();
  }, []);

  return (
    <section className="currprize">
      <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">
        Featured Prizes
      </h2>

      <div className="container">
        {loading ? (
          <p className="text-center">Loading prizes...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : prizes.length > 0 ? (
          <div className="row justify-content-center">
            {prizes.map((prize) => (
              <div
                key={prize._id}
                className="col-lg-4 col-md-6 mb-4 custom-height"
              >
                <div className="card border-0 shadow">
                  <img
                    src={`http://localhost:8000/uploads/${prize.image}`}
                    className="card-img-top img-fluid"
                    alt={prize.name}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{prize.name}</h5>
                    <p>
                      Amount: {prize.price} br <br />
                      Deadline: {new Date(prize.deadline).toLocaleDateString()} <br />
                      Draw: {new Date(prize.drawDate).toLocaleDateString()}
                    </p>
                   
                      

                      <Link to={`/prizes-detail/${prize._id}`}>
                        <button className="btn-sm1">More Details</button>
                      </Link>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No current prizes available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default CurrentPrizes;
