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

    // The material ID.
    this.materials = [];

    // The texture ID.
    this.textureID = null;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds referenced node ID to this node's children array.
 */
addChild = function(nodeID) {
    this.children.push(nodeID);
}
getChildren = function (){
    return this.children;
}

}