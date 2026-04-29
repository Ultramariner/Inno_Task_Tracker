CREATE TABLE tasks (
                       id BIGSERIAL PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       status VARCHAR(50) NOT NULL,
                       position INT NOT NULL,
                       user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
