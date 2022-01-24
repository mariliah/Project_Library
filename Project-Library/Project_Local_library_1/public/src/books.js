//find author by id
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//find book by id
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//find which books are still borrowed and which ones have been returned
function partitionBooksByBorrowedStatus(books) {
  const currentlyBorrowed = [];
  const returned = books.reduce((returnedBooks, book) => {
    if (book.borrows[0].returned) {
      returnedBooks.push(book);
    } else (
      currentlyBorrowed.push(book)
    )
  return returnedBooks;
}, []);
return [currentlyBorrowed, returned];
}

function getBorrowersForBook(book, accountData) {
  const borrowedAccounts = book.borrows.slice(0, 10);
  const borrowers = borrowedAccounts.map((borrowedAccount) => {
    let foundAccount = accountData.find((a) => a.id == borrowedAccount.id);
    foundAccount["returned"] = borrowedAccount.returned
    return foundAccount;
  });

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
