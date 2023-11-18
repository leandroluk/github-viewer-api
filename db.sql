-- migrations

CREATE TABLE "user" (
  "id"          UUID          NOT NULL  DEFAULT GEN_RANDOM_UUID(),
  "timestamp"   TIMESTAMP(3)  NOT NULL  DEFAULT CURRENT_TIMESTAMP(3),
  "created_at"  TIMESTAMP(3)  NOT NULL  DEFAULT CURRENT_TIMESTAMP(3),
  "removed_at"  TIMESTAMP(3)  NULL,
  "email"       VARCHAR(100)  NOT NULL,
  "password"    TEXT          NOT NULL,
  --
  PRIMARY KEY ("id"),
  UNIQUE ("email")
);

CREATE TABLE "user_github" (
  "id"                  UUID          NOT NULL  DEFAULT GEN_RANDOM_UUID(),
  "timestamp"           TIMESTAMP(3)  NOT NULL  DEFAULT CURRENT_TIMESTAMP(3),
  "user_id"             UUID          NOT NULL,
  "name"                VARCHAR(100)  NULL, -- nome
  "login"               VARCHAR(100)  NULL, -- tag do usuário
  "followers_count"     INT           NULL, -- quantidade de seguidores
  "following_count"     INT           NULL, -- quantidade de pessoa seguindo o mesmo
  "public_repos_count"  INT           NULL, -- quantidade de repositórios
  "bio"                 TEXT          NULL, -- biografica
  "email"               VARCHAR(100)  NULL, -- email
  "twitter_username"    VARCHAR(100)  NULL, -- twitter
  "company"             VARCHAR(100)  NULL, -- nome da empresa
  "blog_url"            TEXT          NULL, -- site
  --
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE
);

-- seeding

INSERT INTO "user" ("email", "password") VALUES (
  'leandroluk@gmail.com', 
  'ceb1d08377fdbcd250f3cecf04ba6a66cb32382e1df627b3b68d71f4ed0c5a75dbde6f70d3e8b147' -- Test@123 (encrypted)
);

INSERT INTO "user_github" ("user_id", "login") 
SELECT 
  "id" AS "user_id",
  'leandroluk' AS "login"
FROM "user" 
WHERE "email" = 'leandroluk@gmail.com';