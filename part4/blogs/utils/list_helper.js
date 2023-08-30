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
    return currentBlog.likes> highestLikeBlog.likes ? currentBlog : highestLikeBlog;
  }, blogs[0]);
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
