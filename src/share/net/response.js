import {Message} from "view-design";
import Vue from 'vue'


/**
 * 返回的统一拦截
 * @param callback
 * @param config
 * @param necessary
 */
export function interceptors(callback, config = {}, necessary) {
    if (necessary) {
        if (config.message) {
            let successOrFail = null

            if (config.status == 1) {
                successOrFail = 'success'
                try {
                    if (callback) {
                        callback()
                    }
                } catch (e) {
                    throw new Error(e)
                }
            } else if (config.status == 0) {
                successOrFail = 'error'
            }

            Message[successOrFail](config.message)
        }
    }
}
