export class SessionStore {
    get(key) {
        return window.sessionStorage.getItem(key);
    }

    set(key, value) {
        window.sessionStorage.setItem(key, value);
    }

    delete(key) {
        window.sessionStorage.removeItem(key);
    }
}
