export default {
    computed: {
        browser () {
            const chrome = navigator.userAgent.search("Chrome");
            const firefox = navigator.userAgent.search("Firefox");
            const ie8 = navigator.userAgent.search("MSIE 8.0");
            const ie9 = navigator.userAgent.search("MSIE 9.0");
            let browser;
            if (chrome > -1) {
                browser = "Chrome";
            } else if (firefox > -1) {
                browser = "Firefox";
            } else if (ie8 > -1) {
                browser ="MSIE 9.0";
            } else if (ie9 > -1) {
                browser ="MSIE 8.0";
            }
            return browser;
        }
    }
}
