// Represents the node in the tree. Will be displayed as a small circle in the browser.
// x, y --> x, y co-ordinates of the center of circle
// r    --> radius of the circle
// ctx  --> context of the canvas
// data --> data to be displayed (Only number)

var Node = function (x, y, r, ctx, data) {
    // left child of a node
    this.leftNode = null;
    // right child of a node
    this.rightNode = null;

    // draw function. Responsible for drawing the node
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeText(data, x, y);
    };

    // Simple getters
    this.getData = function () { return data; };
    this.getX = function () { return x; };
    this.getY = function () { return y; };
    this.getRadius = function () { return r; };

    // Returns coordinate for the left child
    // Go back 3 times radius in x axis and 
    // go down 3 times radius in y axis
    this.leftCoordinate = function () {
        return { cx: (x - (3 * r)), cy: (y + (3 * r)) }
    };
    // Same concept as above but for right child        
    this.rightCoordinate = function () {
        return { cx: (x + (3 * r)), cy: (y + (3 * r)) }
    };
};

// Draws a line from one circle(node) to another circle (node) 
var Line = function () {
    // Takes 
    // x,y      - starting x,y coordinate
    // toX, toY - ending x,y coordinate
    this.draw = function (x, y, toX, toY, r, ctx) {
        var moveToX = x;
        var moveToY = y + r;
        var lineToX = toX;
        var lineToY = toY - r;
        ctx.beginPath();
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    };
};

// Represents the btree logic
var BTree = function () {
    var c = document.getElementById('my-canvas');
    var ctx = c.getContext('2d');
    var line = new Line();
    this.root = null;

    var self = this;

    // Getter for root
    this.getRoot = function () { return this.root; };

    // Adds element to the tree
    this.add = function (data) {
        // If root exists, then recursively find the place to add the new node
        if (this.root) {
            this.recursiveAddNode(this.root, null, null, data);
        } else {
            // If not, the add the element as a root 
            this.root = this.addAndDisplayNode(200, 20, 15, ctx, data);
            return;
        }
    };

    // Recurively traverse the tree and find the place to add the node
    this.recursiveAddNode = function (node, prevNode, coordinateCallback, data) {
        if (!node) {
            // This is either node.leftCoordinate or node.rightCoordinate
            var xy = coordinateCallback();
            var newNode = this.addAndDisplayNode(xy.cx, xy.cy, 15, ctx, data);
            line.draw(prevNode.getX(), prevNode.getY(), xy.cx, xy.cy, prevNode.getRadius(), ctx)
            return newNode;
        }
        else {
            if (data <= node.getData()) {
                node.left = this.recursiveAddNode(node.left, node, node.leftCoordinate, data);
            }
            else {
                node.right = this.recursiveAddNode(node.right, node, node.rightCoordinate, data);
            }
            return node;
        }
    };

    // Adds the node to the tree and calls the draw function
    this.addAndDisplayNode = function (x, y, r, ctx, data) {
        var node = new Node(x, y, r, ctx, data);
        node.draw();
        return node;
    };
};

var addToTree = function () {
    input = document.getElementById('tree-input');
    value = parseInt(input.value);
    if (value)
        btree.add(value);
    else
        alert("Wrong input");
};

var btree = new BTree();