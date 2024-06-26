import { PureComponent } from "react";
import "./index.scss";
import { Button, Rate, Input } from "antd";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
class ReviewAIView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputUrl: "",
      reviews: null,
      product: null,
    };
  }
  componentDidMount() {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-img-product",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    this.lightbox.init();
  }
  componentWillUnmount() {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  }
  renderMorePhoto() {
    const { product } = this.state
    return (
      <>
      {product.images.map((image, index) => (
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
    </>
    );
  }

  handleInputChange(e) {
    this.setState({ inputUrl: e.target.value });
  }
  handleClickReview = async () => {
    const { inputUrl } = this.state;
    const apiUrl = this.getReviewAPIUrl(inputUrl);
    const productApiUrl = this.getProductAPIUrl(inputUrl);
    
    if (apiUrl && productApiUrl) {
      try {
        const [reviewsResponse, productResponse] = await Promise.all([
          fetch(apiUrl),
          fetch(productApiUrl),
        ]);

        const reviewsData = await reviewsResponse.json();
        const productData = await productResponse.json();

        this.setState({ reviews: reviewsData, product: productData });
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      }
    }
};

getProductAPIUrl(inputUrl) {
  try {
    const url = new URL(inputUrl);
    const searchParams = new URLSearchParams(url.search);
    const spid = searchParams.get("spid");
    const productIdMatch = url.pathname.match(/-p(\d+)\.html/);
    const product_id = productIdMatch ? productIdMatch[1] : null;

    if (!spid || !product_id) {
      throw new Error("URL không chứa đủ thông tin cần thiết.");
    }

    const productApiUrl = `https://tiki.vn/api/v2/products/${product_id}?platform=web&spid=${spid}&version=3`;

    return productApiUrl;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    return null;
  }
}

  getReviewAPIUrl(inputUrl) {
    try {
      const url = new URL(inputUrl);
      const searchParams = new URLSearchParams(url.search);
      const spid = searchParams.get("spid");
      const productIdMatch = url.pathname.match(/-p(\d+)\.html/);
      const product_id = productIdMatch ? productIdMatch[1] : null;
      const seller_id = 1;

      if (!spid || !product_id) {
        throw new Error("URL không chứa đủ thông tin cần thiết.");
      }

      const apiUrl = `https://tiki.vn/api/v2/reviews?limit=5&include=comments,contribute_info,attribute_vote_summary&sort=score%7Cdesc,id%7Cdesc,stars%7Call&page=1&spid=${spid}&product_id=${product_id}&seller_id=${seller_id}`;

      return apiUrl;
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      return null;
    }
  }

  renderInput() {
    const { reviews } = this.state
    const height = reviews ? 40 : 80
    return (
      <div className="input-containers" style={{ height: height }}>
        <Input
          className="input-link"
          placeholder="Hãy nhập link sản phẩm cần review"
          value={this.state.inputUrl}
          onChange={this.handleInputChange.bind(this)}
        />
        <Button className="btn-review" onClick={this.handleClickReview}>
          Xem đánh giá
        </Button>
      </div>
    );
  }

  renderInfo() {
    const { reviews, product } = this.state
    return (
      <div className="review-info">
        <div className="image-col">
          <div className="product-img">
            <img className="" src={product.thumbnail_url} alt="Product Image" />
          </div>
          <div className="more-product-img" id="gallery-img-product">
            {this.renderMorePhoto()}
          </div>
        </div>
        <div className="review-col">
          <span className="point-review">{reviews.rating_average}</span>
          <Rate
            style={{ color: "#4007E4" }}
            disabled
            allowHalf
            defaultValue={reviews.rating_average}
          />
          <span className="ai-review">Rất tốt, đáng mua</span>
          <Button className="buy-btn">Mua hàng</Button>
        </div>
        <div className="info-col">
          <span className="product-name">{product.name}</span>
          <span className="product-brand">{product.brand.name || product.authors.name}</span>
          <span className="product-type">{product.categories.name}</span>
          <span className="product-price">{product.price} đồng</span>
          <div className="product-describe">
            {product.short_description}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { reviews, product } = this.state
    return <div className="review-ai-containers">
      {this.renderInput()}
      {reviews && product && this.renderInfo()}
    </div>;
  }
}

export default ReviewAIView;
