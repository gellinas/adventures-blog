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

  const populateFilterLabels = () => {
    if (props.isCategoriesFilterActive) {
      return dummyCategories.map((category, index) => {
        return (
          <div className="dropdown-option" key={index}>
            <Checkbox label={category.label} />
          </div>
        );
      });
    }
    if (props.isTagsFilterActive) {
      return dummyTags.map((tag, index) => {
        return (
          <div className="dropdown-option" key={index}>
            <Checkbox label={tag} />
          </div>
        );
      });
    }
  };

  return (
    <div className="filter-dropdown-container">
      <div className="dropdown-options">{populateFilterLabels()}</div>
      <div className="dropdown-buttons">
        <Button secondary compact className="filter-dropdown-button">
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
