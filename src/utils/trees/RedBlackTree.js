import { v4 as uuid } from "uuid";
import { sleep } from "../sorting";
import { leftRotate, rightRotate } from "./BinaryTree";
class Node {
    constructor(data, id) {
        this.value = data;
        this.left = null;
        this.right = null;
        this.color = "black";
        this.id = id;
        this.height = 0;
        this.parent = null;
    }
}
export const insertValueInRedBlackTree = async (root, node, parent, val, setAnimating) => {
    if (node === null) {
        node = new Node(val, "n_" + uuid());
        node.parent = parent;
        if (root == null) {
            node.color = "black";
            root = node;
            return node;
        }
        node.color = "red";
        fixTree(root, node, [])
        return node;
    }
    if (val < node.value) {
        setAnimating({ action: "compare", currNode: node })
        await sleep(200)
        node.left = await insertValueInRedBlackTree(root, node.left, node, val, setAnimating)
    } else {
        setAnimating({ action: "compare", currNode: node })
        await sleep(200)
        node.right = await insertValueInRedBlackTree(root, node.right, node, val, setAnimating)

    }
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1;
    console.log(node);
    return node;

}
export const checkViolation = (root, node, swaps) => {
    if (node === null) {
        return null
    }
    node.left = checkViolation(root, node.left, swaps);
    node.right = checkViolation(root, node.right, swaps);
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1;
    return fixTree(root, node, swaps);

}
const fixTree = (root, node, swaps) => {
    while (node.parent && node.parent.color === 'red') {
        if (node.parent === node.parent.parent.left) {
            const uncle = node.parent.parent.right;

            if (uncle && uncle.color === 'red') {
                node.parent.color = 'black';
                uncle.color = 'red';
                node.parent.parent.color = 'red';
                node = node.parent.parent;
            } else {
                if (node === node.parent.right) {
                    node = node.parent;
                    leftRotate(node);
                }

                node.parent.color = 'B';
                node.parent.parent.color = 'R';
                rightRotate(node.parent.parent);
            }
        } else {
            const uncle = node.parent.parent.left;

            if (uncle && uncle.color === 'R') {
                node.parent.color = 'B';
                uncle.color = 'B';
                node.parent.parent.color = 'R';
                node = node.parent.parent;
            } else {
                if (node === node.parent.left) {
                    node = node.parent;
                    rightRotate(node);
                }

                node.parent.color = 'B';
                node.parent.parent.color = 'R';
                leftRotate(node.parent.parent);
            }
        }
    }

    root.color = 'black';

}


const deletion = () => {

}
