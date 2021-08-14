import { useEffect, useState } from "react";

import { Dropdown } from "semantic-ui-react";

import { getCategories } from "../../../api.js";

import "./CategoryDropdown.scss";

function CategoryDropdown(props) {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    setCategories(await getCategories());
  }, []);

  return (
    <div className="category-dropdown-wrapper">
      <Dropdown text="Categories" direction="left" scrolling>
        <Dropdown.Menu>
          {categories.map((category, index) => {
            return (
              <Dropdown.Item
                text={category.label}
                key={category.value}
                onClick={() =>
                  props.history.push("/search", {
                    carouselCategory: category.label,
                  })
                }
              />
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CategoryDropdown;
