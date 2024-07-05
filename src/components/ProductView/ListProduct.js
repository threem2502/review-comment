import { Component } from 'react';
import React from 'react';
import './index.scss';
import ListProductItem from './ListProductItem';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollLeft: 0,
    };
    this.productListRef = React.createRef();
  }

  handlePrevClick = () => {
    this.productListRef.current.scrollBy({
      left: -300, // Adjust the value as needed
      behavior: 'smooth',
    });
    this.setState({ scrollLeft: this.productListRef.current.scrollLeft });
  };

  handleNextClick = () => {
    this.productListRef.current.scrollBy({
      left: 300, // Adjust the value as needed
      behavior: 'smooth',
    });
    this.setState({ scrollLeft: this.productListRef.current.scrollLeft });
  };

  renderListProduct() {
    const { products } = this.props

    return products.map(product => {
      return <ListProductItem
        imgSrc={product.image}
        ratingAverage={product.rating_average}
        reviewCount={product.reviews_count}
        brand={product.brand}
        productName={product.product_name}
      />
    })
  }

  render() {
    const { listTitle, products } = this.props;
    const { scrollLeft } = this.state;
    const maxScrollLeft =
      this.productListRef.current &&
      this.productListRef.current.scrollWidth -
        this.productListRef.current.clientWidth;

    return (
      <div className='product-list-wrapper'>
        <h2 className='product-list-title'>{listTitle}</h2>
        <div className='product-list-container'>
          <button
            className='prev-button'
            onClick={this.handlePrevClick}
            disabled={scrollLeft <= 0}
          >
            <CaretLeft size={32} weight="duotone" />
          </button>
          <div className='product-list' ref={this.productListRef}>
            
            {this.renderListProduct()}
          </div>
          <button
            className='next-button'
            onClick={this.handleNextClick}
            disabled={
              this.productListRef.current &&
              scrollLeft >= maxScrollLeft
            }
          >
            <CaretRight size={32} weight="duotone" />
          </button>
        </div>
      </div>
    );
  }
}

export default ListProduct;
