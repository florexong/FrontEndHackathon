class Storage {
    constructor() {
        this.key = "mstw-hackathon";

        this.saveItem = function(key, value) {
            localStorage.setItem(this.encrypt(key), this.encrypt(value));
        }

        this.getItem = function(key) {
            return localStorage.getItem(this.decrypt(key));
        }

        this.encrypt = function(value) {
            return btoa(escape(value));
        }

        this.decrypt = function(value) {
            return unescape(atob(value));
        }

        this.getKey = function() {
            return this.key;
        }
    }
}