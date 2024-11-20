const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// In-memory book list
let books = [
  {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "type": "Fiction",
    "genre": "Literary Fiction",
    "published": 1960
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "type": "Fiction",
    "genre": "Dystopian",
    "published": 1949
  },
  {
    "id": 3,
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "type": "Fiction",
    "genre": "Romance",
    "published": 1813
  },
  {
    "id": 4,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "type": "Fiction",
    "genre": "Literary Fiction",
    "published": 1925
  },
  {
    "id": 5,
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "type": "Fiction",
    "genre": "Adventure",
    "published": 1851
  },
  {
    "id": 6,
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "type": "Fiction",
    "genre": "Historical Fiction",
    "published": 1869
  },
  {
    "id": 7,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "type": "Fiction",
    "genre": "Literary Fiction",
    "published": 1951
  },
  {
    "id": 8,
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "type": "Fiction",
    "genre": "Fantasy",
    "published": 1937
  },
  {
    "id": 9,
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "type": "Fiction",
    "genre": "Fantasy",
    "published": 1954
  },
  {
    "id": 10,
    "title": "The Chronicles of Narnia",
    "author": "C.S. Lewis",
    "type": "Fiction",
    "genre": "Fantasy",
    "published": 1950
  },
  {
    "id": 11,
    "title": "The Hunger Games",
    "author": "Suzanne Collins",
    "type": "Fiction",
    "genre": "Young Adult Dystopian",
    "published": 2008
  },
  {
    "id": 12,
    "title": "Percy Jackson and the Olympians",
    "author": "Rick Riordan",
    "type": "Fiction",
    "genre": "Young Adult Fantasy",
    "published": 2005
  },
  {
    "id": 13,
    "title": "The Chronicles of Narnia",
    "author": "C.S Lewis",
    "type": "Fiction",
    "genre": "Fantasy",
    "published": 1950
  },
  {
    "id": 14,
    "title": "The Magicians",
    "author": "Lev Grossman",
    "type": "Fiction",
    "genre": "Fantasy",
    "published": 2009
  },
  {
    "id": 15,
    "title": "Artemis Fowl",
    "author": "Eoin Colfer",
    "type": "Fiction",
    "genre": "Young Adult Fantasy",
    "published": 2001
  }
];

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Books API is running',
        timestamp: new Date()
    });
});

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        type: req.body.type,
        genre: req.body.genre,
        published: req.body.published
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT to update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: bookId,
            title: req.body.title,
            author: req.body.author,
            type: req.body.type,
            genre: req.body.genre,
            published: req.body.published
        };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books = books.filter(book => book.id !== bookId);
        res.json({ message: 'Book deleted' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});