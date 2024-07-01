import { Component } from "react";
import './index.scss';
import { Carousel } from "antd";
import ListProduct from "./ListProduct";
import axios from "axios";
class ProductView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hotProducts: [],
      newProducts: []
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      // Gọi API để lấy danh sách sản phẩm
      const hotProductsResponse = await axios.get("http://localhost:8000/products/");
      const newProductsResponse = await axios.get("http://localhost:8000/products/"); // Nếu có endpoint riêng cho sản phẩm mới

      // Cập nhật state với dữ liệu lấy được từ API
      this.setState({
        hotProducts: hotProductsResponse.data,
        newProducts: newProductsResponse.data
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      // Xử lý lỗi nếu cần thiết
    }
  }
  render() {
    const hotProductText = "Sản phẩm nổi bật"
    const newProductText = "Sản phẩm gần đây"
    const { hotProducts, newProducts } = this.state
    return (
      <div className="product-view-wrapper">
        <ListProduct 
          listTitle={hotProductText}
          products={hotProducts}
        />
        <div className="bar">
          <img src="images/banner.jpeg"/>
        </div>
        <ListProduct 
          listTitle={newProductText}
          products={newProducts}
        />
      </div>
      
    )
  }
}

export default ProductView;