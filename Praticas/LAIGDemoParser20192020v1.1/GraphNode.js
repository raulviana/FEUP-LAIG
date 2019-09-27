/**
 * GraphNode, class represents intermediate node.
 * @constructor
 **/

class GraphNode {
    constructor(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The materials
    this.materials = [];

    // The texture ID.
    this.textureID = null;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
addLeaf = function(leaf) {
    this.leaves.push(leaf);
}
}