import { useState, useEffect } from "react";
import { Dropdown, Modal, Button } from "semantic-ui-react";
import { isEmpty } from "lodash";

import BlogPostForm from "../BlogPostForm/BlogPostForm.jsx";
import { getDraftAdventures } from "../../../../api.js";

import "./CreateBlogPost.scss";

function CreateBlogPost(props) {
  const [draftAdventure, setDraftAdventure] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [headerCardImage, setHeaderCardImage] = useState("");
  const [adventureDate, setAdventureDate] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [cardSummary, setCardSummary] = useState("");
  const [link, setLink] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [postCategories, setPostCategories] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState({});
  const [tempDropdownSelectedDraft, setTempDropdownSelectedDraft] = useState(
    {}
  );
  const [selectedDropdownDraft, setSelectedDropdownDraft] = useState(null);
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    setDraftAdventure(await getDraftAdventures());
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedDraft) && !open) {
      const dateFormat = selectedDraft.date.split("T")[0];
      const datePostedFormat = selectedDraft.date_posted.split("T")[0];
      setTitle(selectedDraft.title);
      setSubtitle(selectedDraft.sub_title);
      setHeaderCardImage(selectedDraft.main_image);
      setAdventureDate(dateFormat);
      setDatePosted(datePostedFormat);
      setCardSummary(selectedDraft.summary);
      setPostTags(selectedDraft.tags);
      setPostCategories(selectedDraft.categories);
      setSections(selectedDraft.post_section);
      setLink(selectedDraft.link);
    }
  }, [selectedDraft]);

  const draftOptions = draftAdventure.map((post, index) => {
    return {
      key: index,
      value: index,
      text: post.title,
      ...post,
    };
  });

  const onDraftOptionClick = (event, data) => {
    if (isEmpty(selectedDraft)) {
      setSelectedDraft(data.options[data.value]);
      setSelectedDropdownDraft(data.value);
    } else {
      setOpen(true);
      setTempDropdownSelectedDraft(data.options[data.value]);
    }
  };

  const onLoadDraftFromModal = () => {
    setSelectedDraft(tempDropdownSelectedDraft);
    setSelectedDropdownDraft(tempDropdownSelectedDraft.value);
    const dateFormat = selectedDraft.date.split("T")[0];
    const datePostedFormat = selectedDraft.date_posted.split("T")[0];
    setTitle(selectedDraft.title);
    setSubtitle(selectedDraft.sub_title);
    setHeaderCardImage(selectedDraft.main_image);
    setAdventureDate(dateFormat);
    setDatePosted(datePostedFormat);
    setCardSummary(selectedDraft.summary);
    setPostTags(selectedDraft.tags);
    setPostCategories(selectedDraft.categories);
    setSections(selectedDraft.post_section);
    setLink(selectedDraft.link);
    setOpen(false);
  };

  return (
    <div className="create-blog-post-container">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>Load a different draft?</Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onLoadDraftFromModal} positive>
            Load
          </Button>
        </Modal.Actions>
      </Modal>

      <div className="create-blog-post-header">Create Blog Post</div>

      <Dropdown
        placeholder="Load Draft"
        search
        selection
        scrolling
        options={draftOptions}
        onChange={onDraftOptionClick}
        value={selectedDropdownDraft}
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
        selectedPost={selectedDraft}
        link={link}
        setLink={setLink}
      />
    </div>
  );
}

export default CreateBlogPost;
