import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { 
    articles: state.articles 
  };
};

// Articles is a copy of the articles array we saw in the Redux state
// It comes from the reducer
const ConnectedList = ({ articles }) => (
  <ul>
    {articles.map(article => (
      <li key={article.id}>{article.title}</li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);
// Connect takes at least one argument

export default List;