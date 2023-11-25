import { lerp } from "../../utils/utils";
const moves = [];
class Node {
    constructor(x, y, data, parent, onLeft) {
        this.x = x;
        this.y = y;
        this.val = data;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.radius = 25;
        this.color = 'yellow'
        this.parent = parent;
        this.addedOnLeft = onLeft;
        this.animations = [];
    }
    setX(x, frames = 100) {
        for (let i = 0; i <= frames; i++) {
            const t = i / frames;
            const x_val = lerp(this.x, x, t);
            this.animations.push({ x: x_val, y: this.y })
        }

    }

    setY(y) {
        this.y = y;
    }
    setXY(x_initial, y_initial, x, y, type = "", frames = 100) {
        for (let i = 0; i <= frames; i++) {
            const t = i / frames;
            const x_val = lerp(x_initial, x, t);
            const y_val = lerp(y_initial, y, t);
            this.animations.push({ x: x_val, y: y_val, type })
        }
    }
    getHeight(node) {
        if (node == null) {
            return -1;
        }
        return node.height;
    }
    paint(context) {
        let changed = false;

        if (this.animations.length > 0) {
            const { x, y } = this.animations.shift();
            this.x = x;
            this.y = y;

        }
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.strokeStyle = "black";
        context.font = '16px Roboto';
        context.strokeText(this.val, this.x, this.y);
        return changed
    }

    drawLine(toX, toY, ctx) {
        var moveToX = this.x;
        var moveToY = this.y + this.radius;
        var lineToX = toX;
        var lineToY = toY - this.radius;
        ctx.beginPath();
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    };
    recenter(node1, node2) {
        this.x = (node1.x + node2.x) / 2;
    }

