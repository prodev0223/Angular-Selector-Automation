import { Action, MessageRequestBody, MessageResponseBody } from "src/app/core/models";

// chrome.action.onClicked.addListener(function () {
// });

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// });

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    console.log({tab});
    tab.url?.startsWith('http') && chrome.tabs.sendMessage<MessageRequestBody, MessageResponseBody>(tab.id!, { action: Action.ClearStorage, data: {} })
  })
});