import React, { Component } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css"; // Đảm bảo bạn đã cài đặt style của PhotoSwipe

class Lightbox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getContent().then(photo => {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery-img-product",
        dataSource: photo,
        pswpModule: () => import("photoswipe"),
      });
      this.lightbox.init();
    });
  }

  componentWillUnmount() {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  }

  getContent = async () => {
    const { content } = this.props;
    const photo = [];

    content.map((image, index) => {
      photo.push({
        src: image.base_url,
        width: 600,
        height: 600,
        alt: `thumbnail + ${index}`,
      });
    });

    return photo;
  } 

  render() {
    const { content } = this.props;
    return (
      <div id="gallery-img-product">
        {content.map((image, index) => (
          <a
            key={index}
            href={image.base_url}
            data-pswp-width="600"
            data-pswp-height="600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="thumbnail-img"
              src={image.thumbnail_url}
              alt={`Thumbnail ${index + 1}`}
            />
          </a>
        ))}
      </div>
    );
  }
}

export default Lightbox;
