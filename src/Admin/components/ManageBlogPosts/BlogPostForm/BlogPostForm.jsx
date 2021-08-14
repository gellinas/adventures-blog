import { useState, useEffect } from "react";
import {
  Button,
  Form,
  TextArea,
  Divider,
  Grid,
  Confirm,
} from "semantic-ui-react";

import {
  deleteAdventure,
  getCategories,
  getTags,
  publishAdventure,
  updateAdventure,
} from "../../../../api.js";

import "./BlogPostForm.scss";

function BlogPostForm(props) {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [numberOfSections, setNumberOfSections] = useState(1);
  const [sectionsArray, setSectionsArray] = useState([]);
  const [confirmPostToBlog, setConfirmPostToBlog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(async () => {
    setCategories(await getCategories());
    setTags(await getTags());
  }, []);

  // Single Section Object Structure
  const section = {
    section_title: "",
    section_text: "",
    images: [
      {
        src: "",
        date: "",
        location: "",
        orientation: "",
        description: "",
      },
      {
        src: "",
        date: "",
        location: "",
        orientation: "",
        description: "",
      },
    ],
  };

  useEffect(() => {
    if (sectionsArray.length < numberOfSections) {
      // User has clicked to add a section to sectionsArray
      setSectionsArray((currentArray) => [...currentArray, section]);
    } else if (sectionsArray.length > numberOfSections) {
      const newSectionsArray = sectionsArray.slice(0, -1);
      setSectionsArray(newSectionsArray);
    }
  }, [numberOfSections]);

  useEffect(() => {
    if (props.sections.length > 0) {
      setNumberOfSections(props.sections.length);
      setSectionsArray(props.sections);
    }
  }, [props.sections]);

  // Updates single section of sectionsArray
  // parameters:
  //  - index: index of section being updated
  //  - field: field in section object being updated
  //  - value: value being set to field
  const updateSectionsArray = (index, field, value) => {
    sectionsArray[index][field] = value; // Updates value of field
    setSectionsArray((currentArray) => [...sectionsArray]); // Uses callback to spread sectionsArray
  };

  const updateImageOfSection = (sectionIndex, imageIndex, field, value) => {
    sectionsArray[sectionIndex].images[imageIndex][field] = value; // updates values of single image
    setSectionsArray((currentArray) => [...sectionsArray]);
  };

  const tagsOptions = () => {
    return tags.map((tag, index) => {
      return { key: tag, value: tag, text: tag };
    });
  };

  const categoriesOptions = () => {
    return categories.map((category, index) => {
      return {
        key: category.label,
        value: category.label,
        text: category.label,
      };
    });
  };

  const imageOrientationOptions = [
    { key: "portrait", text: "portrait", value: "portrait" },
    { key: "landscape", text: "landscape", value: "landscape" },
  ];

  const onAddSectionClick = () => {
    setNumberOfSections(numberOfSections + 1);
  };

  const onSubtractSectionClick = () => {
    if (numberOfSections > 1) {
      setNumberOfSections(numberOfSections - 1);
    }
  };

  const onPostToBlogClick = async () => {
    let response;
    if (props.selectedPost.id) {
      const blogPost = {
        title: props.title,
        main_image: props.headerCardImage,
        sub_title: props.subtitle,
        date: props.adventureDate,
        date_posted: props.datePosted,
        summary: props.cardSummary,
        post_section: sectionsArray,
        categories: props.postCategories,
        tags: props.postTags,
        draft: false,
        id: props.selectedPost.id,
      };
      response = await updateAdventure(blogPost);
    } else {
      const blogPost = {
        title: props.title,
        main_image: props.headerCardImage,
        sub_title: props.subtitle,
        date: props.adventureDate,
        date_posted: props.datePosted,
        summary: props.cardSummary,
        post_section: sectionsArray,
        categories: props.postCategories,
        tags: props.postTags,
        draft: false,
      };
      response = await publishAdventure(blogPost);
    }
    setConfirmPostToBlog(false);
  };

  const onSaveAsDraftClick = async () => {
    let response;
    if (props.selectedPost.id) {
      const blogPost = {
        title: props.title,
        main_image: props.headerCardImage,
        sub_title: props.subtitle,
        date: props.adventureDate,
        date_posted: props.datePosted,
        summary: props.cardSummary,
        post_section: sectionsArray,
        categories: props.postCategories,
        tags: props.postTags,
        draft: true,
      };
      response = await updateAdventure(blogPost);
    } else {
      const blogPost = {
        title: props.title,
        main_image: props.headerCardImage,
        sub_title: props.subtitle,
        date: props.adventureDate,
        date_posted: props.datePosted,
        summary: props.cardSummary,
        post_section: sectionsArray,
        categories: props.postCategories,
        tags: props.postTags,
        draft: true,
      };
      response = await publishAdventure(blogPost);
    }
  };

  const onDeleteClick = async () => {
    const blogPost = {
      title: props.title,
      main_image: props.headerCardImage,
      sub_title: props.subtitle,
      date: props.adventureDate,
      date_posted: props.datePosted,
      summary: props.cardSummary,
      post_section: sectionsArray,
      categories: props.postCategories,
      tags: props.postTags,
    };
    const response = await deleteAdventure(blogPost);
    setConfirmDelete(false);
  };

  return (
    <div className="blog-post-form-container">
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            label="Title"
            value={props.title}
            onChange={(e, data) => props.setTitle(data.value)}
          />
          <Form.Input
            label="Subtitle"
            value={props.subtitle}
            onChange={(e, data) => props.setSubtitle(data.value)}
          />
        </Form.Group>
        <Form.Input
          label="Header and Card Image"
          value={props.headerCardImage}
          onChange={(e, data) => props.setHeaderCardImage(data.value)}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Date of Adventure"
            type="date"
            value={props.adventureDate}
            onChange={(e, data) => props.setAdventureDate(data.value)}
          />
          <Form.Input
            label="Date Posted"
            type="date"
            value={props.datePosted}
            onChange={(e, data) => props.setDatePosted(data.value)}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label="Summary for Card"
          value={props.cardSummary}
          onChange={(e, data) => props.setCardSummary(data.value)}
        />
        <Form.Group widths="equal">
          <Form.Dropdown
            label="Tags"
            fluid
            multiple
            search
            selection
            options={tagsOptions()}
            value={props.postTags}
            onChange={(e, data) => props.setPostTags(data.value)}
          />
          <Form.Dropdown
            label="Categories"
            fluid
            multiple
            search
            selection
            options={categoriesOptions()}
            value={props.postCategories}
            onChange={(e, data) => props.setPostCategories(data.value)}
          />
        </Form.Group>
      </Form>

      <Divider horizontal> Sections </Divider>

      <div className="increment-section-container">
        <div> Number of Sections: </div>
        <Button
          basic
          color="black"
          compact
          icon="minus"
          size="mini"
          onClick={() => onSubtractSectionClick()}
        />
        <div> {numberOfSections} </div>
        <Button
          basic
          color="black"
          compact
          icon="add"
          size="mini"
          onClick={() => onAddSectionClick()}
        />
      </div>

      {/*Section Form*/}
      <div>
        {sectionsArray.map((singleSection, index) => {
          return (
            <Form key={index}>
              <Divider horizontal> Section {index + 1} </Divider>
              <Form.Input
                label="Section Title"
                value={sectionsArray[index].section_title}
                onChange={(e, data) =>
                  updateSectionsArray(index, "section_title", data.value)
                }
              />
              <Form.Field
                control={TextArea}
                label="Section Text"
                value={singleSection.section_text}
                onChange={(e, data) => {
                  updateSectionsArray(index, "section_text", data.value);
                }}
              />

              {/*Sections have 2 images */}
              <Grid divided="vertically">
                <Grid.Row columns={2} divided>
                  <Grid.Column>
                    <Form.Input
                      label="Section Image 1"
                      value={singleSection.images[0].src}
                      onChange={(e, data) => {
                        updateImageOfSection(index, 0, "src", data.value);
                      }}
                    />
                    <Form.Input
                      label="Image Description"
                      value={singleSection.images[0].description}
                      onChange={(e, data) => {
                        updateImageOfSection(
                          index,
                          0,
                          "description",
                          data.value
                        );
                      }}
                    />
                    <Form.Input
                      label="Image Location"
                      value={singleSection.images[0].location}
                      onChange={(e, data) => {
                        updateImageOfSection(index, 0, "location", data.value);
                      }}
                    />
                    <Form.Input
                      label="Image Date"
                      type="date"
                      value={singleSection.images[0].date.split("T")[0]}
                      onChange={(e, data) => {
                        updateImageOfSection(index, 0, "date", data.value);
                      }}
                    />
                    <Form.Select
                      label="Image Orientation"
                      options={imageOrientationOptions}
                      value={singleSection.images[0].orientation}
                      onChange={(e, data) => {
                        updateImageOfSection(
                          index,
                          0,
                          "orientation",
                          data.value
                        );
                      }}
                    />
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Input
                      label="Section Image 2"
                      value={singleSection.images[1].src}
                      onChange={(e, data) => {
                        updateImageOfSection(index, 1, "src", data.value);
                      }}
                    />
                    <Form.Input
                      label="Image Description"
                      value={singleSection.images[1].description}
                      onChange={(e, data) => {
                        updateImageOfSection(
                          index,
                          1,
                          "description",
                          data.value
                        );
                      }}
                    />
                    <Form.Input
                      label="Image Location"
                      value={singleSection.images[1].location}
                      onChange={(e, data) => {
                        updateImageOfSection(index, 1, "location", data.value);
                      }}
                    />
                    <Form.Input
                      label="Image Date"
                      type="date"
                      value={singleSection.images[1].date.split("T")[0]}
                      onChange={(e, data) => {
                        updateImageOfSection(index, 1, "date", data.value);
                      }}
                    />
                    <Form.Select
                      label="Image Orientation"
                      options={imageOrientationOptions}
                      value={singleSection.images[1].orientation}
                      onChange={(e, data) => {
                        updateImageOfSection(
                          index,
                          1,
                          "orientation",
                          data.value
                        );
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          );
        })}
      </div>

      <Button
        color="red"
        content="Delete"
        onClick={() => setConfirmDelete(true)}
      />
      <Confirm
        open={confirmDelete}
        content="Are you sure you want to delete?"
        confirmButton="Delete"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={onDeleteClick}
      />

      <Button
        color="yellow"
        content="Save as Draft"
        onClick={onSaveAsDraftClick}
      />

      <Button
        color="green"
        content="Post to Blog"
        onClick={() => setConfirmPostToBlog(true)}
      />
      <Confirm
        open={confirmPostToBlog}
        content="Are you sure you want to post to blog?"
        confirmButton="Post to Blog"
        onCancel={() => setConfirmPostToBlog(false)}
        onConfirm={onPostToBlogClick}
      />
    </div>
  );
}

export default BlogPostForm;
