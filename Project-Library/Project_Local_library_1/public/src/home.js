function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    for (let j = 0; j < book.borrows.length; j++) {
      if (book.borrows[j].returned === false) {
        count++;
      }
    }
  }
  return count;
}

function getMostCommonGenres(books) {
  const genres = [];
  for (let book of books) {
    const commonGenre = genres.find((genre) => genre.name === book.genre);
    if (commonGenre) {
      commonGenre.count++;
    } else {
      genres.push({ "name": book.genre, count: 1});
    }
  }
  genres.sort((item1, item2) => item2.count - item1.count)
  genres.length = 5;
  return genres
}

function getMostPopularBooks(books) {
  const mostPopular = [];
  for (let book of books) {
    mostPopular.push({ "name": book.title, "count": book.borrows.length });
  }
  mostPopular.sort((itm1, itm2) => itm2.count - itm1.count);
  mostPopular.length = 5;
  return mostPopular;
}

function getMostPopularAuthors(books, authors) {
  const popularAuthor = [];
  authors.forEach(({ id, name }) =>  {
    books.forEach(({ authorId, borrows }) => {
      if (authorId === id) {
        if (Object.keys(popularAuthor).includes(authorId)) {
          popularAuthor[authorId].count += borrows.length;
        } else {
          popularAuthor[authorId] = {
            name: `${name.first} ${name.last}`,
            count: borrows.length
          };
        }
      }
    });
  });
  return objectToArray(popularAuthor, 5);
 }

//helper function
const objectToArray = (object) => {
  const sortedObject = Object.values(object).sort((previo, corriente) => {
    return previo.count > corriente.count ? -1 : 1;
  });
  return sortedObject.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
