-- This is a file to create our SQL tables --

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  all_day BOOL NOT NULL,
  resource VARCHAR(500)
);

CREATE TABLE friend_requests (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  friend_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (friend_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE friend_groups (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR(100) NOT NULL,
  owner_id INT NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE group_members (
  id SERIAL PRIMARY KEY,
  group_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES friend_groups (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pins (
  id SERIAL PRIMARY KEY,
  owner_id INT NOt NULL,
  friend_or_group_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);


