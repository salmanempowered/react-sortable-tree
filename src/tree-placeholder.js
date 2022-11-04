import { jsx as _jsx } from "react/jsx-runtime";
import { Children, cloneElement } from 'react';
const defaultProps = {
    canDrop: false,
    draggedNode: undefined,
};
const TreePlaceholder = (props) => {
    props = { ...defaultProps, ...props };
    const { children, connectDropTarget, treeId, drop, ...otherProps } = props;
    return connectDropTarget(_jsx("div", { children: Children.map(children, (child) => cloneElement(child, {
            ...otherProps,
        })) }));
};
export default TreePlaceholder;
