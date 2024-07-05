import React, { Component } from "react";
import { Input, Button } from "antd";
import './index.scss'

class DetectReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputComment: "",
      result: null,
    };
  }

  handleInputChange(e) {
    this.setState({ inputComment: e.target.value });
  }

  async handleClickDetect() {
    const { inputComment } = this.state;
    if (!inputComment) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/detect/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputComment }),
      });
      const data = await response.json();
      this.setState({ result: data });
    } catch (error) {
      console.error("Error detecting review:", error);
    }
  }

  renderInput() {
    return (
      <div className="input-containers" style={{ height: 40 }}>
        <Input
          className="input-link"
          placeholder="Hãy nhập câu bình luận cần phân tích"
          value={this.state.inputComment}
          onChange={this.handleInputChange.bind(this)}
        />
        <Button className="btn-review" onClick={this.handleClickDetect.bind(this)}>
          Phân tích
        </Button>
      </div>
    );
  }

  renderResult() {
    const { result } = this.state;
    if (!result) {
      return null;
    }

    return (
      <div className="result-wrapper">
        <span className="result-good">Đánh giá tốt: {result.Tốt}</span>
        <span className="result-normal">Đánh giá bình thường: {result["Bình thường"]}</span>
        <span className="result-bad">Đánh giá tệ: {result.Tệ}</span>
      </div>
    );
  }

  render() {
    return (
      <div className="review-ai-containers">
        {this.renderInput()}
        {this.renderResult()}
      </div>
    );
  }
}

export default DetectReview;
