export class LocalStore {
    get(key) {
        return window.localStorage.getItem(key);
    }

    set(key, value) {
        window.localStorage.setItem(key, value);
    }

    delete(key) {
        window.localStorage.removeItem(key);
    }
}
