CREATE TABLE IF NOT EXISTS product (
  id serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS styles (
  id BIGSERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  sale_price INT,
  original_price INT NOT NULL,
  default_style BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS features (
  id BIGSERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id) ON DELETE CASCADE,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS skus (
  id BIGSERIAL PRIMARY KEY,
  style_id BIGINT REFERENCES styles(id) ON DELETE CASCADE,
  size VARCHAR(15) NOT NULL,
  quantity SMALLINT CHECK(quantity >= 0)
);

CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL PRIMARY KEY,
  style_id BIGINT REFERENCES styles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

-- sudo -u postgres psql -a -d products -f tables.sql


-- products=# COPY product FROM '~/hackreactor/data/product.csv' NULL 'null' DELIMITER ',' CSV HEADER;
-- COPY 1000011
-- products=# COPY styles  FROM '~/hackreactor/data/styles.csv' NULL 'null' DELIMITER ',' CSV HEADER;
-- COPY 1958102
-- products=# COPY features FROM '~/hackreactor/data/features.csv' NULL 'null' DELIMITER ',' CSV HEADER;
-- COPY 2219279
-- products=# COPY photos FROM '~/hackreactor/data/photos.csv' NULL 'null' DELIMITER ',' CSV HEADER;
-- COPY 5655463
-- products=# COPY skus FROM '~/hackreactor/data/skus.csv' DELIMITER ',' CSV HEADER;
-- COPY 11323917
-- products=# COPY skus FROM '~/hackreactor/data/skus.csv' DELIMITER ',' CSV HEADER;