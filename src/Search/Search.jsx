import { useState, useEffect } from "react";
import { get } from "lodash";
import { Dropdown, Icon } from "semantic-ui-react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.jsx";
import FilterDropdown from "./components/FilterDropdown/FilterDropdown.jsx";

import dummyData from "../data/dummy-adventures.json";

import "./Search.scss";

function Search(props) {
  const [searchResult, setSearchResult] = useState(dummyData);
  const [filterCategoryIcon, setFilterCategoryIcon] = useState("chevron down");
  const [filterTagIcon, setFilterTagIcon] = useState("chevron down");
  const [isCategoriesFilterActive, setIsCategoriesFilterActive] = useState(
    false
  );
  const [isTagsFilterActive, setIsTagsFilterActive] = useState(false);

  useEffect(() => {
    if (get(props.location.state, "carouselCategory", undefined)) {
      const filterByCategory = dummyData.filter((blogPostData, index) =>
        blogPostData.categories.includes(
          get(props.location.state, "carouselCategory", undefined)
        )
      );
      setSearchResult(filterByCategory);
    }
  }, [get(props.location.state, "carouselCategory", undefined)]);

  const options = [
    {
      key: "Most Recent",
      text: "Most Recent",
      value: "Most Recent",
      content: "Most Recent",
    },
    {
      key: "Earliest",
      text: "Earliest",
      value: "Earliest",
      content: "Earliest",
    },
  ];

  const openFilterDropdown = () => {
    if (isCategoriesFilterActive === true || isTagsFilterActive === true) {
      return (
        <FilterDropdown
          dummyData={dummyData}
          isCategoriesFilterActive={isCategoriesFilterActive}
          setIsCategoriesFilterActive={setIsCategoriesFilterActive}
          isTagsFilterActive={isTagsFilterActive}
          setIsTagsFilterActive={setIsTagsFilterActive}
          filterCategoryIcon={filterCategoryIcon}
          setFilterCategoryIcon={setFilterCategoryIcon}
          filterTagIcon={filterTagIcon}
          setFilterTagIcon={setFilterTagIcon}
        />
      );
    }
  };

  const onFilterByCategoryClick = () => {
    setIsCategoriesFilterActive(true);
    setIsTagsFilterActive(false);
    setFilterCategoryIcon("chevron up");
    setFilterTagIcon("chevron down");
  };

  const onFilterByTagClick = () => {
    setIsTagsFilterActive(true);
    setIsCategoriesFilterActive(false);
    setFilterCategoryIcon("chevron down");
    setFilterTagIcon("chevron up");
  };

  return (
    <div className="search-container">
      <Navbar {...props} />
      <div className="search-content">
        <div className="search-result-title">Results for </div>
        <div className="search-menu">
          <div>{searchResult.length} Adventures</div>
          <div className="filter-group">
            <div className="filter-group-label">Filter By </div>
            <div
              className="filter-categories-label"
              onClick={onFilterByCategoryClick}
            >
              Categories <Icon name={filterCategoryIcon} />
            </div>
            <div className="filter-tags-label" onClick={onFilterByTagClick}>
              Tags <Icon name={filterTagIcon} />
            </div>
          </div>
          <div>
            Sort By{" "}
            <Dropdown
              inline
              options={options}
              defaultValue={options[0].value}
            />
          </div>
        </div>

        {openFilterDropdown()}

        <div className="search-result-container">
          {searchResult.map((item, index) => {
            return (
              <div className="search-result" key={index}>
                <BlogPostCard blogPostData={item} index={index} {...props} />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
