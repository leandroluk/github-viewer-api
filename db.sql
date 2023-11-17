CREATE TABLE "user" (
  "id"          UUID          NOT NULL  DEFAULT GEN_RANDOM_UUID(),
  "timestamp"   TIMESTAMP(3)  NOT NULL,
  "created_at"  TIMESTAMP(3)  NOT NULL,
  "removed_at"  TIMESTAMP(3)  NULL,
  "email"       VARCHAR(100)  NOT NULL,
  "password"    TEXT          NOT NULL,
  --
  PRIMARY KEY ("id"),
  UNIQUE ("email")
);

CREATE TABLE "user_github" (
  "id"                  UUID          NOT NULL  DEFAULT GEN_RANDOM_UUID(),
  "timestamp"           TIMESTAMP(3)  NOT NULL,
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
  "blog"                TEXT          NULL, -- site
  --
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE
);