import { Component } from "react";
import './index.scss';
import { Carousel } from "antd";
import ListProduct from "./ListProduct";
class ProductView extends Component {

  constructor(props) {
    super(props)
  }
  render() {
    const hotProductText = "Sản phẩm nổi bật"
    const newProductText = "Sản phẩm gần đây"
    return (
      <div className="product-view-wrapper">
        <ListProduct 
          listTitle={hotProductText}
        />
        <div className="bar">
          <img src="images/banner.jpeg"/>
        </div>
        <ListProduct 
          listTitle={newProductText}
        />
      </div>
      
    )
  }
}

export default ProductView;