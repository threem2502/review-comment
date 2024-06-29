import { Rate } from "antd";
import { Component } from "react";
import './index.scss'

class ListProductItem extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="product-item-wrapper">
        <img className="product-img" src="images/product-test.jpeg" />
        <span className="point-review product-item-point">4.6</span>
        <div className="product-rating">
          <Rate 
            style={{ color: "#4007E4"}}
            disabled
            allowHalf
            defaultValue={4.6}
          />
          <span className="product-count-review">553 đánh giá</span>
        </div>
        <span className="product-item-brand">ASUS</span>
        <span className="product-item-name">ASUS X501</span>
      </div>
    )
  }
}

export default ListProductItem;