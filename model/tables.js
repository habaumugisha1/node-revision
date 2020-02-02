export const users = `
CREATE TABLE IF NOT EXISTS users(
id serial PRIMARY KEY,
firstName VARCHAR (50) NOT NULL,
lastName VARCHAR (50) NOT NULL,
email VARCHAR (100) NOT NULL,
password VARCHAR(255) NOT NULL,
isAdmin BOOLEAN NOT NULL DEFAULT false,
userRole VARCHAR (10) NOT NULL DEFAULT 'user',
createdOn TIMESTAMP NOT NULL
)
`;
export const post = `
CREATE TABLE IF NOT EXISTS sessions(
    id serial PRIMARY KEY,
    auther VARCHAR(100) NOT NULL,
    post VARCHAR (2000) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    FOREIGN KEY (auther) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)
`;
export const comment = `
CREATE TABLE IF NOT EXISTS reviews(
    id serial PRIMARY KEY,
    sender VARCHAR(50) NOT NULL,
    post VARCHAR(20) NOT NULL,
    comment VARCHAR (255) NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    FOREIGN KEY (snder) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE)
    FOREIGN KEY (post) REFERENCES post(id) ON DELETE CASCADE ON UPDATE CASCADE
`;

export const dropUserTable = `
DROP TABLE users
`;
export const dropPostTable = `
DROP TABLE post
`;
export const dropCommentTable = `
DROP TABLE comment
`;

export const deleteUserTable = `
DELETE FROM users
`;
export const deletePostTable = `
DELETE FROM post
`;
export const deleteCommentTable = `
DELETE FROM comment
`;