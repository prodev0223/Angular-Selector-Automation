import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Action } from 'src/app/core/models';
import { SELECTED_ELEMENTS, SELECTION_MODE_ACTIVE, SIMILAR_ELEMENTS } from 'src/app/utilities/TokenKeys';
import { ExtensionService } from 'src/app/utilities/services/Extension.service';

@Injectable({
  providedIn: 'root'
})
export class ExtensionViewModel {
  selectionModeActive$ = new BehaviorSubject<boolean>(false)
  selectedElements$ = new BehaviorSubject<string[]>([])
  similarElements$ = new BehaviorSubject<number>(0)
  textContent$ = new Subject<string>()
  
  constructor(
    private extensionService: ExtensionService,
  ) { }

  init() {
    this.updateUI()
    this.extensionService.onMessage()
    this.extensionService.onMessage$.subscribe(({ request, sender, response }) => {
      this.updateUI();
      response()
    });
  }

  async updateUI() {
    this.extensionService.get(SELECTION_MODE_ACTIVE).then(res => this.selectionModeActive$.next(!!res))
    this.extensionService.get(SELECTED_ELEMENTS).then(res => this.selectedElements$.next((res ?? []) as Array<string>))
    this.extensionService.get(SIMILAR_ELEMENTS).then(res => this.similarElements$.next(+(res as any ?? 0)))
  }

  async toggleSelectionMode() {
    const res = await this.extensionService.sendMessage({ action: Action.ToggleSelectionMode, data: {} })
    if (res.action === Action.ToggleSelectionMode) {
      this.selectionModeActive$.next(res.selectionMode)
    }
  }

  async fillForms() {
    if (this.selectedElements$.value.length
      && this.selectedElements$.value.every(element => ['INPUT', 'TEXTAREA'].includes(element))
      && this.selectedElements$.value.length) {
      await this.extensionService.sendMessage({ action: Action.FillForms, data: { content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, cupiditate?' } })
    }
  }

  async clickOnSelectedElements() {
    if (this.selectedElements$.value.length) {
      await this.extensionService.sendMessage({ action: Action.ClickOnSelectedElements, data: {} })
    }
  }

  async selectAll(status: boolean) {
    if (this.selectedElements$.value.length) {
      await this.extensionService.sendMessage({ action: Action.SelectAllElements, data: { status } })
    }
  }

  async getTextContent() {
    if (this.selectedElements$.value.length) {
      const res = await this.extensionService.sendMessage({ action: Action.GetTextContent, data: {} })
      if (res.action === Action.GetTextContent) {
        this.textContent$.next(res.content)
      }
    }
  }
}
