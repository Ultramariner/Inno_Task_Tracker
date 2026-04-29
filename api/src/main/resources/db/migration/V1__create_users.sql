CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       external_id VARCHAR(255)
);