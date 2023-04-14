import { Tool } from "langchain/tools";
/**
 * Present approach is to imagine tools as separate API calls.
 * Ideal approach would be to have a single API call per customer, similar to ChatGPT plugin.
 * Need to figure out how to do that.
 * 
 * */ 

class UserAddressAPI extends Tool {
    constructor() {
        super();
    }
    name = "address";
    description =
        "a tool that fetches user's shipping address information from a database";
    url = "http://localhost:3000/addressDetails";
    responseDataKey = "shippingAddress";

    async _call() {
        const headers = { Accept: "application/json" };
        const response = await fetch(this.url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const jsonData = await response.json();
        if (!jsonData || !jsonData[this.responseDataKey]) {
            return `No data or data for key ${this.responseDataKey}`;
        }
        console.log("Langchain called UserAddressAPI. Got data: ", jsonData[this.responseDataKey]);
        return jsonData[this.responseDataKey];
    }
}

class UserOrderCountAPI extends Tool {
    constructor() {
        super();
    }
    name = "order";
    description =
        "a tool that fetches user's total order count information from a database";
    url = "http://localhost:3000/orderCount";
    responseDataKey = "orderCount";

    async _call() {
        const headers = { Accept: "application/json" };
        const response = await fetch(this.url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const jsonData = await response.json();
        if (!jsonData || !jsonData[this.responseDataKey]) {
            return `No data or data for key ${this.responseDataKey}`;
        }
        console.log("Langchain called UserOrderCountAPI. Got data: ", jsonData[this.responseDataKey]);
        return jsonData[this.responseDataKey];
    }
}

export { UserAddressAPI, UserOrderCountAPI };