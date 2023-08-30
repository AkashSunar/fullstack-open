const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
    
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes([listWithOneBlog[0]]);
    expect(result).toBe(5);
  });
  test("of empty list is Zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(15);
  });
});

describe("favorite blog", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "overthinking reduction",
        author: "Roshan Sunar",
        likes: 10,
      },
      {
        title: "saalcastry research",
        author: "Sworup Pandit",
        likes: 5,
      },
    ];
    test("finds the blog with most likes", () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual({
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 12,
        });
    })
})
