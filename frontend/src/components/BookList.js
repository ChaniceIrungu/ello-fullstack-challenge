import React from "react";
import { Typography, Grid } from "@mui/material";
import BookCard from './BookCard';

const BookList = ({ booksByReadingLevel, emptyHeading }) => {
  if (Object.keys(booksByReadingLevel).length === 0) {
    return <Typography variant="h2">{emptyHeading}</Typography>;
  }

  return (
    <>
      {Object.keys(booksByReadingLevel).map((level, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <Typography variant="h4" component="div"  gutterBottom sx={{ color: 'steelblue', padding:'10px',marginBottom: '10px' }} >
            Reading Level: {level}
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {booksByReadingLevel[level].map((book, bookIndex) => (
              <Grid item xs={12} sm={6} md={4} key={bookIndex}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </>
  );
};

export default BookList;
