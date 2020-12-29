import React from "react";
import moment from "moment";

// this component will display the details of a book so this can be a plain function component

export default function Book(props) {
  return (
    <div className="Book">
      <h2>{props.title}</h2>
      <div className="book_author">by {props.author}</div>
      <div className="book_publisher">
        Published by: {props.publisher}
        on {moment(props.published_date).format("DD MMM YYYY")}
      </div>
      <div className="book_description">{props.description}</div>
      <div className="book_details">Rank {props.rank} this week</div>
    </div>
  );
}
