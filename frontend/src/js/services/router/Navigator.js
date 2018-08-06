class Navigator {
    static goToUrl(url, data = {}) {
        window.history.pushState(data, "", url);
        window.dispatchEvent(new Event("popstate"));
    }

    static getHistoryState() {
        return window.history.state;
    }
}

export default Navigator;