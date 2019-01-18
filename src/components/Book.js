// Component to render each row of the table
const Book = function Book(props) {
  // Parse authors array into comma separated list
  const authors = props.author.join(", ");

  return (
    <tr>
      <td className="title">{props.title}</td>
      <td className="author">{authors}</td>
      <td className="pages">{props.pages}</td>
    </tr>
  );
};

export default Book;
