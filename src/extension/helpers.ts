import { MessageRequestBody, MessageResponseBody } from "src/app/core/models"
export enum cssClasses {
    SIMILAR_ITEMS = 'similar-items',
    SELECTED_ITEMS = 'selected-items',
}

export namespace extension {

    export const send = async (reauest: MessageRequestBody) => {
        try {
            return await chrome.runtime.sendMessage<MessageRequestBody, MessageResponseBody>(reauest)
        } catch (error) {
            return
        }
    }

    export const save = <T>(key: string, value: T) => {
        return chrome.storage.local.set({ [key]: value });
    }

    export const get = async (key: string) => {
        const res = await chrome.storage.local.get(key)
        return res[key]
    }

    export const clear = () => {
        return chrome.storage.local.clear();
    }

    export const getActiveTab = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        return tab
    }

}

export const getElementSelector = (element: HTMLElement) => {
    try {
        if (!element) return '';
        const id = element.id ? `#${element.id}` : '';
        const classes = `${Array.from(element.classList).filter(c => ![cssClasses.SELECTED_ITEMS, cssClasses.SIMILAR_ITEMS].includes(c as any)).join('.')}`;
        const tagName = element.tagName.toLowerCase();
        return classes ? `${tagName}${''}.${classes}` : '';
    } catch (err) {
        console.log(err);
        return ''
    }
}