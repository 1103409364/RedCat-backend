(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{508:function(n,e,t){"use strict";function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}t.d(e,"a",function(){return r})},702:function(n,e,t){"use strict";t.r(e);var r=t(508),a=t(137),o=t(138),i=t(141),u=t(139),c=t(142),l=t(140),s=t(1),p=t.n(s),d=t(86),b=t(53),h=t(56),f=t(219),m=t(20),g=t(21),x=t(143),v=t.n(x);function w(){var n=Object(m.a)(["\n    font-size: 12px;\n    height: 20px;\n    line-height: 20px;\n    color: red;\n"]);return w=function(){return n},n}function E(){var n=Object(m.a)(["\n    margin-top: 20px;\n    padding: 12px 18px;\n    font-size: 18px;\n    border-radius: 25px;\n    color: #fff;\n    background: #3194d0;\n    cursor: pointer;\n    text-align: center;\n"]);return E=function(){return n},n}function j(){var n=Object(m.a)(["\n    box-sizing: border-box;\n    width: 100%;\n    height: 50px;\n    // margin-bottom: 20px;\n    padding: 4px 12px;\n    border: 1px solid #c8c8c8;\n    border-radius: 4px;\n    background-color: hsla(0,0%,71%,.1);\n"]);return j=function(){return n},n}function O(){var n=Object(m.a)(["\n    font-weight: 700;\n    color: #ea6f5a;\n    border-bottom: 2px solid #ea6f5a;\n    float: left;\n"]);return O=function(){return n},n}function k(){var n=Object(m.a)(["\n    font-weight: 700;\n    border-bottom: 2px solid #fff;\n    float: left;\n    color: #969696;\n    margin-right: 30px;\n"]);return k=function(){return n},n}function C(){var n=Object(m.a)(["\n    width: 142px;\n    margin: 0 auto 30px auto;\n    padding: 10px;\n    font-weight: 400;\n    color: #969696;\n    span {\n        padding: 10px;\n        cursor: pointer;\n        font-size: 18px;\n    };\n    overflow: hidden;\n"]);return C=function(){return n},n}function y(){var n=Object(m.a)(["\n    width: 400px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-left: -200px;\n    margin-top: -270px;\n    box-sizing: border-box;\n    padding: 50px;\n    background-color: #fff;\n    border-radius: 4px;\n    box-shadow: 0 0 8px rgba(0,0,0,.1);\n"]);return y=function(){return n},n}function I(){var n=Object(m.a)(["\n    box-sizing: border-box;\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    background: url(",") no-repeat 90% bottom;\n    background-color: #eee;\n"]);return I=function(){return n},n}var z=g.b.div(I(),v.a),_=g.b.div(y()),S=g.b.h4(C()),U=g.b.span(k()),A=g.b.span(O()),D=g.b.input(j()),J=g.b.div(E()),P=g.b.div(w()),M=function(n){function e(){var n;return Object(a.a)(this,e),(n=Object(i.a)(this,Object(u.a)(e).call(this))).state={name:"",email:"",password:"",password_confirm:"",errors:{}},n.handleInputChange=n.handleInputChange.bind(Object(c.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n}return Object(l.a)(e,n),Object(o.a)(e,[{key:"handleInputChange",value:function(n){this.setState(Object(r.a)({},n.target.name,n.target.value))}},{key:"handleSubmit",value:function(n){n.preventDefault();var e={name:this.state.name,email:this.state.email,password:this.state.password,password_confirm:this.state.password_confirm};this.props.registerUser(e,this.props.history)}},{key:"componentDidMount",value:function(){document.title="\u6ce8\u518c-rr"}},{key:"componentWillUnmount",value:function(){this.props.clearErrors()}},{key:"render",value:function(){var n=this.props,e=n.isAuthenticated,t=n.errors;return e?p.a.createElement(h.a,{to:"/"}):p.a.createElement(z,null,p.a.createElement(_,null,p.a.createElement(S,null,p.a.createElement(b.b,{to:"/login"},p.a.createElement(U,null,"\u767b\u5f55")),p.a.createElement(b.b,{to:"/register"},p.a.createElement(A,null,"\u6ce8\u518c"))),p.a.createElement(D,{name:"name",placeholder:"\u7528\u6237\u540d",value:this.state.name,onChange:this.handleInputChange}),p.a.createElement(P,null,t.get("name")),p.a.createElement(D,{name:"email",placeholder:"\u90ae\u7bb1",value:this.state.email,onChange:this.handleInputChange}),p.a.createElement(P,null,t.get("email")),p.a.createElement(D,{name:"password",placeholder:"\u5bc6\u7801",type:"password",value:this.state.password,onChange:this.handleInputChange}),p.a.createElement(P,null,t.get("password")),p.a.createElement(D,{name:"password_confirm",placeholder:"\u786e\u8ba4\u5bc6\u7801",type:"password",value:this.state.password_confirm,onChange:this.handleInputChange}),p.a.createElement(P,null,t.get("password_confirm")),p.a.createElement(J,{onClick:this.handleSubmit},"\u6ce8\u518c")))}}]),e}(p.a.PureComponent);e.default=Object(d.b)(function(n){return{isAuthenticated:n.getIn(["login","isAuthenticated"]),errors:n.getIn(["register","errors"])}},function(n){return{registerUser:function(e,t){n(f.a.registerUser(e,t))},clearErrors:function(){n(f.a.clearErrors())}}})(Object(h.f)(M))}}]);
//# sourceMappingURL=8.4a93bb49.chunk.js.map