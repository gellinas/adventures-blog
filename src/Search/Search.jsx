import { useState, useEffect } from "react";
import { get, isEmpty } from "lodash";
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
  const [categoriesChecked, setCategoriesChecked] = useState([]);
  const [tagsChecked, setTagsChecked] = useState([]);
  const [clearFiltersVisible, setClearFiltersVisible] = useState(false);
  const [applyFiltersVisible, setApplyFiltersVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (get(props.location.state, "carouselCategory", undefined)) {
      const filterByCategory = dummyData.filter((blogPostData, index) =>
        blogPostData.categories.includes(
          get(props.location.state, "carouselCategory", undefined)
        )
      );
      setSearchResult(filterByCategory);
    }
    if (get(props.location.state, "blogPostCardTag", undefined)) {
      const filterByTagClick = dummyData.filter((blogPostData, index) =>
        blogPostData.tags.includes(
          get(props.location.state, "blogPostCardTag", undefined)
        )
      );
      setSearchResult(filterByTagClick);
    }
    if (get(props.location.state, "navbarQuery", undefined)) {
      setSearchQuery(props.location.state.navbarQuery);
    }
  }, [
    get(props.location.state, "carouselCategory", undefined),
    get(props.location.state, "blogPostCardTag", undefined),
    get(props.location.state, "navbarQuery", undefined),
  ]);

  useEffect(() => {
    if (!isEmpty(tagsChecked) || !isEmpty(categoriesChecked)) {
      setClearFiltersVisible(true);
    }
    if (isEmpty(tagsChecked) && isEmpty(categoriesChecked)) {
      setClearFiltersVisible(false);
    }
  }, [tagsChecked, categoriesChecked]);

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
          categoriesChecked={categoriesChecked}
          setCategoriesChecked={setCategoriesChecked}
          tagsChecked={tagsChecked}
          setTagsChecked={setTagsChecked}
          clearFiltersVisible={clearFiltersVisible}
          setClearFiltersVisible={setClearFiltersVisible}
          onApplyFiltersClick={onApplyFiltersClick}
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

  const onApplyFiltersClick = () => {
    if (clearFiltersVisible) {
      setIsCategoriesFilterActive(false);
      setFilterCategoryIcon("chevron down");
      setIsTagsFilterActive(false);
      setFilterTagIcon("chevron down");
      setApplyFiltersVisible(true);
    }
  };

  const removeSingleCategoryFilter = (category) => {
    const removeFromCategoriesChecked = categoriesChecked.filter(
      (value) => value !== category
    );
    setCategoriesChecked(removeFromCategoriesChecked);
  };

  const removeSingleTagFilter = (tag) => {
    const removeFromTagsChecked = tagsChecked.filter((value) => value !== tag);
    setTagsChecked(removeFromTagsChecked);
  };

  const applyFilters = () => {
    if (applyFiltersVisible) {
      return (
        <div className="filters-applied-container">
          <div className="filters-applied">
            {!isEmpty(categoriesChecked) &&
              categoriesChecked.map((category, index) => {
                return (
                  <div className="applied-filter-label" key={index}>
                    {category}
                    <Icon
                      className="close-icon"
                      name="x"
                      onClick={() => removeSingleCategoryFilter(category)}
                    />
                  </div>
                );
              })}
            {!isEmpty(tagsChecked) &&
              tagsChecked.map((tag, index) => {
                return (
                  <div className="applied-filter-label" key={index}>
                    {tag}{" "}
                    <Icon
                      className="close-icon"
                      name="x"
                      onClick={() => removeSingleTagFilter(tag)}
                    />
                  </div>
                );
              })}
          </div>
          {clearFilters()}
        </div>
      );
    }
  };

  const onClearFiltersClick = () => {
    setTagsChecked([]);
    setCategoriesChecked([]);
    setClearFiltersVisible(false);
    setApplyFiltersVisible(false);
  };

  const clearFilters = () => {
    if (clearFiltersVisible) {
      return (
        <div className="clear-filters" onClick={onClearFiltersClick}>
          Clear All Filters
        </div>
      );
    }
  };

  return (
    <div className="search-container">
      <Navbar
        {...props}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="search-content">
        <div className="search-result-title">Results for " "</div>

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

        {applyFilters()}
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
