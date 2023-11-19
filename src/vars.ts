import packageJson from '../package.json';

const { env: _, cwd } = process;

export const vars = {
  path: cwd(),
  port: Number(_.PORT ?? 3000),
  env: _.NODE_ENV ?? 'development',
  app: {
    name: packageJson.displayName,
    description: packageJson.description,
    version: packageJson.version,
    homepage: packageJson.homepage,
  },
  db: {
    postgres: _.DB_POSTGRES ?? 'postgresql://postgres:postgres@localhost:5432/github-viewer',
    limit: Number(_.DB_LIMIT ?? 50),
  },
  jwt: {
    privateKey: _.JWT_PRIVATE_KEY ?? 'secret',
    publicKey: _.JWT_PUBLIC_KEY ?? 'secret',
    algorithm: (_.JWT_AUGORITHM ?? 'HS256') as 'HS256' | 'RS256',
    audience: _.JWT_AUDIENCE ?? 'http://localhost:3000',
    issuer: _.JWT_ISSUER ?? 'issuer',
    // default 10 minutes
    accessTTL: Number(_.JWT_ACCESS_TTL ?? 1000 * 60 * 10),
    // default 14 days
    refreshTTL: Number(_.JWT_REFRESH_TTL ?? 1000 * 60 * 60 * 24 * 14),
  },
};
