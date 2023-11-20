import { Injectable, NgZone } from '@angular/core';
import { MessageRequestBody, MessageResponseBody } from '../../core/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

  onMessage$ = new Subject<{ request: MessageRequestBody, sender: chrome.runtime.MessageSender, response: (response?: any) => void }>()
  constructor(
    private ngZone: NgZone
  ) { }

  async getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return tab
  }

  async sendMessage(request: MessageRequestBody): Promise<MessageResponseBody> {
    const tab = await this.getActiveTab()
    return new Promise<MessageResponseBody>((res, rej) => {
      tab ? chrome.tabs.sendMessage<MessageRequestBody, MessageResponseBody>(tab.id!, request, (result) => {
        res(result)
      }) : rej()
    })
    // return await chrome.tabs.sendMessage<MessageRequestBody, MessageResponseBody>(tab.id!, request)
  }

  onMessage() {
    chrome.runtime.onMessage.addListener((request: MessageRequestBody, sender, response) => {
      this.ngZone.run(() => {
        this.onMessage$.next({ request, sender, response })
      })
    });
  }

  save(items: { [key: string]: any }) {
    return chrome.storage.local.set(items);
  }

  async get(key: string) {
    const res = await chrome.storage.local.get(key)
    return res[key]
  }
}
