// src/App.js
import React,{ useState }from 'react';
import {Tabs, Tab, Box } from "@mui/material";
import SearchableBookList from './SearchableBookList'
import ReadingList from "./ReadingList";
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../services/queries';

const BrowseBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [tabIndex, setTabIndex] = useState(0);

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
       <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Books" />
        <Tab label="Reading List" />
      </Tabs>
      </Box>
      {tabIndex === 0 && (
      <SearchableBookList books={data.books}/>
      )}
      {tabIndex === 1 && (
        <ReadingList
        />
      )}
    </>
  );
};

export default BrowseBooks;
