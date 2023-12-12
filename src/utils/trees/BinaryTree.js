import { v4 as uuid } from 'uuid';
import { sleep } from "../sorting"
const time = 250;

export const insertValue = async (node, val, setAnimating) => {
    if (node === null) {
        node = { value: val, left: null, right: null, height: 0, id: "n_" + uuid() }
        return node
    }
    if (val < node.value) {
        setAnimating({ action: "compare", currNode: node })
        await sleep(time)
        node.left = await insertValue(node.left, val, setAnimating)
    } else {
        setAnimating({ action: "compare", currNode: node })
        await sleep(time)
        node.right = await insertValue(node.right, val, setAnimating)

    }
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1

    return node
}
export const balanceTree = (node, setAnimating, swaps) => {
    if (node === null) {
        return null
    }
    node.left = balanceTree(node.left, setAnimating, swaps);
    node.right = balanceTree(node.right, setAnimating, swaps);
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1;
    return rotate(node, setAnimating, swaps);
}
const rotate = (node, setAnimating, swaps) => {
    setAnimating({ action: "compare", currNode: node })
    if (((node.left ? node.left.height : -1) - (node.right ? node.right.height : -1)) > 1) {
        setAnimating({ action: "rotating", currNode: node });
        console.log(node);
        if (((node.left.left ? node.left.left.height : -1) - (node.left.right ? node.left.right.height : -1)) >= 0) {
            swaps.push({ action: "right_rotate", p: node, c: node.left });
            const n = rightRotate(node);
            return n
        }
        if (((node.left.left ? node.left.left.height : -1) - (node.left.right ? node.left.right.height : -1)) < 0) {


            swaps.push({ action: "il", p: node.left, c: node.left.right })
            const n1 = leftRotate(node.left);
            node.left = n1
            swaps.push({ action: "right_rotate", p: node, c: node.left })
            const n = rightRotate(node);
            return n

        }
    }
    if (((node.left ? node.left.height : -1) - (node.right ? node.right.height : -1)) < -1) {
        setAnimating({ action: "rotating", currNode: node })

        if (((node.right.right ? node.right.right.height : -1) - (node.right.left ? node.right.left.height : -1)) >= 0) {
            swaps.push({ action: "left_rotate", p: node, c: node.right })
            const n = leftRotate(node)
            return n;
        }
        if (((node.right.right ? node.right.right.height : -1) - (node.right.left ? node.right.left.height : -1)) < 0) {

            swaps.push({ action: "ir", p: node.right, c: node.right.left })
            const n1 = rightRotate(node.right);
            node.right = n1
            swaps.push({ action: "left_rotate", p: node, c: node.right })
            const n = leftRotate(node);
            return n
        }
    }
    // await sleep(time1)
    return node
}
const rotate2 = (node) => {

    if (((node.left ? node.left.height : -1) - (node.right ? node.right.height : -1)) > 1) {
        if (((node.left.left ? node.left.left.height : -1) - (node.left.right ? node.left.right.height : -1)) >= 0) {

            const n = rightRotate(node)
            return n
        }
        if (((node.left.left ? node.left.left.height : -1) - (node.left.right ? node.left.right.height : -1)) < 0) {


            const n1 = leftRotate(node.left);
            node.left = n1
            const n = rightRotate(node);
            return n

        }
    }
    if (((node.left ? node.left.height : -1) - (node.right ? node.right.height : -1)) < -1) {

        if (((node.right.right ? node.right.right.height : -1) - (node.right.left ? node.right.left.height : -1)) >= 0) {
            const n = leftRotate(node);
            return n;
        }
        if (((node.right.right ? node.right.right.height : -1) - (node.right.left ? node.right.left.height : -1)) < 0) {

            const n1 = rightRotate(node.right);
            node.right = n1
            const n = leftRotate(node);
            return n
        }
    }
    return node
}
export const leftRotate = (node) => {
    const p = node;
    const c = p.right;
    p.right = c.left || null;
    c.left = p;

    p.height = Math.max(p.left ? p.left.height : -1, p.right ? p.right.height : -1) + 1
    c.height = Math.max(c.left ? c.left.height : -1, c.right ? c.right.height : -1) + 1
    return c;
}
export const rightRotate = (node) => {
    const p = node;
    const c = p.left;
    p.left = c.right || null;
    c.right = p;
    p.height = Math.max(p.left ? p.left.height : -1, p.right ? p.right.height : -1) + 1
    c.height = Math.max(c.left ? c.left.height : -1, c.right ? c.right.height : -1) + 1
    return c

}

