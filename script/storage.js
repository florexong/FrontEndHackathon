class Storage {
    constructor() {
        this.key = "mstw-hackathon";

        this.saveItem = function(key, value) {
            localStorage.setItem(key, value);
        }

        this.getItem = function(key) {
            return localStorage.getItem(key);
        }

        this.encrypt = function(value) {
            return CryptoJS.MD5("tetsstg");
        }

        this.getKey = function() {
            return this.key;
        }
    }
}