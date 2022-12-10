import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoPerPage, setTodoPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const url = "https://jsonplaceholder.typicode.com/todos";
  const fetchTodos = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    setTodos(data);
  };
  useEffect(() => {
    fetchTodos(url);
  }, []);
  const totalPages = Math.ceil(todos.length / todoPerPage);
  const lastIndex = currentPage * todoPerPage;
  const firstIndex = lastIndex - todoPerPage;
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  console.log("pages", pages);
  const visibleTodos = todos.slice(firstIndex, lastIndex);
  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className="App">
      <div>
        <select onChange={(e) => setTodoPerPage(e.target.value)}>
          <option value="10"> 10 </option>
          <option value="30">30 </option>
          <option value="50"> 50 </option>
        </select>
      </div>
      <div>
        {visibleTodos.map((todo) => {
          return <p key={todo.id}> {todo.title} </p>;
        })}
      </div>
      <span onClick={prevPageHandler}> Prev </span>
      <p>
        {pages.map((page) => {
          return (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? "active" : ""}`}
            >
              {`${page} |`}
            </span>
          );
        })}
      </p>
      <span onClick={nextPageHandler}> Next </span>
    </div>
  );
}
