import { Injectable, Logger } from '@nestjs/common';
import axios, { isAxiosError } from 'axios';
import { Retryable } from 'typescript-retry-decorator';

import { IGetUserGithubRemote } from '#/data/remotes';

@Injectable()
export class GetUserGithubRemote implements IGetUserGithubRemote {
  private readonly logger = new Logger(GetUserGithubRemote.name);
  private baseUrl: string = 'https://api.github.com/users';

  @Retryable({ maxAttempts: 3 })
  async get(data: IGetUserGithubRemote.Data): Promise<IGetUserGithubRemote.Result> {
    const url = `${this.baseUrl}/${data.login}`;
    try {
      const { data } = await axios.get<GetUserGithubRemote.Response>(url);
      return {
        bio: data.bio ?? null,
        blogUrl: data.blog ?? null,
        company: data.company ?? null,
        email: data.email ?? null,
        followersCount: data.followers ?? null,
        followingCount: data.following ?? null,
        login: data.login ?? null,
        name: data.name ?? null,
        publicReposCount: data.public_repos ?? null,
        twitterUsername: data.twitter_username ?? null,
      };
    } catch (error) {
      if (isAxiosError(error) && error.status === 404) {
        return null;
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
