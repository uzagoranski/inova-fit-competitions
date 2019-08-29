"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
class Navigation extends react_1.Component {
    render() {
        return (<div className="navbar">
                <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <react_router_dom_1.Link to="/" style={{
            fontFamily: "monospace"
        }} className="col s12 brand-logo center black-text">
                    <i className="material-icons">code</i>
                    Inova IT competition platform
                    </react_router_dom_1.Link>           
                </div>
                </nav>
            </div>);
    }
}
exports.default = Navigation;
//# sourceMappingURL=Navigation.js.map