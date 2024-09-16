import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const Books = () => {


    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [darkTheme, setDarkTheme] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [addBook, setAddBook] = useState(false);
    const [title, setTitle] = useState("title");
    const [author, setAuthor] = useState("author name");
    const [publicationDate, setPublicationDate] = useState("date");
    const [synopsis, setSynopsis] = useState("synopsis");
    const [genre, setGenre] = useState("genre");
    const [coverImage, setCoverImage] = useState("image link");

    const fetchData = async () => {
        let res = await axios.get(
            "https://react-db--01-default-rtdb.asia-southeast1.firebasedatabase.app/books.json"
        );
        const booksArray = Object.keys(res.data).map((key) => ({
            id: key,
            ...res.data[key],
        }));
        setData(booksArray);
        console.log(res.data)
    };

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newBook = {
            title,
            author,
            publicationDate,
            coverImage,
            synopsis,
            genre,
            isEditable: false,
        };
        await axios.post(
            "https://react-db--01-default-rtdb.asia-southeast1.firebasedatabase.app/books.json",
            newBook
        );
        fetchData();
        alert("New book added");
    };

    const handleDelete = async (id) => {
        await axios.delete(
            `https://react-db--01-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id}.json`
        );
        fetchData();
        alert("Book deleted");
    };

    const handleEdit = (id) => {
        const updatedData = data.map((book) =>
            book.id === id ? { ...book, isEditable: !book.isEditable } : book
        );
        setData(updatedData);
    };

    const handleUpdate = async (id, updatedBook) => {
        await axios.put(
            `https://react-db--01-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id}.json`,
            updatedBook
        );
        fetchData();
        alert("Book updated");
    };

    const filteredData = data.filter(
        (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.genre.toLowerCase().includes(query.toLowerCase()) ||
            book.publicationDate === query
    );
    return (
        <>
            <div className={darkTheme ? "light" : "dark"}>
                <label htmlFor="">
                    Darkmode
                    <input
                        type="checkbox"
                        onChange={() => setDarkTheme(!darkTheme)}
                    />
                </label>

                <button onClick={fetchData}>Get All Books</button>
                <input
                    type="text"
                    placeholder="Search by title, author, or genre"
                    value={query}
                    onChange={handleSearch}
                />
                <button onClick={() => setAddBook(!addBook)}>
                    {addBook ? "done" : "Add Book"}
                </button>
                {addBook && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <input
                            type="text"
                            value={publicationDate}
                            onChange={(event) => setPublicationDate(event.target.value)}
                        />
                        <input
                            type="text"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                        <input
                            type="text"
                            value={genre}
                            onChange={(event) => setGenre(event.target.value)}
                        />
                        <input
                            type="text"
                            value={synopsis}
                            onChange={(event) => setSynopsis(event.target.value)}
                        />
                        <input
                            type="text"
                            value={coverImage}
                            onChange={(event) => setCoverImage(event.target.value)}
                        />
                        <button type="submit">ADD</button>
                    </form>
                )}
                <select name="" id="">
                    <option value=""> Select by genre</option>
                    {data.map((el) => (
                        <option value={el.genre} onClick={() => setQuery(el.genre)} key={el.id}> {el.genre}</option>
                    ))}
                </select>
                <select name="" id="">
                    <option value=""> Select by date</option>
                    {data.map((el) => (
                        <option value={el.publicationDate} onClick={() => setQuery(el.publicationDate)} key={el.id}> {el.publicationDate}</option>
                    ))}
                </select>

                <div className="cont">

                    {filteredData.map((el) => (
                        <><Link key={el.id} to={`/books/${el.id}`}>
                            <div key={el.id}>
                                <img src={el.coverImage} alt="cant fetch image" />
                                <p>{el.title}</p>
                                <p>{el.author}</p>
                                <p>{el.genre}</p>
                                <button onClick={() => handleDelete(el.id)}>DELETE</button>
                                <button onClick={() => handleEdit(el.id)}>Edit</button>
                                {el.isEditable && (
                                    <>
                                        <input
                                            type="text"
                                            value={el.title}
                                            onChange={(event) =>
                                                setData((prevData) =>
                                                    prevData.map((book) =>
                                                        book.id === el.id
                                                            ? { ...book, title: event.target.value }
                                                            : book
                                                    )
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={el.publicationDate}
                                            onChange={(event) =>
                                                setData((prevData) =>
                                                    prevData.map((book) =>
                                                        book.id === el.id
                                                            ? { ...book, publicationDate: event.target.value }
                                                            : book
                                                    )
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={el.author}
                                            onChange={(event) =>
                                                setData((prevData) =>
                                                    prevData.map((book) =>
                                                        book.id === el.id
                                                            ? { ...book, author: event.target.value }
                                                            : book
                                                    )
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={el.genre}
                                            onChange={(event) =>
                                                setData((prevData) =>
                                                    prevData.map((book) =>
                                                        book.id === el.id
                                                            ? { ...book, genre: event.target.value }
                                                            : book
                                                    )
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={el.synopsis}
                                            onChange={(event) =>
                                                setData((prevData) =>
                                                    prevData.map((book) =>
                                                        book.id === el.id
                                                            ? { ...book, synopsis: event.target.value }
                                                            : book
                                                    )
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={el.coverImage}
                                            onChange={(event) =>
                                                setData((prevData) =>
                                                    prevData.map((book) =>
                                                        book.id === el.id
                                                            ? { ...book, coverImage: event.target.value }
                                                            : book
                                                    )
                                                )
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                handleUpdate(el.id, {
                                                    title: el.title,
                                                    author: el.author,
                                                    publicationDate: el.publicationDate,
                                                    genre: el.genre,
                                                    synopsis: el.synopsis,
                                                    coverImage: el.coverImage,
                                                })
                                            }
                                        >
                                            Save
                                        </button>
                                    </>
                                )}
                                <button onClick={() => setShowMore(!showMore)}>
                                    {showMore ? "Show less" : "Show More"}
                                </button>
                                {showMore && <p>{el.synopsis}</p>}
                            </div>
                            </Link>
                            </>
                        
              
            ))}
                        </div>
          
            </div>

        </>
    )
}

export default Books