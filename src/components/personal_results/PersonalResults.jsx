// Result.js

import "./PersonalResults.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
  const location = useLocation();
  const data = location.state;

  if(data.community_stats.length === 0 && data.constest_rating.length === 0 && data.easy_solved.length === 0 && data.global_rank.length === 0 && data.total_constest_attended.length === 0 && data.total_problem_solved.length === 0)
  {
        return <div className="error-page">
              <h1>User Not Found !</h1>
        </div>
  }


  function addHyphenSpace(str) {
    let result = '';
    let foundNumber = false;

    for (let i = 0; i < str.length; i++) {
        if (!foundNumber && !isNaN(parseInt(str[i]))) {
            result += '- ';
            foundNumber = true;
        }
        result += str[i];
    }

    return result;
}

  const [showResults, setShowResults] = useState(false);

  const rating = data?.constest_rating[0];
  const globalRank = data?.global_rank[0];
  const str = data?.total_constest_attended[0];
  const totalAttendedContests = str?.slice(-2);
  const totalProblem = parseInt(data?.total_problem_solved[0]?.match(/\d+/)[0]);

  const [easy, medium, hard] = data?.easy_solved;


  function removeLabels(input) {
    // Remove substrings 'Easy', 'Medium', 'Hard'
    let result = input.replace(/Easy|Medium|Hard/g, '');

    // Add two spaces before every 'B'
    result = result.replace(/B/g, '  B');

    return result;
}



  const easySolved =  removeLabels(easy);
  const mediumSolved = removeLabels(medium);
  const hardSolved =  removeLabels(hard);


  const [views, solutions, discuss, reputations] = data?.community_stats;


  const viewsX = addHyphenSpace(views?views:"");
  const solutionsX = addHyphenSpace(solutions?solutions:"");
  const discussX = addHyphenSpace(discuss?discuss:"");
  const reputationsX = addHyphenSpace(reputations?reputations:"");

  useEffect(() => {
    setShowResults(true);
  }, []);

  return (
    <div className={`result-container ${showResults ? 'show' : ''}`}>
      <h2>YOUR STATS</h2>
      <div className="result-item">
        <h3>Contest Rating</h3>
        <p>{rating?rating:"0"}</p>
      </div>
      <div className="result-item">
        <h3>Global Rank</h3>
        <p>{globalRank?globalRank:"0"}</p>
      </div>
      <div className="result-item">
        <h3>Total Contests Attended</h3>
        <p>{totalAttendedContests?totalAttendedContests:"0"}</p>
      </div>
      <div className="result-item">
        <h3>Total Problems Solved</h3>
        <p>{totalProblem}</p>
      </div>
      <div className="result-item">
        <h3>Easy Problems Solved</h3>
        <p>{easySolved}</p>
      </div>
      <div className="result-item">
        <h3>Medium Problems Solved</h3>
        <p>{mediumSolved}</p>
      </div>
      <div className="result-item">
        <h3>Hard Problems Solved</h3>
        <p>{hardSolved}</p>
      </div>
      <div className="result-item">
        <h3>Community Stats</h3>
        <p>{viewsX}, {solutionsX},{discussX},{reputationsX}</p>
      </div>
    </div>
  );
};

export default Result;
