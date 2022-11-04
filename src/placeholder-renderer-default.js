import { jsx as _jsx } from "react/jsx-runtime";
import { classnames } from './utils/classnames';
import './placeholder-renderer-default.css';
const defaultProps = {
    isOver: false,
    canDrop: false,
};
const PlaceholderRendererDefault = function (props) {
    props = { ...defaultProps, ...props };
    const { canDrop, isOver } = props;
    return (_jsx("div", { className: classnames('rst__placeholder', canDrop ? 'rst__placeholderLandingPad' : '', canDrop && !isOver ? 'rst__placeholderCancelPad' : '') }));
};
export default PlaceholderRendererDefault;
