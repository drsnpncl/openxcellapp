import { Post } from './post.model';
export class Topic {
    _id: string;
    user: string;
    title: string;
    posts: Post[];
}