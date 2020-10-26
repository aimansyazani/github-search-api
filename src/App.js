import React, {useState, useEffect} from "react";
import "./App.css";
import { Container } from 'react-bootstrap';
import RepoPagination from './RepoPagination';
import RepoDetails from './RepoDetails';


// https://api.github.com/search/repositories?q=html

function App() {
  const [inputValue, setInputValue] = useState("");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // const [isLoading, setIsLoading] = React.useState(false);
  // const [error, setError] = React.useState(false);
  // const [repos, setRepos] = React.useState([]);

  
  

 useEffect(() => {
    if (!inputValue) {
      return;
    }

    setIsLoading(true);

    // make API calls
    fetch("https://api.github.com/search/repositories?q=" + inputValue)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setIsLoading(false);
        setRepos(data.items);
      })
      .catch(err => {
        setIsLoading(false);
        setError(true);
        console.error(err);
      });
  }, [inputValue]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = repos.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container classname ="my-4">
      <h1 className="mb-4">GitHub Search Repos</h1> 
      <form className="mb-4"
        onSubmit={evt => {
          evt.preventDefault();
          setInputValue(evt.target.elements.query.value);
        }}
      >
        <input
          type="text"
          name="query"
          className="github_search_input"
          placeholder="Search Github Repositories"
        />
      </form>
      {error && (
        <div>
          Unexpected Error Occurred fetching data. Please try again later!
        </div>
      )}
      <RepoPagination
        postsPerPage={postsPerPage}
        totalPosts={repos.length}
        paginate={paginate}
      />
      <RepoDetails repos={currentPosts} isLoading={isLoading} />
      <RepoPagination
        postsPerPage={postsPerPage}
        totalPosts={repos.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default App;
