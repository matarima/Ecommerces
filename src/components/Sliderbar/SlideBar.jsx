import React from "react";
import "./SlideBar.css";

const categories = [
  {
    name: "Apple",
    children: [{ name: "All" }],
  },
  {
    name: "Iphone & Mac",
    children: [{ name: "iphone" }, { name: "ipad" }, { name: "macbook" }],
  },
  {
    name: "Wireless",
    children: [{ name: "airpod" }, { name: "watch" }],
  },
  {
    name: "Other",
    children: [{ name: "mouse" }, { name: "keyboard" }, { name: "other" }],
  },
];

function SliderBar({ setCategory }) {
  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <div className="sidebar">
      <h4>Categories</h4>
      <ul className="list-unstyled">
        {categories.map((category) => (
          <li key={category.name}>
            <div
              className="category"
            >
              {category.name}
            </div>
            {category.children.length > 0 && (
              <ul className="list-unstyled ml-3">
                {category.children.map((child) => (
                  <li key={child.name}>
                    <div
                      className="subcategory"
                      onClick={() => handleCategoryClick(child.name)}
                    >
                      {(child.name).charAt(0).toUpperCase() + (child.name).slice(1)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SliderBar;
