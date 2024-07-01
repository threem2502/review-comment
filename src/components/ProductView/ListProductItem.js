import { Rate } from "antd";
import { Component } from "react";
import './index.scss'

class ListProductItem extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const { imgSrc, ratingAverage, reviewCount, brand, productName } = this.props
    return(
      <div className="product-item-wrapper">
        <img className="product-img" src={imgSrc} />
        <span className="point-review product-item-point">{ratingAverage}</span>
        <div className="product-rating">
          <Rate 
            style={{ color: "#4007E4"}}
            disabled
            allowHalf
            defaultValue={ratingAverage}
          />
          <span className="product-count-review">{reviewCount}</span>
        </div>
        <span className="product-item-brand">{brand}</span>
        <span className="product-item-name">{productName}</span>
      </div>
    )
  }
}

export default ListProductItem;