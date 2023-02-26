import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { is, fromJS } from "immutable";
import PropTypes from "prop-types";
import { saveFormData, clearData } from "@/store/home/action";
import { clearSelected } from "@/store/production/action";
import PublicHeader from "@/components/header/header";
import PublicAlert from "@/components/alert/alert";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import { padStr } from "@/utils/parseText";
import "./home.less";

class Home extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelected: PropTypes.func.isRequired,
  };

  state = {
    alertStatus: false, //弹框状态
    alertTip: "", //弹框提示文字
  };
  /**
   * 已选择的商品数据
   * @type {Array}
   */
  selectedProList = [];

  /**
   * 将表单数据保存至redux，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */
  handleInput = (type, event) => {
    let value = event.target.value;
    switch (type) {
      case "orderSum":
        value = value.replace(/\D/g, ""); // 全局替换[^0-9] 非数字
        break;
      case "name":
        break;
      case "phoneNo":
        value = padStr(value.replace(/\D/g, ""), [3, 7], " ");
        break;
      default:
    }
    this.props.saveFormData(value, type);
  };

  // 提交表单
  submitForm = () => {
    const { orderSum, name, phoneNo } = this.props.formData;
    let alertTip = "";
    if (!orderSum.toString().length) {
      alertTip = "请填写金额";
    } else if (!name.toString().length) {
      alertTip = "请填写姓名";
    } else if (!phoneNo.toString().length) {
      alertTip = "请填写正确的手机号";
    } else {
      alertTip = "添加数据成功";
      this.props.clearSelected();
      this.props.clearData();
    }
    this.setState({
      alertStatus: true,
      alertTip,
    });
  };

  // 关闭弹款
  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: "",
    });
  };

  // 初始化数据，获取已选择的商品
  initData = (props) => {
    this.selectedProList = [];
    props.proData.dataList.forEach((item) => {
      if (item.selectNum) {
        this.selectedProList.push(item);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!is(fromJS(this.props.proData), fromJS(nextProps.proData))) {
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }

  componentWillMount() {
    this.initData(this.props);
  }

  render() {
    return (
      <main className="home-container">
        <PublicHeader title="首页" record />
        <p className="common-title">请录入订单信息</p>
        <form className="home-form">
          <div className="home-form-tiem">
            <span>订单金额：</span>
            <input
              type="text"
              placeholder="请输入订单金额"
              value={this.props.formData.orderSum}
              onChange={this.handleInput.bind(this, "orderSum")}
            />
          </div>
          <div className="home-form-tiem">
            <span>客户姓名：</span>
            <input
              type="text"
              placeholder="请输入客户姓名"
              value={this.props.formData.name}
              onChange={this.handleInput.bind(this, "name")}
            />
          </div>
          <div className="home-form-tiem">
            <span>客户电话：</span>
            <input
              type="text"
              maxLength="13"
              placeholder="请输入客户电话"
              value={this.props.formData.phoneNo}
              onChange={this.handleInput.bind(this, "phoneNo")}
            />
          </div>
        </form>
        <div>
          <p className="common-title">请选择销售产品</p>
          <Link to="/production" className="common-select-btn">
            {this.selectedProList.length ? (
              <ul className="selected-pro-list">
                {this.selectedProList.map((item, index) => {
                  return (
                    <li key={index} className="selected-pro-item ellipsis">
                      {item.product_name}x{item.selectNum}
                    </li>
                  );
                })}
              </ul>
            ) : (
              "选择产品"
            )}
          </Link>
        </div>
        <ConfirmButton
          className="submit-btn"
          clickCallBack={this.submitForm}
          text="提交"
        />
        <PublicAlert
          closeAlert={this.closeAlert}
          alertTip={this.state.alertTip}
          alertStatus={this.state.alertStatus}
        />
      </main>
    );
  }
}

export default connect(
  (state) => ({
    formData: state.formData,
    proData: state.proData,
  }),
  {
    saveFormData,
    clearData,
    clearSelected,
  }
)(Home);
