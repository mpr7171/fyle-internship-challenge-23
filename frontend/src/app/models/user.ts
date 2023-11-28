import Repo from './repo';

export default class User {
  name: string;
  profile_image: string;
  bio: string;
  location: string;
  github_link: string;
  twitter_link: string;
  message: string;
  repos: Repo[];
}