export const searchValue = async (node, val, setAnimating) => {
    if (node === null) {
        setAnimating({ action: "not_found", currNode: node });
        await sleep(time)
        return;
    }
    setAnimating({ action: "compare", currNode: node });
    await sleep(time)
    if (node.value === val) {
        setAnimating({ action: "found", currNode: node });
        console.log("found");
        await sleep(time)
        return;
    }
    else if (val < node.value) {
        setAnimating({ action: "compare", currNode: node.left });
        await sleep(time)
        searchValue(node.left, val, setAnimating)
    }
    else if (val >= node.value) {
        setAnimating({ action: "compare", currNode: node.right });
        await sleep(time)
        searchValue(node.right, val, setAnimating)
    }
}
export const insertInBinaryTree = (val, x, y, ctx) => {
    const root_node = { value: val, left: null, right: null, height: 0, x, y }
    draw(ctx, x, y, val)
    return root_node

}

export const insertValue2 = (node, val, ctx, x, y) => {
    console.log(x, y);
    if (node === null) {
        node = { value: val, left: null, right: null, height: 0, x, y }
        draw(ctx, x, y, val)
        return node
    }

    if (val < node?.value) {

        node.left = insertValue2(node?.left, val, ctx, node?.x - 60, node.y + 60)


    } else {

        node.right = insertValue2(node?.right, val, ctx, node?.x + 60, node.y + 60)

    }
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1

    return node
}

export const balancePartciularNode = (node, p) => {
    if (node == null) {
        return null;
    }
    node.left = balancePartciularNode(node.left, p);
    node.right = balancePartciularNode(node.right, p);
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1
    if (node == p) {
        return rotate2(node);
    }

    return node;
}
export const balanceIL = (node, p) => {
    if (node == null) {
        return null;
    }
    node.left = balanceIL(node.left, p);
    node.right = balanceIL(node.right, p);
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1
    if (node == p) {
        return leftRotate(node);
    }
    return node;
}
export const balanceIR = (node, p) => {
    if (node == null) {
        return null;
    }
    node.left = balanceIR(node.left, p);
    node.right = balanceIR(node.right, p);
    node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1
    if (node == p) {
        return rightRotate(node);
    }
    return node;
}
const getInorderPredecessor = (node) => {
    let tempNode = node.left;
    while (tempNode.right !== null) {
        tempNode = tempNode.right;
    }
    return tempNode;

}
export const deleteVal = (node, val, swaps) => {
    if (val < node.value) {
        node.left = deleteVal(node.left, val, swaps);
    }
    else if (val > node.value) {
        node.right = deleteVal(node.right, val, swaps);
    }
    else {
        node = deleteNode(node, swaps);
    }
    if (node !== null) {
        node.height = Math.max(node.left ? node.left.height : -1, node.right ? node.right.height : -1) + 1;
    }
    return node;
}
const deleteNode = (node, swaps) => {
    if (node.left == null) {
        swaps.push({ action: "delete", target: { ...node }, inorder: node.right ? { ...node.right } : null })
        node = node.right;
        return node
    }
    else if (node.right == null) {
        swaps.push({ action: "delete", target: { ...node }, inorder: node.left ? { ...node.left } : null })
        node = node.left;
        return node
    }
    else {
        const predecessor = getInorderPredecessor(node);
        swaps.push({ action: "delete", target: { ...node }, inorder: { ...predecessor } })
        node.value = predecessor.value;
        node.left = deleteVal(node.left, node.value, swaps);
        return node;
    }
}

export const inOrderTraversal = (node, traversal) => {
    if (node === null) {
        return;
    }
    inOrderTraversal(node.left, traversal);
    traversal.push({ value: node.value, id: node.id });
    inOrderTraversal(node.right, traversal);
}
export const postOrderTraversal = (node, traversal) => {
    if (node === null) {
        return;
    }
    postOrderTraversal(node.left, traversal);
    postOrderTraversal(node.right, traversal);
    traversal.push({ value: node.value, id: node.id });
}
export const preOrderTraversal = (node, traversal) => {
    if (node === null) {
        return;
    }
    traversal.push({ value: node.value, id: node.id });
    preOrderTraversal(node.left, traversal);
    preOrderTraversal(node.right, traversal);
}
export const BFS = (node, traversal) => {
    const deque = [node];
    while (deque.length > 0) {
        const current = deque.shift();
        traversal.push({ value: current.value, id: current.id });
        if (current?.left !== null) {
            deque.push(current?.left);
        }
        if (current?.right !== null) {
            deque.push(current?.right);
        }
    }
}
