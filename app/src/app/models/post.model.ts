import { Comment } from './comment.model';
export class Post {
    _id: string;
    user: string;
    topic :string;
    title: string;
    text: string;
    comments: Comment[];
}