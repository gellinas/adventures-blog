import { useState, useEffect } from "react";
import { Dropdown, Modal, Button } from "semantic-ui-react";
import { isEmpty } from "lodash";

import { getAdventures } from "../../../../api.js";
import BlogPostForm from "../BlogPostForm/BlogPostForm.jsx";

import "./EditBlogPost.scss";

function EditBlogPost(props) {
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [headerCardImage, setHeaderCardImage] = useState("");
  const [adventureDate, setAdventureDate] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [cardSummary, setCardSummary] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [postCategories, setPostCategories] = useState([]);
  const [selectedPublishedPost, setSelectedPublishedPost] = useState({});
  const [tempDropdownSelectedPost, setTempDropdownSelectedPost] = useState({});
  const [selectedDropdownPost, setSelectedDropdownPost] = useState(null);
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    setPublishedPosts(await getAdventures());
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedPublishedPost) && !open) {
      const dateFormat = selectedPublishedPost.date.split("T")[0];
      const datePostedFormat = selectedPublishedPost.date_posted.split("T")[0];
      setTitle(selectedPublishedPost.title);
      setSubtitle(selectedPublishedPost.sub_title);
      setHeaderCardImage(selectedPublishedPost.main_image);
      setAdventureDate(dateFormat);
      setDatePosted(datePostedFormat);
      setCardSummary(selectedPublishedPost.summary);
      setPostTags(selectedPublishedPost.tags);
      setPostCategories(selectedPublishedPost.categories);
      setSections(selectedPublishedPost.post_section);
    }
  }, [selectedPublishedPost]);

  const publishedPostOptions = publishedPosts.map((post, index) => {
    return {
      key: index,
      value: index,
      text: post.title,
      ...post,
    };
  });

  const onPostOptionClick = (event, data) => {
    if (isEmpty(selectedPublishedPost)) {
      setSelectedPublishedPost(data.options[data.value]);
      setSelectedDropdownPost(data.value);
    } else {
      setOpen(true);
      setTempDropdownSelectedPost(data.options[data.value]);
    }
  };

  const onLoadPostFromModal = () => {
    setSelectedPublishedPost(tempDropdownSelectedPost);
    setSelectedDropdownPost(tempDropdownSelectedPost.value);
    const dateFormat = selectedPublishedPost.date.split("T")[0];
    const datePostedFormat = selectedPublishedPost.date_posted.split("T")[0];
    setTitle(selectedPublishedPost.title);
    setSubtitle(selectedPublishedPost.sub_title);
    setHeaderCardImage(selectedPublishedPost.main_image);
    setAdventureDate(dateFormat);
    setDatePosted(datePostedFormat);
    setCardSummary(selectedPublishedPost.summary);
    setPostTags(selectedPublishedPost.tags);
    setPostCategories(selectedPublishedPost.categories);
    setSections(selectedPublishedPost.post_section);
    setOpen(false);
  };

  return (
    <div className="edit-blog-post-container">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>Load a different blog post?</Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onLoadPostFromModal} positive>
            Load
          </Button>
        </Modal.Actions>
      </Modal>

      <div className="edit-blog-post-header">Edit A Published Post</div>

      <Dropdown
        placeholder="Load Published Post"
        search
        selection
        scrolling
        options={publishedPostOptions}
        onChange={onPostOptionClick}
        value={selectedDropdownPost}
      />

      <BlogPostForm
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        headerCardImage={headerCardImage}
        setHeaderCardImage={setHeaderCardImage}
        adventureDate={adventureDate}
        setAdventureDate={setAdventureDate}
        datePosted={datePosted}
        setDatePosted={setDatePosted}
        cardSummary={cardSummary}
        setCardSummary={setCardSummary}
        postTags={postTags}
        setPostTags={setPostTags}
        postCategories={postCategories}
        setPostCategories={setPostCategories}
        sections={sections}
        selectedPost={selectedPublishedPost}
      />
    </div>
  );
}

export default EditBlogPost;
