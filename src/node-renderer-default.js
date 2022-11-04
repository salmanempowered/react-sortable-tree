import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classnames } from './utils/classnames';
import { isDescendant } from './utils/tree-data-utils';
import './node-renderer-default.css';
const defaultProps = {
    isSearchMatch: false,
    isSearchFocus: false,
    canDrag: false,
    toggleChildrenVisibility: undefined,
    buttons: [],
    className: '',
    style: {},
    parentNode: undefined,
    draggedNode: undefined,
    canDrop: false,
    title: undefined,
    subtitle: undefined,
    rowDirection: 'ltr',
};
const NodeRendererDefault = function (props) {
    props = { ...defaultProps, ...props };
    const { scaffoldBlockPxWidth, toggleChildrenVisibility, connectDragPreview, connectDragSource, isDragging, canDrop, canDrag, node, title, subtitle, draggedNode, path, treeIndex, isSearchMatch, isSearchFocus, buttons, className, style, didDrop, treeId: _treeId, isOver: _isOver, // Not needed, but preserved for other renderers
    parentNode: _parentNode, // Needed for dndManager
    rowDirection, ...otherProps } = props;
    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;
    const rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : undefined;
    let handle;
    if (canDrag) {
        handle =
            typeof node.children === 'function' && node.expanded ? (_jsx("div", { className: "rst__loadingHandle", children: _jsx("div", { className: "rst__loadingCircle", children: [...Array.from({ length: 12 })].map((_, index) => (_jsx("div", { className: classnames('rst__loadingCirclePoint', rowDirectionClass ?? '') }, index))) }) })) : (connectDragSource(_jsx("div", { className: "rst__moveHandle" }), {
                dropEffect: 'copy',
            }));
    }
    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;
    let buttonStyle = { left: -0.5 * scaffoldBlockPxWidth, right: 0 };
    if (rowDirection === 'rtl') {
        buttonStyle = { right: -0.5 * scaffoldBlockPxWidth, left: 0 };
    }
    return (_jsxs("div", { style: { height: '100%' }, ...otherProps, children: [toggleChildrenVisibility &&
                node.children &&
                (node.children.length > 0 || typeof node.children === 'function') && (_jsxs("div", { children: [_jsx("button", { type: "button", "aria-label": node.expanded ? 'Collapse' : 'Expand', className: classnames(node.expanded ? 'rst__collapseButton' : 'rst__expandButton', rowDirectionClass ?? ''), style: buttonStyle, onClick: () => toggleChildrenVisibility({
                            node,
                            path,
                            treeIndex,
                        }) }), node.expanded && !isDragging && (_jsx("div", { style: { width: scaffoldBlockPxWidth }, className: classnames('rst__lineChildren', rowDirectionClass ?? '') }))] })), _jsx("div", { className: classnames('rst__rowWrapper', rowDirectionClass ?? ''), children: connectDragPreview(_jsxs("div", { className: classnames('rst__row', isLandingPadActive ? 'rst__rowLandingPad' : '', isLandingPadActive && !canDrop ? 'rst__rowCancelPad' : '', isSearchMatch ? 'rst__rowSearchMatch' : '', isSearchFocus ? 'rst__rowSearchFocus' : '', rowDirectionClass ?? '', className ?? ''), style: {
                        opacity: isDraggedDescendant ? 0.5 : 1,
                        ...style,
                    }, children: [handle, _jsxs("div", { className: classnames('rst__rowContents', !canDrag ? 'rst__rowContentsDragDisabled' : '', rowDirectionClass ?? ''), children: [_jsxs("div", { className: classnames('rst__rowLabel', rowDirectionClass ?? ''), children: [_jsx("span", { className: classnames('rst__rowTitle', node.subtitle ? 'rst__rowTitleWithSubtitle' : ''), children: typeof nodeTitle === 'function'
                                                ? nodeTitle({
                                                    node,
                                                    path,
                                                    treeIndex,
                                                })
                                                : nodeTitle }), nodeSubtitle && (_jsx("span", { className: "rst__rowSubtitle", children: typeof nodeSubtitle === 'function'
                                                ? nodeSubtitle({
                                                    node,
                                                    path,
                                                    treeIndex,
                                                })
                                                : nodeSubtitle }))] }), _jsx("div", { className: "rst__rowToolbar", children: buttons?.map((btn, index) => (_jsx("div", { className: "rst__toolbarButton", children: btn }, index))) })] })] })) })] }));
};
export default NodeRendererDefault;
