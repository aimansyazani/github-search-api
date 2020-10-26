  
import React from 'react';
import {Card} from 'react-bootstrap'

const RepoDetails = ({ repos, isLoading }) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
       {isLoading && <div>Loading...</div>}
      <ul className="repo_list">
                <Card className="mb-1">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div>
                        {repos.map(repo => (  
                            <li key={repo.id} className="repo_item">
                              <a href={repo.html_url} target="_blank">
                                {repo.name}
                              </a>
                              <p>{repo.description}</p>
                            </li>
                        ))
                          }
                      </div>
                    </div>
                  </Card.Body>             
                </Card>              
     </ul>
    </div>  
)
}
export default RepoDetails;

  