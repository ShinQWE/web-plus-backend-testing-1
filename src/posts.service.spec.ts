import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // Создаем новый пост
    const newPost = postsService.create(post);

    // Проверяем, что пост создан
    expect(newPost).toBeDefined();
    expect(newPost.text).toBe(post.text);
    expect(newPost.id).toBeDefined();
    expect(newPost.date).toBeDefined();

    const allPosts = postsService['posts']; 
    expect(allPosts).toContainEqual(newPost);
  });

  it('should find a post', () => {
    const createdPost = postsService.create(post);
    const postId = createdPost.id;

    const foundPost = postsService.find(postId);

    expect(foundPost).toBeDefined();
    expect(foundPost).toEqual(createdPost);
  });
});