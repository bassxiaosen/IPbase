/**
 * Created by bassxiaosen1 on 2017/10/23.
 */
import fetch from "isomorphic-fetch"
import cookie from "js-cookie"
import Promise from "promise-polyfill"
// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

import config from "../../config"
const {host} = config;
// console.log(host);
// const host = "http://139.199.220.49:8888";

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
    if (res.status === 401) {
        location.href = '/401';
    }
    return res;
}

function check404(res) {
    if (res.status === 404) {
        return Promise.reject(errorMessages(res));
    }
    return res;
}

function jsonParse(res) {
    return res.json().then(jsonResult => ({
        ...res,
        jsonResult
    }));
}

function errorMessageParse(res) {
    const {
        success,
        msg
        // message,
    } = res.jsonResult;
    if (!success) {
        return Promise.reject(msg);
    }
    return res;
}

export async function Fetch(url, options) {
    const opts = {...options};
    opts.headers = {
        ...opts.headers,
        "Content-Type": "application/json",
        "Accept": "application/json",
        token: cookie.get('token') || '',
    };

    return fetch(host + url, opts)
        .then(check401)
        .then(check404)
        .then(jsonParse)
        .then(errorMessageParse);
}