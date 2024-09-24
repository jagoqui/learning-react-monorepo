import { toast } from 'sonner';

export interface Comment {
  title: string;
  message: string;
  preview?: boolean;
}

export interface CommentWithId extends Comment {
  id: string;
}

// ApiKey could be public as service is 100% free
const apiKey = '$2a$10$3kpuhHrzoWezxCEw944Lru.opyfl86yJemyGj6nSPBVFEqEy0vyD6';

export const getComments = async () => {
  const toastLoadingId = toast.loading('Fetching comments...');
  const response = await fetch(
    'https://api.jsonbin.io/v3/b/66e99db6acd3cb34a886351c',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': apiKey,
      },
    }
  ).finally(() => toast.dismiss(toastLoadingId));

  if (!response.ok) {
    toast.error('Failed to fetch comments.');
    throw new Error('Failed to fetch comments.');
  }

  toast.success('Comments fetched!');

  const json = await response.json();

  return json?.record;
};

export const postComment = async (comment: Comment) => {
  const comments = await getComments();

  const id = crypto.randomUUID();
  const newComment = { ...comment, id };
  const commentsToSave = [...comments, newComment];

  const toastLoadingId = toast.loading('Posting comment...', {});

  const response = await fetch(
    'https://api.jsonbin.io/v3/b/66e99db6acd3cb34a886351c',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': apiKey,
      },
      body: JSON.stringify(commentsToSave),
    }
  ).finally(() => toast.dismiss(toastLoadingId));

  if (!response.ok) {
    toast.error('Failed to post comment.');
    throw new Error('Failed to post comment.');
  }

  toast.success('Comment posted!');

  return newComment;
};
