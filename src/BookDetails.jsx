import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const [data, setData] = useState(null); 
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://react-db--01-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id-1}.json`
        );
        
        if (res.data) {
          setData(res.data);
        } else {
          setError("No book data found.");
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
        setError("Error fetching book data.");
      }
    };

    fetchData();
  }, [id]);

  if (error) return <p>{error}</p>; 
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <p>Title: {data.title || "N/A"}</p>
      <p>Author: {data.author || "N/A"}</p>
      <p>Genre: {data.genre || "N/A"}</p>
      <p>Book ID: {id}</p>
      <p>Publication Date: {data.publicationDate || "N/A"}</p>
      <p>Synopsis: {data.synopsis || "N/A"}</p>
      {data.coverImage ? (
        <img src={data.coverImage} alt={data.title} />
      ) : (
        <p>No cover image available</p>
      )}
    </>
  );
};

export default BookDetails;
