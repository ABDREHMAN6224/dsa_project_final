export const convertToTreeStructure = (arr) => {
    let root;
    for (let i = 0; i < arr.length; i++) {
        if (getLeft(i) < arr.length) {
            arr[i].left = arr[getLeft(i)];
        } else {
            arr[i].left = null;
        }
        if (getRight(i) < arr.length) {
            arr[i].right = arr[getRight(i)];
        } else {
            arr[i].right = null;
        }
    }
    root = arr[0];
    return root;
}
const getLeft = (i) => {
    return 2 * i + 1;
}
const getRight = (i) => {
    return 2 * i + 2;
}
const getParent = (i) => {
    return Math.floor((i - 1) / 2);
}
export const upHeap = (index, choice, arr, swaps) => {
    if (arr.length < 1) {
        return;
    }
    if (choice == "max") {
        let min = index;
        let parent = getParent(index);
        if (parent >= 0 && arr[parent].value < arr[min].value) {
            min = parent;
        }
        if (min !== index) {
            const temp = JSON.parse(JSON.stringify(arr))
            swaps.push({ action: "swap", id_1: temp[index].id, id_2: temp[min].id });
            [arr[index], arr[min]] = [arr[min], arr[index]];
            upHeap(min, choice, arr, swaps);
        }

    } else if (choice == "min") {
        let max = index;
        let parent = getParent(index);
        console.log(parent);
        if (parent >= 0 && arr[parent].value > arr[index].value) {
            max = parent;
        }
        if (max !== index) {
            const temp = JSON.parse(JSON.stringify(arr))
            swaps.push({ action: "swap", id_1: temp[index].id, id_2: temp[max].id });
            [arr[index], arr[max]] = [arr[max], arr[index]];
            upHeap(max, choice, arr, swaps);
        }

    }
}
export const downHeap = (index, choice, arr, swaps) => {
    if (choice === "min") {
        let min = index;
        const left = getLeft(index)
        const right = getRight(index)
        if (left < arr.length && arr[left]?.value < arr[min]?.value) {
            min = left;
        }
        if (right < arr.length && arr[right]?.value < arr[min]?.value) {
            min = right;
        }
        if (min !== index) {
            const temp = JSON.parse(JSON.stringify(arr));
            swaps.push({ action: "swap", id_1: temp[index].id, id_2: temp[min].id });
            [arr[min], arr[index]] = [arr[index], arr[min]];
            downHeap(min, choice, arr, swaps);
        }

    } else if (choice == "max") {
        let max = index;
        const left = getLeft(index)
        const right = getRight(index)
        if (left < arr.length && arr[left].value > arr[max].value) {
            max = left;
        }
        if (right < arr.length && arr[right].value > arr[max].value) {
            max = right;
        }
        if (max !== index) {
            const temp = JSON.parse(JSON.stringify(arr))
            swaps.push({ action: "swap", id_1: temp[index].id, id_2: temp[max].id });
            [arr[max], arr[index]] = [arr[index], arr[max]];
            downHeap(max, choice, arr, swaps);
        }


    }

}
export const getIndices = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
}

