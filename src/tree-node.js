import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, Component, cloneElement } from "react";
import { classnames } from "./utils/classnames";
import "./tree-node.css";
const defaultProps = {
    swapFrom: undefined,
    swapDepth: undefined,
    swapLength: undefined,
    canDrop: false,
    draggedNode: undefined,
    rowDirection: "ltr",
};
class TreeNodeComponent extends Component {
    node;
    render() {
        const props = { ...defaultProps, ...this.props };
        const { children, listIndex, swapFrom, swapLength, swapDepth, scaffoldBlockPxWidth, lowerSiblingCounts, connectDropTarget, isOver, draggedNode, canDrop, treeIndex, rowHeight, treeId: _treeId, // Delete from otherProps
        getPrevRow: _getPrevRow, // Delete from otherProps
        node: _node, // Delete from otherProps
        path: _path, // Delete from otherProps
        rowDirection, ...otherProps } = props;
        const rowDirectionClass = rowDirection === "rtl" ? "rst__rtl" : undefined;
        // Construct the scaffold representing the structure of the tree
        const scaffoldBlockCount = lowerSiblingCounts.length;
        const scaffold = [];
        for (const [i, lowerSiblingCount] of lowerSiblingCounts.entries()) {
            let lineClass = "";
            if (lowerSiblingCount > 0) {
                // At this level in the tree, the nodes had sibling nodes further down
                if (listIndex === 0) {
                    // Top-left corner of the tree
                    // +-----+
                    // |     |
                    // |  +--+
                    // |  |  |
                    // +--+--+
                    lineClass = "rst__lineHalfHorizontalRight rst__lineHalfVerticalBottom";
                }
                else if (i === scaffoldBlockCount - 1) {
                    // Last scaffold block in the row, right before the row content
                    // +--+--+
                    // |  |  |
                    // |  +--+
                    // |  |  |
                    // +--+--+
                    lineClass = "rst__lineHalfHorizontalRight rst__lineFullVertical";
                }
                else {
                    // Simply connecting the line extending down to the next sibling on this level
                    // +--+--+
                    // |  |  |
                    // |  |  |
                    // |  |  |
                    // +--+--+
                    lineClass = "rst__lineFullVertical";
                }
            }
            else if (listIndex === 0) {
                // Top-left corner of the tree, but has no siblings
                // +-----+
                // |     |
                // |  +--+
                // |     |
                // +-----+
                lineClass = "rst__lineHalfHorizontalRight";
            }
            else if (i === scaffoldBlockCount - 1) {
                // The last or only node in this level of the tree
                // +--+--+
                // |  |  |
                // |  +--+
                // |     |
                // +-----+
                lineClass = "rst__lineHalfVerticalTop rst__lineHalfHorizontalRight";
            }
            scaffold.push(_jsx("div", { style: { width: scaffoldBlockPxWidth }, className: classnames("rst__lineBlock", lineClass, rowDirectionClass ?? "") }, `pre_${1 + i}`));
            if (treeIndex !== listIndex && i === swapDepth) {
                // This row has been shifted, and is at the depth of
                // the line pointing to the new destination
                let highlightLineClass = "";
                if (listIndex === swapFrom + swapLength - 1) {
                    // This block is on the bottom (target) line
                    // This block points at the target block (where the row will go when released)
                    highlightLineClass = "rst__highlightBottomLeftCorner";
                }
                else if (treeIndex === swapFrom) {
                    // This block is on the top (source) line
                    highlightLineClass = "rst__highlightTopLeftCorner";
                }
                else {
                    // This block is between the bottom and top
                    highlightLineClass = "rst__highlightLineVertical";
                }
                const style = rowDirection === "rtl"
                    ? {
                        width: scaffoldBlockPxWidth,
                        right: scaffoldBlockPxWidth * i,
                    }
                    : {
                        width: scaffoldBlockPxWidth,
                        left: scaffoldBlockPxWidth * i,
                    };
                scaffold.push(_jsx("div", { style: style, className: classnames("rst__absoluteLineBlock", highlightLineClass, rowDirectionClass ?? "") }, i));
            }
        }
        const style = rowDirection === "rtl"
            ? { right: scaffoldBlockPxWidth * scaffoldBlockCount }
            : { left: scaffoldBlockPxWidth * scaffoldBlockCount };
        let calculatedRowHeight = rowHeight;
        if (typeof rowHeight === "function") {
            calculatedRowHeight = rowHeight(treeIndex, _node, _path);
        }
        return connectDropTarget(_jsxs("div", { ...otherProps, style: { height: `${calculatedRowHeight}px` }, className: classnames("rst__node", rowDirectionClass ?? ""), ref: (node) => (this.node = node), children: [scaffold, _jsx("div", { className: "rst__nodeContent", style: style, children: Children.map(children, (child) => cloneElement(child, {
                        isOver,
                        canDrop,
                        draggedNode,
                    })) })] }));
    }
}
export default TreeNodeComponent;
