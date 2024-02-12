import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

describe("Blog App Tests", () => {
  test("component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default",() => {
    const blog = {
      id: 23,
      title: "muna madan",
      author: "Laxmi Prasad Devkota",
      url: "https://www.munamadan.com",
      likes: 200,
    };

    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector(".blogTitle");
    const element = screen.querySelector("likes");
    expect(div).toHaveTextContent("muna madan");
    expect(element).toBeNull();
    expect(screen.querySelector("url")).toBeNull();
  });
});
