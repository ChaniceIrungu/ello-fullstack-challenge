// src/utils.js
export function filterBooks(books, searchText, filterReadingLevel) {
  return books.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (filterReadingLevel === '' || book.readingLevel === filterReadingLevel)
  ).sort((a, b) => a.readingLevel.localeCompare(b.readingLevel));
}
