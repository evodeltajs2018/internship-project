class Debounce {
    static debounce(func, time) {
        let timeout;

        return function () {
            const functionCall = () => func.apply(this, arguments);

            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    }
}

export default Debounce;