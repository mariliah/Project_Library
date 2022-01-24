function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

/*maybe create helper function for this one*/
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    for (let j = 0; j < book.borrows.length; j++) {
      if (book.borrows[j].id === account.id) {
        total++;
      }
    }
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const possessed = books.filter((book) => {
    if (book.borrows.some((borrow) => {
      return borrow.id === account.id && borrow.returned === false ? true : false;
    })
    )
    return true;
    else return false;
  });

  const bookByAuthor = possessed.map((book) => {
    const foundAuthor = authors.find((author) => author.id === book.authorId);
    return { ...book, author: foundAuthor };
  });
  return bookByAuthor;
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
