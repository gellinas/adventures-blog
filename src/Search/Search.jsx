import { useState, useEffect } from "react";
import { get, isEmpty } from "lodash";
import { Dropdown, Icon, Pagination } from "semantic-ui-react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard.jsx";
import FilterDropdown from "./components/FilterDropdown/FilterDropdown.jsx";

import { getAdventures, queryForAdventures } from "../api.js";

import "./Search.scss";

function Search(props) {
  const [adventureData, setAdventureData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(async () => {
    if (!get(props.location.state, "navbarInput", undefined)) {
      setAdventureData(await getAdventures());
    }
  }, []);

  useEffect(async () => {
    if (get(props.location.state, "carouselCategory", undefined)) {
      setSearchQuery(props.location.state.carouselCategory);

      const searchedAdventures = await queryForAdventures(get(props.location.state, "carouselCategory", undefined))
      setSearchResult(searchedAdventures);
    } else if (get(props.location.state, "blogPostCardTag", undefined)) {
      setSearchQuery(props.location.state.blogPostCardTag);

      const searchedAdventures = await queryForAdventures(get(props.location.state, "blogPostCardTag", undefined))
      setSearchResult(searchedAdventures);
    } else if (get(props.location.state, "navbarInput", undefined) && get(props.location.state, "navbarInput", undefined) !== searchQuery ) {
      setSearchQuery(props.location.state.navbarInput);
      const searchedAdventures = await queryForAdventures(get(props.location.state, "navbarInput", undefined))
      setSearchResult(searchedAdventures);
    } else {
      setSearchResult(adventureData)
    }
  }, [
    get(props.location.state, "carouselCategory", undefined),
    get(props.location.state, "blogPostCardTag", undefined),
    get(props.location.state, "navbarInput", undefined),
    adventureData,
  ]);

  useEffect(() => {
    if (
      !isEmpty(tagsChecked) &&
      isEmpty(categoriesChecked) &&
      applyFiltersVisible
    ) {
      const filterByTagsChecked = adventureData.filter(
        (blogPostData, index) =>
          !isEmpty(tagsChecked.filter((tag) => blogPostData.tags.includes(tag)))
      );
      setSearchResult(filterByTagsChecked);
      setClearFiltersVisible(true);
    }
    if (
      !isEmpty(categoriesChecked) &&
      isEmpty(tagsChecked) &&
      applyFiltersVisible
    ) {
      const filterByCategoriesChecked = adventureData.filter(
        (blogPostData, index) =>
          !isEmpty(
            categoriesChecked.filter((category) =>
              blogPostData.categories.includes(category)
            )
          )
      );
      setSearchResult(filterByCategoriesChecked);
      setClearFiltersVisible(true);
    }

    if (
      !isEmpty(categoriesChecked) &&
      !isEmpty(tagsChecked) &&
      applyFiltersVisible
    ) {
      // Filter out blog posts that match category tag
      const filterByTagsAndCategories = adventureData.filter((blogPostData) => {
        const filterByCategoriesChecked = !isEmpty(
          categoriesChecked.filter((category) =>
            blogPostData.categories.includes(category)
          )
        );
        const filterByTagsChecked = !isEmpty(
          tagsChecked.filter((tag) => blogPostData.tags.includes(tag))
        );
        return filterByCategoriesChecked || filterByTagsChecked;
      });
      setSearchResult(filterByTagsAndCategories);
      setClearFiltersVisible(true);
    }
    if (isEmpty(tagsChecked) && isEmpty(categoriesChecked)) {
      setSearchResult(adventureData);
      setClearFiltersVisible(false);
    }
  }, [tagsChecked, categoriesChecked, applyFiltersVisible]);

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
    setIsCategoriesFilterActive(!isCategoriesFilterActive);
    setIsTagsFilterActive(false);
    if (!isCategoriesFilterActive) {
      setFilterCategoryIcon("chevron up");
    } else {
      setFilterCategoryIcon("chevron down");
    }
    setFilterTagIcon("chevron down");
  };

  const onFilterByTagClick = () => {
    setIsTagsFilterActive(!isTagsFilterActive);
    setIsCategoriesFilterActive(false);
    if (!isTagsFilterActive) {
      setFilterTagIcon("chevron up");
    } else {
      setFilterTagIcon("chevron down");
    }
    setFilterCategoryIcon("chevron down");
  };

  const onApplyFiltersClick = () => {
    setIsCategoriesFilterActive(false);
    setFilterCategoryIcon("chevron down");
    setIsTagsFilterActive(false);
    setFilterTagIcon("chevron down");
    setApplyFiltersVisible(true);
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
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
      />
      <div className="search-content">
        {searchQuery && (<div className="search-result-title">{`Results for "${searchQuery}"`}</div>)}

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
          {searchResult
            .slice((currentPage - 1) * 9, (currentPage - 1) * 9 + 9)
            .map((item, index) => {
              return (
                <div className="search-result" key={index}>
                  <BlogPostCard blogPostData={item} index={index} {...props} />
                </div>
              );
            })}
        </div>
      </div>
      <Pagination
        activePage={currentPage}
        onPageChange={(event, data) => {
          setCurrentPage(data.activePage);
          window.scrollTo(0, 0);
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        pointing
        secondary
        totalPages={searchResult.length / 9}
      />
      <Footer />
    </div>
  );
}

export default Search;
