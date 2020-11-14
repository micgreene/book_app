DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    author varchar(255),
    title varchar(255),
    isbn varchar(255),
    image_url varchar(255),
    descr varchar(5000)
);