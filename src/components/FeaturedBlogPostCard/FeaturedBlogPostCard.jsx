import "./FeaturedBlogPostCard.scss";
import { Card, Image, Icon } from "semantic-ui-react";

function FeaturedBlogPostCard(props) {
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
  const date = new Date(props.latestPost.date);
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const newDate = month + ` ` + year.toString();

  return (
    <div className="featured-blog-post-card-container">
      <Image
        src={`https://adventures-archive.s3.amazonaws.com/${props.latestPost.main_image}`}
        className="featrued-card-img"
        onClick={() => {
          props.history.push("/post", { blogPostData: props.latestPost });
          window.scrollTo(0, 0);
        }}
      />
      <Card>
        <Card.Content>
          <Card.Header
            className="featured-title"
            onClick={() => {
              props.history.push("/post", { blogPostData: props.latestPost });
              window.scrollTo(0, 0);
            }}
          >
            {props.latestPost.title}
          </Card.Header>
          <Card.Meta>
            <span>{newDate}</span>
          </Card.Meta>
          <Card.Description>{props.latestPost.summary}</Card.Description>
          <div
            className="read-more"
            onClick={() => {
              props.history.push("/post", { blogPostData: props.latestPost });
              window.scrollTo(0, 0);
            }}
          >
            read more
            <Icon name="long arrow alternate right" size="large" />
          </div>
        </Card.Content>
        <Card.Content extra>
          {(props.latestPost.tags || []).map((value, index) => (
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
export default FeaturedBlogPostCard;
