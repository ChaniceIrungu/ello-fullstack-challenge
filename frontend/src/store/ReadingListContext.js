import React, { createContext, useContext, useState, useEffect } from 'react';
import { OpenAI } from 'openai'; // Import OpenAI directly
import config from '../config';
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../services/queries";

const ReadingListContext = createContext();

export const useReadingList = () => useContext(ReadingListContext);

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  // Initialize the OpenAI instance with your API key
  const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
  });

  const { loading, error, data } = useQuery(GET_BOOKS);

useEffect(() => {
  if (data && data.books) {
    setAllBooks(data.books); // Assuming the GraphQL query returns an array of books in data.books
    console.log("All Books:", data.books); // Log allBooks to verify the data
  }
}, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addBookToReadingList = (book, students) => {
    setReadingList((prevList) => {
      const existingBook = prevList.find((b) => b.title === book.title);
      if (existingBook) {
        existingBook.students = [
          ...new Set([...existingBook.students, ...students])
        ];
        fetchRecommendations(prevList); // Trigger recommendations update
        return [...prevList];
      } else {
        const newList = [...prevList, { ...book, students }];
        fetchRecommendations(newList); // Trigger recommendations update
        return newList;
      }
    });
  };

  const removeBookFromReadingList = (book, studentId = null) => {
    setReadingList((prevList) => {
      let newList;
      if (studentId === null) {
        newList = prevList.filter((b) => b.title !== book.title);
      } else {
        newList = prevList.map((b) => {
          if (b.title === book.title) {
            return {
              ...b,
              students: b.students.filter((id) => id !== studentId),
            };
          }
          return b;
        });
      }
      fetchRecommendations(newList); // Trigger recommendations update
      return newList;
    });
  };

  const fetchRecommendations = async (list) => {
    if (list.length === 0) {
      setRecommendations([]);
      return;
    }

    const bookTitles = list.map(book => book.title).join(', ');
    const readingLevels = list.map(book => book.readingLevel).join(', ');

    // Get recommendations based on title and reading level
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Based on these books: ${bookTitles}, with reading levels: ${readingLevels}, suggest similar books that students may enjoy.` }
      ],
      max_tokens: 150
    });

    const lines = response.choices[0].message.content.split('\n').map(line => line.trim());

    // Assume the first and last lines are the introductory and concluding messages
    const introMessage = lines[0]; 
    const concludingMessage = lines[lines.length - 1];
  
    // Filter out the book titles from the middle lines
    const recommendedBooks = lines.slice(1, -1).filter(line => line).map((title, index) => ({
      // id: `rec-${index}`,
      title: title.trim(),
      // author: 'Unknown'
    }));
  
    setRecommendations({
      introMessage,
      recommendedBooks,
      concludingMessage
    });
  };

  return (
    <ReadingListContext.Provider value={{ readingList, addBookToReadingList, removeBookFromReadingList, recommendations }}>
      {children}
    </ReadingListContext.Provider>
  );
};
