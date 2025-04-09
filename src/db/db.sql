CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
);

INSERT INTO tasks (name, description)
VALUES ('Tarea 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');