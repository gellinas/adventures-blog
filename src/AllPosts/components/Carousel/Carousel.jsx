import { useState, useEffect } from "react";
import { Button, Icon, Image } from "semantic-ui-react";

import { getCategories } from "../../../api.js";

import "./Carousel.scss";

function Carousel(props) {
  const [categories, setCategories] = useState([]);
  const [categoriesInView, setCategoriesInView] = useState(0);
  const [circleIconOne, setCircleIconOne] = useState("circle");
  const [circleIconTwo, setCircleIconTwo] = useState("circle outline");

  useEffect(async () => {
    setCategories(await getCategories());
  }, []);

  useEffect(() => {
    const handleCircleIcon = () => {
      if (categoriesInView > 3) {
        setCircleIconOne("circle outline");
        setCircleIconTwo("circle");
      } else if (categoriesInView >= 0 && categoriesInView <= 3) {
        setCircleIconOne("circle");
        setCircleIconTwo("circle outline");
      }
    };
    handleCircleIcon();
  }, [categoriesInView]);

  const onForwardClick = () => {
    if (categoriesInView < categories.length - 4) {
      setCategoriesInView(categoriesInView + 1);
    }
  };

  const onBackwardClick = () => {
    if (categoriesInView > 0) {
      setCategoriesInView(categoriesInView - 1);
    }
  };

  const onCircleIconOneClick = () => {
    setCategoriesInView(0);
  };

  const onCircleIconTwoClick = () => {
    setCategoriesInView(4);
  };

  return (
    <div className="carousel-wrapper">
      <div className="category-slider">
        <Button icon="angle left" onClick={onBackwardClick} />
        <div className="categories-container">
          {categories.map((category, index) => {
            if (index >= categoriesInView && index < categoriesInView + 4) {
              return (
                <div
                  className="category-container"
                  key={index}
                  onClick={() =>
                    props.history.push("/search", {
                      carouselCategory: category.label,
                    })
                  }
                >
                  <Image src={category.image} size="tiny" />
                  <div className="image-overlay">
                    <div className="image-text">
                      <div className="category-name">{category.label}</div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <Button icon="angle right" onClick={onForwardClick} />
      </div>
      <Button.Group icon>
        <Button onClick={onCircleIconOneClick}>
          <Icon name={circleIconOne} />
        </Button>
        <Button onClick={onCircleIconTwoClick}>
          <Icon name={circleIconTwo} />
        </Button>
      </Button.Group>
    </div>
  );
}

export default Carousel;
