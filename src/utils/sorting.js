

export const bubbleSort = (array) => {
    let swaps = []

    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false;
        swaps.push({ action: "portion", indices: [0, array.length - i - 1] });
        for (let j = 0; j < array.length - i - 1; j++) {
            swaps.push({ action: "compare", indices: [j, j + 1] });
            if (array[j] > array[j + 1]) {
                swapped = true;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps.push({ action: "swapped", indices: [j, j + 1] });
            }
        }
        swaps.push({ action: "sorted", indices: [array.length - i - 1, array.length - 1] })
        if (!swapped) {
            swaps.push({ action: "sorted", indices: [0, array.length - 1] })
            break;
        }
    }
    return swaps
}

export const selectionSort = (array) => {
    const swaps = [];
    for (let i = 0; i < array.length; i++) {
        let min = i;
        swaps.push({ action: "portion", indices: [i, array.length - 1] });
        for (let j = i + 1; j < array.length; j++) {
            swaps.push({
                action: "compare",
                indices: [min, j]
            });
            if (array[min] > array[j]) {
                min = j;
            }
        }
        swaps.push({
            action: "swapped",
            indices: [i, min]
        });
        swaps.push({ action: "sorted", indices: [0, i] })

        let temp = array[min];
        array[min] = array[i];
        array[i] = temp;
    }
    return swaps
}

export const mergeSort = (array, start, end) => {
    const swaps = [];
    if (end - start <= 0) {
        return [];
    }
    const mid = Math.floor((start + end) / 2);
    swaps.push(...mergeSort(array, start, mid));
    swaps.push(...mergeSort(array, mid + 1, end));
    mergeArrays(array, start, mid + 1, end, swaps);

    return swaps;
}
const mergeArrays = (array, start, mid, end, swaps) => {
    swaps.push({ action: "portion", indices: [start, end] })
    let s = start;
    let m = mid;
    let k = 0;

    const temp = [];
    while (s < mid && m <= end) {
        swaps.push({ action: "compare", indices: [s, m] });
        if (array[s] <= array[m]) {
            temp[k] = array[s];
            s++;
        }
        else {
            temp[k] = array[m];
            m++;
        }
        k++;
    }

    while (s < mid) {
        temp[k] = array[s];
        s++;
        k++;
    }

    while (m <= end) {
        temp[k] = array[m];
        m++;
        k++;
    }
    for (let l = 0; l < temp.length; l++) {

        array[start + l] = temp[l];
        const i1 = array.indexOf(temp[l]);
        swaps.push({ action: "put", indices: [start + l, start + l], value: array[start + l] })
    }
}

export function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const quickSort = (array, start, end) => {
    let swaps = [];
    if (start >= end) {
        return [];
    }
    let s = start;
    let e = end;
    let index = Math.floor((start + end) / 2);
    const pivot = array[index];
    swaps.push({ action: "portion", indices: [start, end] })
    swaps.push({ action: "pivot", indices: [index, index], value: pivot })
    while (s < e) {
        while (array[s] < pivot) {
            swaps.push({ action: "compare", indices: [s, array.indexOf(pivot)] })
            s++;
        }
        while (array[e] > pivot) {
            swaps.push({ action: "compare", indices: [e, array.indexOf(pivot)] })
            e--;
        }
        if (s < e) {
            [array[s], array[e]] = [array[e], array[s]];
            swaps.push({ action: "swapped", indices: [s, e] })

        }
    }
    swaps.push(...quickSort(array, start, e - 1));
    swaps.push(...quickSort(array, s + 1, end));
    return swaps;

}

export const insertionSort = (array) => {
    const swaps = []
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            swaps.push({ action: "portion", indices: [j, i + 1] });
            swaps.push({ action: "compare", indices: [j - 1, j] })
            if (array[j] < array[j - 1]) {
                [array[j - 1], array[j]] = [array[j], array[j - 1]]
                swaps.push({ action: "swapped", indices: [j - 1, j] })
            } else {
                break;
            }
        }
        swaps.push({ action: "sorted", indices: [0, i + 1] })
    }
    return swaps
}

export const heapSort = (array) => {
    const swaps = []
    const leafNodes = Math.ceil(array.length / 2);
    const startIndex = array.length - leafNodes - 1;
    for (var i = startIndex; i >= 0; i--) {
        swaps.push({ action: "portion", indices: [0, array.length - 1] })
        downheap(array, i, array.length, swaps);
    }
    for (var i = array.length - 1; i >= 0; i--) {
        swaps.push({ action: "swapped", indices: [0, i] });
        swaps.push({ action: "portion", indices: [0, i - 1] });
        swaps.push({ action: "sorted", indices: [i, array.length - 1] });
        [array[i], array[0]] = [array[0], array[i]];
        downheap(array, 0, i, swaps);
    }
    return swaps
}


const downheap = (array, index, length, swaps) => {
    let max = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    if (left < length) {
        swaps?.push({ action: "compare", indices: [left, max] })
    }
    if (left < length && array[left] > array[max]) {
        max = left;
    }
    if (right < length) {
        swaps?.push({ action: "compare", indices: [right, max] })
    }
    if (right < length && array[right] > array[max]) {
        max = right;
    }
    if (max !== index) {
        // swaps?.push({ action: "move", indices: [index, max] });
        swaps?.push({ action: "swapped", indices: [index, max] });
        [array[max], array[index]] = [array[index], array[max]];
        downheap(array, max, length, swaps)
    }
}




export const countSort = (array) => {

}


