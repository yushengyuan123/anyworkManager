import {Message} from "view-design";
import Vue from 'vue'


/**
 * 返回的统一拦截
 * @param callback
 * @param config
 * @param necessary
 */
export function interceptors(callback, config = {}, necessary) {
    if (config.status != 3001) {
        let successOrFail = null

        if (config.status) {
            try {
                successOrFail = 'success'
                if (callback) {
                    callback()
                }
                if (necessary) {
                    if (config.message) {
                        Message[successOrFail](config.message)
                    }
                }
            } catch (e) {
                successOrFail = 'error'
                Message[successOrFail](e.message)
                throw new Error(e.message)
            }
        } else {
            successOrFail = 'error'
            Message[successOrFail](config.message)
        }
    }
}
