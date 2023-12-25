export interface postProps {
  [x: string]: any;
  image: string | undefined;
  writer: any;
  id: number;
  title: string;
  content: string;
  author: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  description: string;
  likes: [];
  comments: [];
  userId: string;
  userPicturePath: string;
  createdAt: string;
}
