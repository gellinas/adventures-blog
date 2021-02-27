import dummyTags from "../../../data/dummy-tags.json";
import dummyCategories from "../../../data/dummy-categories.json";

import { Button, Icon, Checkbox } from "semantic-ui-react";

import "./FilterDropdown.scss";

function FilterDropdown(props) {
  const onCloseFilterDropdownClick = () => {
    props.setIsCategoriesFilterActive(false);
    props.setFilterCategoryIcon("chevron down");
    props.setIsTagsFilterActive(false);
    props.setFilterTagIcon("chevron down");
  };

  const onCategoriesChecked = (event, data) => {
    if (data.checked) {
      props.setCategoriesChecked([...props.categoriesChecked, data.label]);
    } else {
      const newCategoriesChecked = props.categoriesChecked.filter(
        (category) => data.label !== category
      );
      props.setCategoriesChecked(newCategoriesChecked);
    }
  };

  const onTagsChecked = (event, data) => {
    if (data.checked) {
      props.setTagsChecked([...props.tagsChecked, data.label]);
    } else {
      const newTagsChecked = props.tagsChecked.filter(
        (tag) => data.label !== tag
      );
      props.setTagsChecked(newTagsChecked);
    }
  };

  const populateFilterLabels = () => {
    if (props.isCategoriesFilterActive) {
      return dummyCategories.map((category, index) => {
        return (
          <div className="dropdown-option" key={index}>
            <Checkbox
              label={category.label}
              onClick={onCategoriesChecked}
              checked={props.categoriesChecked.includes(category.label)}
            />
          </div>
        );
      });
    }

    if (props.isTagsFilterActive) {
      return dummyTags.map((tag, index) => {
        return (
          <div className="dropdown-option" key={index}>
            <Checkbox
              label={tag}
              onClick={onTagsChecked}
              checked={props.tagsChecked.includes(tag)}
            />
          </div>
        );
      });
    }
  };

  return (
    <div className="filter-dropdown-container">
      <div className="dropdown-options">{populateFilterLabels()}</div>
      <div className="dropdown-buttons">
        <Button
          secondary
          compact
          className="filter-dropdown-button"
          onClick={() => props.onApplyFiltersClick()}
        >
          Apply Filters
        </Button>
        <Button
          icon
          basic
          className="close-dropdown-button"
          onClick={() => onCloseFilterDropdownClick()}
        >
          <Icon name="close" />
        </Button>
      </div>
    </div>
  );
}

export default FilterDropdown;
