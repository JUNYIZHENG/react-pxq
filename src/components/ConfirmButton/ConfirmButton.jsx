import React, { Component } from "react";
import PropTypes from "prop-types";
import { is, fromJS } from "immutable";
import "./ConfirmButton.less";
/**
 * 点击状态组件
 */
export default class ConfirmButton extends Component {
  static propTypes = {
    clickCallBack: PropTypes.func,
    text: PropTypes.string,
    className: PropTypes.string,
  };

  handleClick = () => {
    this.props.clickCallBack();
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }

  render() {
    return (
      <div
        className={`btn-con ${this.props.className}`}
        onClick={this.handleClick}
        ref="btn"
      >
        {this.props.text || "确认"}
      </div>
    );
  }
}
