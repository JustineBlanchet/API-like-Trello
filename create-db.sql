BEGIN; -- début de la transaction

DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

CREATE TABLE "list" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255) NOT NULL,
  "position" SMALLINT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "color" VARCHAR(30),
  "position" SMALLINT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE
);

CREATE TABLE "tag" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" VARCHAR(255) NOT NULL,
  "color" VARCHAR(30),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_tag" (
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("card_id", "tag_id") -- on crée une clé composite, une clé composée de plusieurs colonnes, ça garantit l'unicité de la combinaison
);

-- seeding

INSERT INTO "list" ("name", "position")
  VALUES 
    ('A faire', 1),
    ('Terminé', 2),
    ('Important', 3); 

INSERT INTO "card" ("title", "color", "description", "position", "list_id")
  VALUES
    ('Faire les courses', '#f90', 'penser à prendre du pain', 0, 2),
    ('Apprendre un nouveau langage', 'green', NULL, 1, 2);

INSERT INTO "tag" ("title", "color")
  VALUES 
    ('urgent', 'red'),
    ('idée', 'yellow');

INSERT INTO "card_has_tag" ("card_id", "tag_id")
  VALUES
    (1, 1),
    (2, 1),
    (2, 2);

COMMIT; -- fin de la transaction