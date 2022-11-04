export const defaultGetNodeKey = ({ treeIndex }) => treeIndex;
// Cheap hack to get the text of a react object
const getReactElementText = (parent) => {
    if (typeof parent === 'string') {
        return parent;
    }
    if (parent === undefined ||
        typeof parent !== 'object' ||
        !parent.props ||
        !parent.props.children ||
        (typeof parent.props.children !== 'string' &&
            typeof parent.props.children !== 'object')) {
        return '';
    }
    if (typeof parent.props.children === 'string') {
        return parent.props.children;
    }
    return parent.props.children
        .map((child) => getReactElementText(child))
        .join('');
};
// Search for a query string inside a node property
const stringSearch = (key, searchQuery, node, path, treeIndex) => {
    if (typeof node[key] === 'function') {
        // Search within text after calling its function to generate the text
        return String(node[key]({ node, path, treeIndex })).includes(searchQuery);
    }
    if (typeof node[key] === 'object') {
        // Search within text inside react elements
        return getReactElementText(node[key]).includes(searchQuery);
    }
    // Search within string
    return node[key] && String(node[key]).includes(searchQuery);
};
export const defaultSearchMethod = ({ node, path, treeIndex, searchQuery, }) => {
    return (stringSearch('title', searchQuery, node, path, treeIndex) ||
        stringSearch('subtitle', searchQuery, node, path, treeIndex));
};
