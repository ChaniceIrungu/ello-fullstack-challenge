import React, { createContext, useContext, useState } from 'react';

const ReadingListContext = createContext();

export const useReadingList = () => useContext(ReadingListContext);

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState([]);

  const addBookToReadingList = (book, students) => {
    setReadingList((prevList) => {
      const existingBook = prevList.find((b) => b.title === book.title);
      if (existingBook) {
        existingBook.students = [...new Set([...existingBook.students, ...students])];
        return [...prevList];
      } else {
        return [...prevList, { ...book, students }];
      }
    });
  };

  const removeBookFromReadingList = (book, studentId = null) => {
    setReadingList((prevList) => {
      if (studentId === null) {
        return prevList.filter((b) => b.title !== book.title);
      } else {
        return prevList.map((b) => {
          if (b.title === book.title) {
            return {
              ...b,
              students: b.students.filter((id) => id !== studentId),
            };
          }
          return b;
        });
      }
    });
  };

  return (
    <ReadingListContext.Provider value={{ readingList, addBookToReadingList, removeBookFromReadingList }}>
      {children}
    </ReadingListContext.Provider>
  );
};
