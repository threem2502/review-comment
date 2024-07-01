import { Component } from "react";
import "./index.scss";
import { Button, Rate, Input } from "antd";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import Lightbox from "../Lightbox";
class ReviewAIView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUrl: "",
      reviews: null,
      product: null,
      buyUrl: "",
    };
  }
  

  handleInputChange(e) {
    this.setState({ inputUrl: e.target.value, buyUrl: e.target.value });
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
            this.setState({ reviews: reviewsData, product: productData, inputUrl: "" });
            // Save product data to FastAPI backend
            await fetch("http://localhost:8000/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  image: productData.thumbnail_url,
                  rating_average: reviewsData.rating_average,
                  reviews_count: reviewsData.reviews_count,
                  brand: productData.brand?.name || productData.authors.name,
                  product_name: productData.name
                })
            });

            
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

  handleBuyProduct() {
    const { buyUrl } = this.state
    window.open(buyUrl, '_blank');
  }

  getReviewAPIUrl(inputUrl) {
    try {
      const url = new URL(inputUrl);
      const searchParams = new URLSearchParams(url.search);
      const spid = searchParams.get("spid");
      const productIdMatch = url.pathname.match(/-p(\d+)\.html/);
      const product_id = productIdMatch ? productIdMatch[1] : null;

      if (!spid || !product_id) {
        throw new Error("URL không chứa đủ thông tin cần thiết.");
      }

      const apiUrl = `https://tiki.vn/api/v2/reviews?limit=20&include=comments,contribute_info,attribute_vote_summary&sort=score%7Cdesc,id%7Cdesc,stars%7Call&page=1&spid=${spid}&product_id=${product_id}`;

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

    const recommentText = reviews.rating_average > 4.5 ? "Rất tốt, đáng để mua" : reviews.rating_average >= 4 ?  "Chất lượng khá, có thể mua" : "Sản phẩm tệ, không nên mua"
    return (
      <div className="review-info">
        <div className="image-col">
          <div className="product-img">
            <img className="" src={product.thumbnail_url} alt="Product Image" />
          </div>
          <div className="more-product-img" id="gallery-img-product">
            <Lightbox content={product.images} />
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
          <span className="ai-review">{recommentText}</span>
          <Button className="buy-btn" onClick={this.handleBuyProduct.bind(this)}>Mua hàng</Button>
        </div>
        <div className="info-col">
          <span className="product-name">{product.name}</span>
          <span className="product-brand">{product.brand?.name || product.authors.name}</span>
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
