const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listWithOneBlog) => {
  if (listWithOneBlog.length !== 0) {
    if (listWithOneBlog.length === 1) {
      return listWithOneBlog[0].likes;
    } else {
      let initialValue = 0;
      return listWithOneBlog.reduce(
        (sum, blog) => sum + blog.likes,
        initialValue
      );
    }
  } else {
    return 0;
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  }

  return blogs.reduce((highestLikeBlog, currentBlog) => {
    return currentBlog.likes > highestLikeBlog.likes
      ? currentBlog
      : highestLikeBlog;
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogCounts = {};
  blogs.forEach((blog) => {
    if (!blogCounts[blog.author]) {
      blogCounts[blog.author] = 1;
    } else {
      blogCounts[blog.author]++;
    }
  });
  const maxAuthor = Object.keys(blogCounts).reduce((max, author) =>
    blogCounts[author] > blogCounts[max] ? author : max
  );
  return { author: maxAuthor, blogs: blogCounts[maxAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authorLikes = {};
  blogs.forEach((blog) => {
    if (!authorLikes[blog.author]) {
      authorLikes[blog.author] = blog.likes;
    } else {
      authorLikes[blog.author] += blog.likes;
    } //--it gives authorLikes={ 'Roshan Sunar': 22, 'Sworup Pandit': 5 }
  });

  let maxLikes = 0;
  let maxLikesAuthor = "";
  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author];
      maxLikesAuthor = author;
    }
  }
  const result = {
    author: maxLikesAuthor,
    likes: maxLikes,
  };
  return result;
};

// console.log(mostLikes(blogs));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
