import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import home from "@/pages/home/home";
import record from "@/pages/record/record";
import production from "@/pages/production/production";

export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        {/* 渲染第一个被location匹配到的并且作为子元素的<Route>或者<Redirect> */}
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/record" component={record} />
          <Route path="/production" component={production} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}
