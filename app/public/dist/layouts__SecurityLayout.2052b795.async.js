(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"0jlH":function(e,n,t){"use strict";t.r(n);var r=t("43Yg"),i=t.n(r),a=t("/tCh"),s=t.n(a),o=t("scpF"),u=t.n(o),c=t("O/V9"),d=t.n(c),l=t("8aBX"),p=t.n(l),h=t("i9FB"),f=t.n(h),w=t("LneV"),y=t("pa7U"),v=t("XuRK"),g=t("bIAK"),b=function(e){function n(){var e;return i()(this,n),e=u()(this,d()(n).apply(this,arguments)),e.state={isReady:!1},e}return p()(n,e),s()(n,[{key:"componentDidMount",value:function(){this.setState({isReady:!0});var e=this.props.dispatch;e&&e({type:"user/fetchCurrent"})}},{key:"render",value:function(){var e=this.state.isReady,n=this.props,t=n.children,r=n.loading,i=n.currentUser,a=i&&i.userid,s=Object(v["stringify"])({redirect:window.location.href});return!a&&r||!e?f.a.createElement(g["default"],null):a?t:f.a.createElement(y["a"],{to:"/user/login?".concat(s)})}}]),n}(f.a.Component);n["default"]=Object(w["connect"])(function(e){var n=e.user,t=e.loading;return{currentUser:n.currentUser,loading:t.models.user}})(b)}}]);