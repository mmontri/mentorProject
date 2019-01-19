import React from "react";

// Component to render each row of the table
const Book = function(props) {
  let authors;
  let title;
  let pages;
  // Add error checking to avoid undefined props
  if (Array.isArray(props.author)) {
    authors = props.author.join(", ");
  } else {
    authors = "Not listed";
  }
  if (typeof props.title === "undefined") {
    title = "Undefined";
  } else {
    title = props.title;
  }
  if (typeof props.url !== "undefined") {
    title = <BookLink url={props.url} title={title} />;
  }
  if (typeof props.pages === "undefined") {
    pages = "Not listed";
  } else {
    pages = props.pages;
  }

  return (
    <tr>
      <td className="title">{title}</td>
      <td className="author">{authors}</td>
      <td className="pages">{pages}</td>
    </tr>
  );
};

const BookLink = function(props) {
  return (
    <a href={props.url} target="blank">
      {props.title}
    </a>
  );
};

export default Book;