    reposition(root, x, y) {
        // moves.push({ action: "move", nodes: [this, this.parent], from: { xf: this.radius * 2, yf: this.parent.y }, to: { x, y } })
        this.setXY(this.radius * 2, this.parent.y, x, y)
        if (this.addedOnLeft == 0) {
            return;
        }
        let onRootLeft = 0;
        if (root !== this) {
            console.log(root.x, x);
            if (root.x - x > 0) {
                onRootLeft = 1;
            }
            else if (root.x - x == 0) {
                if (this.parent == root) {
                    if (this.addedOnLeft == 1) {
                        onRootLeft = 1;
                    }
                    if (this.addedOnLeft == -1) {
                        onRootLeft = -1;
                    }
                } else {
                    if (root.x - this.parent.x > 0) {
                        onRootLeft = 1;
                    } else {
                        onRootLeft = -1;

                    }
                }
            }
            else {
                onRootLeft = -1;
            }
        }
        if (this.addedOnLeft === 1) {
            let right_node = this.findRightNode(this.parent);
            if (right_node == null) {
                right_node = root;
            }
            if (onRootLeft == -1) {//working
                console.log(right_node, x);
                if (x - right_node.x <= this.radius * 2) {

                    this.setXY(x, y, x + this.radius * 2, y);
                    if (this.parent !== root) {
                        console.log(this.parent);
                        this.parent.setX(this.parent.x + this.radius * 2);
                    }
                    let parent = this.parent.parent;
                    console.log(parent);
                    if (parent == root) {
                        console.log("root match");
                        const nodes = getSuccessiveNodes(this.parent?.right);
                        nodes.map((n) => {
                            n.setX(n.x + this.radius * 2);
                        })
                    }
                    while (parent !== null && parent?.parent !== null && parent !== root) {
                        if (parent?.parent.right === parent) {
                            parent.setX(parent.x + this.radius * 2);
                            const nodes = getSuccessiveNodes(parent?.right);
                            nodes.map((n) => {
                                n.setX(n.x + this.radius * 2);
                            })
                            break;
                        }
                        parent.setX(parent.x + this.radius * 2);
                        console.log("in");
                        const nodes = getSuccessiveNodes(parent?.right);
                        console.log("in_1");
                        console.log(nodes);
                        nodes.map((n) => {
                            n.setX(n.x + this.radius * 2);
                        })
                        parent = parent.parent;
                    }
                    const nodes = getSuccessiveNodes(this.parent.right);
                    nodes.map((n) => {
                        n.setX(n.x + this.radius * 2);
                    })
                }
            }
            else if (onRootLeft == 1) {
                if (x - right_node.x >= 0 && x - right_node.x <= 50) {
                    console.log(this);
                    this.setXY(x, y, x - this.radius * 2, y);
                    if (right_node !== root) {
                        right_node.setX(right_node.x - this.radius * 2);
                    }
                    const nodes = getSuccessiveNodes(right_node.left);
                    nodes.map((n) => {
                        n.setX(n.x - this.radius * 2);
                    })

                }

            }

            return;
        }
        else if (this.addedOnLeft === -1) {
            let left_node = this.findLeftNode(this.parent);
            if (!left_node) {
                left_node = root;
            }
            if (onRootLeft == -1) {
                if (left_node.x - x <= 0 && left_node.x - x >= -50) {
                    if (left_node !== root) {
                        left_node.setX(left_node.x + this.radius * 2);
                    }
                    const nodes = getSuccessiveNodes(left_node?.right);
                    nodes.map((n) => {
                        n.setX(n.x + this.radius * 2);
                    })

                }
            }
            else if (onRootLeft == 1) {
                if (left_node.x - x <= 50) {
                    console.log("in");
                    this.setXY(x, y, x - this.radius * 2, y);
                    if (this.parent !== root) {
                        this.parent.setX(this.parent.x - this.radius * 2);
                    }
                    let parent = this.parent.parent;
                    if (parent == root) {
                        const nodes = getSuccessiveNodes(this.parent?.left);
                        nodes.map((n) => {
                            n.setX(n.x - this.radius * 2);
                        })
                    }
                    while (parent !== null && parent?.parent !== null && parent !== root) {
                        if (parent?.parent.left === parent) {
                            parent.setX(parent.x - this.radius * 2);
                            const nodes = getSuccessiveNodes(parent?.left);
                            nodes.map((n) => {
                                n.setX(n.x - this.radius * 2);
                            })
                            break;
                        }
                        parent.setX(parent.x - this.radius * 2);
                        const nodes = getSuccessiveNodes(parent?.left);
                        nodes.map((n) => {
                            n.setX(n.x - this.radius * 2);
                        })
                        parent = parent.parent;
                    }

                }

            }
            return;
        }
    }
    findRightNode(node) {//for left node
        let ans;
        if (node == null) {
            return null;
        }
        if (node.addedOnLeft == 1) {
            ans = this.findRightNode(node.parent);
        }
        if (node.addedOnLeft == -1) {
            return node.parent;
        }
        return ans;
    }
    findLeftNode(node) {//for right one
        let ans;
        if (node == null) {
            return null;
        }
        if (node.addedOnLeft === -1) {
            ans = this.findLeftNode(node.parent);
        }
        else if (node.addedOnLeft === 1) {
            return node.parent;
        }
        return ans;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = new Node(window.innerWidth / 2, 40, 5, null, 0);
        this.comparingNode = new Node(this.root.x, this.root.y, "", null, 0);
        // this.comparingNode.radius = 30
        this.comparingNode.color = "green"


    }
    insert(val) {
        this.comparingNode.radius = 30
        const created_node = new Node(this.root.x + 60, this.root.y + 70, val, null, 0);
        this.root = this.insertHelper(this.root, val, this.root.x, this.root.y, this.root.parent, 0, created_node);
    }
    insertHelper(node, val, x, y, p, l, createdNode) {
        if (node == null) {
            createdNode.addedOnLeft = l;
            createdNode.parent = p
            // this.comparingNode.radius = 0
            console.log("done");
            this.comparingNode.setXY(this.comparingNode.x, this.comparingNode.y, this.root.x, this.root.y)
            createdNode.reposition(this.root, x, y);
            return createdNode;
        }
        moves.push({ action: "compare", nodes: [createdNode, node] });
        this.comparingNode.setXY(this.comparingNode.x, this.comparingNode.y, node.x, node.y)
        if (val < node.val) {
            node.left = this.insertHelper(node.left, val, node.x - 50, node.y + 70, node, 1, createdNode);

        } else {
            node.right = this.insertHelper(node.right, val, node.x + 50, node.y + 70, node, -1, createdNode);
        }
        node.height = Math.max(node.getHeight(node.left), node.getHeight(node.right)) + 1;
        // this.comparingNode.x = this.root.y;
        return node;
    }

    paint(context) {
        this.paintHelper(this.root, context);
    }
    paintHelper(node, context) {
        if (node == null) {
            return;
        }
        let changed = false;
        let changed1 = false;
        this.comparingNode.paint(context)
        changed = node.paint(context) || changed;

        if (node.right) {
            node.drawLine(node.right.x, node.right.y, context)
        }
        if (node.left) {
            node.drawLine(node.left.x, node.left.y, context)
        }
        this.paintHelper(node.left, context);
        this.paintHelper(node.right, context);



    }

}


export const tree = new BinarySearchTree();



const getSuccessiveNodes = (node) => {
    const ans = [];
    const deque = [node];
    if (node == null) {
        return [];
    }
    while (deque.length > 0) {
        const current = deque.shift();
        ans.push(current);
        if (current?.left !== null) {
            console.log("hey");
            deque.push(current?.left);
        }
        if (current?.right !== null) {
            deque.push(current?.right);
        }
    }
    return ans;
}