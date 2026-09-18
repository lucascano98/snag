export {store, get, set};

const store = {};

function get(keys) {
    return new Promise((resolve) => {
        if (keys === null || keys === undefined) {
            return resolve({...store});
        }

        if (Array.isArray(keys) && keys.length === 0) {
            return resolve({});
        }

        if (typeof keys === 'string') {
            return resolve(Object.hasOwn(store, keys) ? { [keys]: store[keys] } : {});
        }

        if (Array.isArray(keys)) {
            const result = {};
            keys.forEach((key) => {
                if (Object.hasOwn(store, key)) {
                    result[key] = store[key];
                }
            });
            return resolve(result);
        }

        if (typeof keys == 'object') {
            const result = {};
            Object.keys(keys).forEach((key) => {
                result[key] = Object.hasOwn(store, key) ? store[key] : keys[key];
            });
            return resolve(result);
        }
    });
}

function set(items) {
    return new Promise((resolve) => {
        Object.assign(store, items);
        resolve();
    });
}