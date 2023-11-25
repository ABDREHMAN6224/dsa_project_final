import { lerp } from "../../utils/utils";

class Node {
    constructor(x, y, data, parent, onLeft) {
        this.x = x;
        this.y = y;
        this.val = data;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.parent = parent;
        this.addedOnLeft = onLeft;
        this.animations = [];
    }
    setX(x, frames = 30) {
        for (let i = 0; i <= frames; i++) {
            const t = i / frames;
            const x_val = lerp(this.x, x, t);
            this.animations.push({ x: x_val, y: this.y })
        }

    }
    setY(y) {
        this.y = y;
    }
    setXY(x_val, y_val) {
        this.y = y_val;
        this.x = x_val;
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
            changed = true;
        }
        context.beginPath();
        context.arc(this.x, this.y, 30, 0, Math.PI * 2);
        context.fillStyle = "yellow"
        context.fill();
        context.stroke();
        context.closePath();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.strokeText(this.val, this.x, this.y);
        return changed
    }
    drawLine(toX, toY, ctx) {
        var moveToX = this.x;
        var moveToY = this.y + 30;
        var lineToX = toX;
        var lineToY = toY - 30;
        ctx.beginPath();
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    };
    recenter(node1, node2) {
        this.x = (node1.x + node2.x) / 2;
    }

    reposition(root) {
        console.log(this);
        if (this.addedOnLeft == 0) {
            return;
        }
        let onRootLeft = 0;
        if (root !== this) {
            console.log(root.x, this.x);
            if (root.x - this.x > 0) {
                onRootLeft = 1;
            }
            else if (root.x - this.x == 0) {
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
                console.log(right_node, this.x);
                if (this.x - right_node.x <= 30) {

                    this.setX(this.x + 60);
                    if (this.parent !== root) {
                        this.parent.setX(this.parent.x + 60);
                    }
                    let parent = this.parent.parent;
                    console.log(parent);
                    if (parent == root) {
                        console.log("root match");
                        const nodes = getSuccessiveNodes(this.parent?.right);
                        nodes.map((n) => {
                            n.setX(n.x + 60);
                        })
                    }
                    while (parent !== null && parent?.parent !== null && parent !== root) {
                        if (parent?.parent.right === parent) {
                            parent.setX(parent.x + 60);
                            break;
                        }
                        parent.setX(parent.x + 60);
                        console.log("in");
                        const nodes = getSuccessiveNodes(parent?.right);
                        console.log("in_1");
                        console.log(nodes);
                        nodes.map((n) => {
                            n.setX(n.x + 60);
                        })
                        parent = parent.parent;
                    }
                    const nodes = getSuccessiveNodes(this.parent.right);
                    nodes.map((n) => {
                        n.setX(n.x + 60);
                    })
                }
            }
            else if (onRootLeft == 1) {
                if (this.x - right_node.x >= 0 && this.x - right_node.x <= 50) {
                    console.log(this);
                    this.setX(this.x - 60);
                    if (right_node !== root) {
                        right_node.setX(right_node.x - 60);
                    }
                    const nodes = getSuccessiveNodes(right_node.left);
                    nodes.map((n) => {
                        n.setX(n.x - 60);
                    })

                }

            }

            return;
        }
        else if (this.addedOnLeft === -1) {
            console.log("right");
            let left_node = this.findLeftNode(this.parent);
            console.log(left_node);
            if (!left_node) {
                left_node = root;
            }
            if (onRootLeft == -1) {
                if (left_node.x - this.x <= 0 && left_node.x - this.x >= -50) {
                    if (left_node !== root) {
                        left_node.setX(left_node.x + 60);
                    }
                    const nodes = getSuccessiveNodes(left_node?.right);
                    nodes.map((n) => {
                        n.setX(n.x + 60);
                    })

                }
            }
            else if (onRootLeft == 1) {
                if (left_node.x - this.x <= 30) {
                    // console.log();
                    this.setX(this.x - 60);
                    if (this.parent !== root) {
                        this.parent.setX(this.parent.x - 60);
                    }
                    let parent = this.parent.parent;
                    if (parent == root) {
                        const nodes = getSuccessiveNodes(this.parent?.left);
                        nodes.map((n) => {
                            n.setX(n.x - 60);
                        })
                    }
                    while (parent !== null && parent?.parent !== null && parent !== root) {
                        if (parent?.parent.left === parent) {
                            parent.setX(parent.x - 60);
                            break;
                        }
                        parent.setX(parent.x - 60);
                        const nodes = getSuccessiveNodes(parent?.left);
                        nodes.map((n) => {
                            n.setX(n.x - 60);
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
    }
    // constructor(root) {
    //     this.root = root;
    // }

    insert(val) {
        this.root = this.insertHelper(this.root, val, this.root.x, this.root.y, this.root.parent, 0);
    }
    insertHelper(node, val, x, y, p, l) {
        if (node == null) {
            let node = new Node(x, y, val, p, l);
            node.reposition(this.root);
            return node;
        }
        if (val < node.val) {
            node.left = this.insertHelper(node.left, val, node.x - 50, node.y + 80, node, 1);

        } else {
            node.right = this.insertHelper(node.right, val, node.x + 50, node.y + 80, node, -1);
        }
        node.height = Math.max(node.getHeight(node.left), node.getHeight(node.right)) + 1;
        if (node.left && node.right) {
            // node.recenter(node.left, node.right);
        }
        return node;
    }

    paint(context) {
        this.paintHelper(this.root, context);
    }
    paintHelper(node, context) {
        if (node == null) {
            return;
        }
        node.paint(context);

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