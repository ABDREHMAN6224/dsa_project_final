export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
export const generateArray = (n) => {
    const array = [];
    for (var i = 2; i <= n + 2; i++) {
        array.push(i);
    }
    shuffleArray(array);
    return array
}

export const getKeysFromNestedObj = (obj) => {
    let keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}
export const getHeight = (size, i) => {
    const height = size < 15 ? i * 20 : size < 50 ? i * 8 : size < 80 ? i * 5 : i * 4;
    return height;
}
export const getWidth = (size) => {
    let width = size < 30 ? 400 / size : size < 70 ? 820 / size : 1050 / size;
    return width;
}

export const lerp = (x, y, t) => {
    return x + (y - x) * t;
}

export const getXYDifference = (x1, x2, y1, y2) => {
    return [x2 - x1, y2 - y1]
}

export const getSuccessiveNodes = (node) => {
    const ans = [];
    const deque = [node];
    if (node == null) {
        return [];
    }
    while (deque.length > 0) {
        const current = deque.shift();
        ans.push(current.id);
        if (current?.left !== null) {
            deque.push(current?.left);
        }
        if (current?.right !== null) {
            deque.push(current?.right);
        }
    }
    return ans;
}