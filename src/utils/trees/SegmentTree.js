import { sleep } from "../sorting"

export const populate = (array, start, end, op) => {
    if (start == end) {
        const node = { value: array[start], left: null, right: null, start: start, end: end }
        return node;
    }
    let node = { value: array[start], left: null, right: null, start: start, end: end }
    const mid = Math.floor((start + end) / 2)
    node.left = populate(array, start, mid, op)
    node.right = populate(array, mid + 1, end, op)
    if (op === "s") {
        node.value = node.left?.value - node.right?.value;
    } else if (op == "m") {
        node.value = node.left?.value * node.right?.value;
    } else if (op == "a") {
        node.value = node.left?.value + node.right?.value;

    }
    return node;


}

export const queryData = async (root, start, end, op, setAnimation) => {
    if (root?.start >= start && root.end <= end) {
        //fully in
        setAnimation({ action: "in_moving", node: root })
        await sleep(500)
        return root.value;
    }
    else if (root?.start > end || root.end < start) {
        //totally out of bound
        setAnimation({ action: "out_moving", node: root })
        await sleep(500)
        if (op === "s") {
            return 0
        } else if (op == "m") {
            return 1
        } else if (op == "a") {
            return 0
        }
    }
    else {
        setAnimation({ action: "par_moving", node: root })
        await sleep(500)
        if (op === "s") {
            return await queryData(root.left, start, end, op, setAnimation) - await queryData(root.right, start, end, op, setAnimation);
        } else if (op == "m") {
            return await queryData(root.left, start, end, op, setAnimation) * await queryData(root.right, start, end, op, setAnimation);
        } else if (op == "a") {
            return await queryData(root.left, start, end, op, setAnimation) + await queryData(root.right, start, end, op, setAnimation);
        }

    }

}
export const update = async (node, index, value, op, setAnimation) => {
    if (index >= node.start && index <= node.end) {
        setAnimation({ action: "par_moving", node: node })
        if (index == node.start && index == node.end) {
            await sleep(500)
            setAnimation({ action: "in_moving", node: node })
            await sleep(500)
            node.value = value
            return node.value
        }
        await sleep(500)
        const ans1 = await update(node?.left, index, value, op, setAnimation)
        const ans2 = await update(node?.right, index, value, op, setAnimation)
        if (op === "s") {
            node.value = ans1 - ans2;
        } else if (op == "m") {
            node.value = ans1 * ans2;
        } else if (op == "a") {
            node.value = ans1 + ans2;
        }
        await sleep(500)
        return node.value
    }

    setAnimation({ action: "out_moving", node: node })
    await sleep(500)
    return node.value;
}
