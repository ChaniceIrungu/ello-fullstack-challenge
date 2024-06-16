import React, { useState } from "react";
import { Box, Grid, Typography } from '@mui/material';
import SearchInput from "./SearchInput";
import BookList from "./BookList";
import { filterBooks } from "../utils/filter.js";
import FilterByLevel from "./FilterByLevel.js";


function SearchableBookList({ books }) {
  const [searchText, setSearchText] = useState("");
  const [filterReadingLevel, setFilterReadingLevel] = useState("");

  const filteredBooks = filterBooks(books, searchText, filterReadingLevel);

  const booksByReadingLevel = filteredBooks.reduce((acc, book) => {
    if (!acc[book.readingLevel]) acc[book.readingLevel] = [];
    acc[book.readingLevel].push(book);
    return acc;
  }, {});

  const uniqueReadingLevels = [
    ...new Set(books.map((book) => book.readingLevel)),
  ].sort();

  return (
    <>
    <Typography  variant="h4" align="center"  sx={{ color: 'steelblue' }}>BROWSE BOOKS</Typography>
    <Typography
        sx={{
          margin: '16px 0px 0px',
          fontFamily: 'Mulish, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          lineHeight: 1.5,
          color: 'rgb(51, 92, 110)',
          fontSize: '1.625rem',
          fontWeight: 800,
          textAlign: 'center',
        }}
      >
        Confident, Independent Reading
      </Typography>
    <Box p={2}>
      <Grid container spacing={2}  alignItems="center"  justifyContent="center" >
        <Grid item xs={12} sm={6} md={4}>
          <SearchInput
            value={searchText}
            onChange={(newText) => setSearchText(newText)}
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <FilterByLevel
            filterReadingLevel={filterReadingLevel}
            setFilterReadingLevel={setFilterReadingLevel}
            uniqueReadingLevels={uniqueReadingLevels}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <BookList
          booksByReadingLevel={booksByReadingLevel}
          emptyHeading={`No matches for “${searchText}”`}
        />
      </Box>
    </Box>
  </>
  );
}

export default SearchableBookList;
