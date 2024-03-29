import { Card, Image, Icon } from "semantic-ui-react";

import "./BlogPostCard.scss";

function BlogPostCard(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(props.blogPostData.date);
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const newDate = month + ` ` + year.toString();

  return (
    <div className="blog-post-card" key={props.index}>
      <Card>
        <div className="blog-post-card-img-holder">
          <Image
            src={`https://adventures-archive.s3.amazonaws.com/${props.blogPostData.main_image}`}
            className="blog-post-card-img"
            onClick={() => {
              props.history.push("/post", { blogPostData: props.blogPostData });
              window.scrollTo(0, 0);
            }}
            fluid
          />
        </div>
        <Card.Content className="blog-post-card-content-holder">
          <Card.Header
            onClick={() => {
              props.history.push("/post", { blogPostData: props.blogPostData });
              window.scrollTo(0, 0);
            }}
          >
            {props.blogPostData.title}
          </Card.Header>
          <Card.Meta>
            <span className="date">{newDate}</span>
          </Card.Meta>
          <Card.Description>{props.blogPostData.summary}</Card.Description>
          <div
            className="read-more"
            onClick={() => {
              props.history.push("/post", { blogPostData: props.blogPostData });
              window.scrollTo(0, 0);
            }}
          >
            read more
            <Icon name="long arrow alternate right" size="large" />
          </div>
        </Card.Content>
        <Card.Content extra>
          {props.blogPostData.tags.map((value, index) => (
            <a
              className="tag-link"
              key={index}
              onClick={() => {
                props.history.push("/search", { blogPostCardTag: value });
                window.scrollTo(0, 0);
              }}
            >
              {value}
            </a>
          ))}
        </Card.Content>
      </Card>
    </div>
  );
}

export default BlogPostCard;
