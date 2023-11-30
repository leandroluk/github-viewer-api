import { Injectable, Logger } from '@nestjs/common';
import axios, { isAxiosError } from 'axios';
import { Retryable } from 'typescript-retry-decorator';

import { IGetGithubUserRemote } from '#/data/remotes';

@Injectable()
export class GetGithubUserRemote implements IGetGithubUserRemote {
  private readonly logger = new Logger(GetGithubUserRemote.name);

  @Retryable({ maxAttempts: 3 })
  async get(data: IGetGithubUserRemote.Data): Promise<IGetGithubUserRemote.Result> {
    const url = `https://api.github.com/users/${data.login}`;
    try {
      const response = await axios.get<GetUserGithubRemote.Response>(url);
      return {
        bio: response.data.bio ?? null,
        blogUrl: response.data.blog ?? null,
        company: response.data.company ?? null,
        email: response.data.email ?? null,
        followersCount: response.data.followers ?? null,
        followingCount: response.data.following ?? null,
        login: response.data.login ?? null,
        name: response.data.name ?? null,
        publicReposCount: response.data.public_repos ?? null,
        twitterUsername: response.data.twitter_username ?? null,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response.status === 404) return null;
        // https://docs.github.com/pt/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting
        // TODO: need catch error 403
      }
      this.logger.error(error);
      throw error;
    }
  }
}
export namespace GetUserGithubRemote {
  export type Response = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name?: any;
    company?: any;
    blog: string;
    location?: any;
    email?: any;
    hireable?: any;
    bio?: any;
    twitter_username?: any;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  };
}
