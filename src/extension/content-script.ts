import { Action, MessageRequestBody, MessageResponseBody } from "src/app/core/models"
import { cssClasses, extension, getElementSelector } from "./helpers"
import { ACTION_MODE, SELECTED_ELEMENTS, SELECTION_MODE_ACTIVE, SIMILAR_ELEMENTS, TEXT_CONTENT } from "src/app/utilities/TokenKeys"

let highlightAreaElement: HTMLElement
let selectedElements: HTMLElement[] = []
let similarElements = 0
let currentSelector = ''
let selectionModeActive = false
let actionMode: Action.GetTextContent | null = null
let textContent = ''


const initHighlightAreaElement = () => {
    if (highlightAreaElement) { return }
    highlightAreaElement = document.createElement('div');
    highlightAreaElement.style.cssText = `
        pointer-events: none;
        border: 2px solid green;
        border-radius: 0.25rem;
        position: fixed;
        background: transparent;
        z-index: 999;
        transition: all 0.2s ease;
    `
    document.body.appendChild(highlightAreaElement);
}

const toggleSelectionMode = (status?: boolean) => {
    selectionModeActive = status ?? !selectionModeActive
    if (!selectionModeActive) {
        document.removeEventListener("click", mouseClickListner);
        document.removeEventListener("mouseover", mouseOverListner);
        document.removeEventListener("contextmenu", mouseClickListner);
        highlightAreaElement.style.display = 'none'
    } else {
        document.addEventListener("click", mouseClickListner);
        document.addEventListener("mouseover", mouseOverListner);
        document.addEventListener("contextmenu", mouseClickListner);
        highlightAreaElement.style.display = 'block'
    }
    saveAndUpdateUI()
}

const mouseOverListner = (event: MouseEvent) => {
    const element = event.target as HTMLElement
    const selector = getElementSelector(event.target as HTMLElement);
    selector && recalculateFocusArea(element)
}

const mouseClickListner = (event: MouseEvent) => {
    event.stopImmediatePropagation()
    event.preventDefault()
    event.stopPropagation()
    const element = event.target as HTMLElement
    const selector = getElementSelector(element)
    if (selector && actionMode) {
        !element.classList.contains(cssClasses.INNER_SELECTED_ITEMS)
            && selectInnerElement(element, selector)
        return;
    }
    if (selector && !element.classList.contains(cssClasses.SELECTED_ITEMS) && (!currentSelector || currentSelector === selector)) {
        selectElement(element)
        saveAndUpdateUI()
        if (!currentSelector) {
            currentSelector = selector
            highlightSimilarItems(selector)
        }
    }
}

const selectElement = (element: HTMLElement) => {
    element.classList.remove(cssClasses.SIMILAR_ITEMS)
    element.classList.add(cssClasses.SELECTED_ITEMS)
    selectedElements.push(element)
}

const selectInnerElement = (element: HTMLElement, selector: string) => {
    const selectedAncestor = element.closest(`.${cssClasses.SELECTED_ITEMS}`)

    if (selectedAncestor) {
        const newSelector = element === selectedAncestor
            ? `${selector}.${cssClasses.SELECTED_ITEMS}`
            : selectedAncestor === element.parentElement
                ? `${ selector.split(' > ')[0] }.${ cssClasses.SELECTED_ITEMS }${ selector.slice(selector.indexOf(' > ')) }`
                : `.${cssClasses.SELECTED_ITEMS} ${selector}`
        document.querySelectorAll(`.${cssClasses.INNER_SELECTED_ITEMS}`).forEach(e => e.classList.remove(cssClasses.INNER_SELECTED_ITEMS))
        const elements = document.querySelectorAll(newSelector)
        elements.forEach(e => e.classList.add(cssClasses.INNER_SELECTED_ITEMS))
        actionMode === Action.GetTextContent ? GetTextContent(elements) : null
    }

}

const selectAllElements = () => {
    document.querySelectorAll(`.${cssClasses.SIMILAR_ITEMS}`).forEach(element => {
        selectElement(element as HTMLElement)
    })
    saveAndUpdateUI()
}

const unSelectAllElements = () => {
    similarElements = 0
    currentSelector = '';
    selectedElements = [];
    actionMode = null
    textContent = ''
    document.querySelectorAll(`.${cssClasses.SELECTED_ITEMS}`).forEach(e => e.classList.remove(cssClasses.SELECTED_ITEMS))
    document.querySelectorAll(`.${cssClasses.SIMILAR_ITEMS}`).forEach(e => e.classList.remove(cssClasses.SIMILAR_ITEMS))
    document.querySelectorAll(`.${cssClasses.INNER_SELECTED_ITEMS}`).forEach(e => e.classList.remove(cssClasses.INNER_SELECTED_ITEMS))
    saveAndUpdateUI()
}
const GetTextContent = (elements: NodeListOf<Element>) => {
    textContent = Array.from(elements)
        .map(element => ['input', 'textarea'].includes(element.tagName.toLowerCase()) ? (element as HTMLInputElement).value : (element as HTMLElement).innerText)
        .join('\n')
        .trim()
    saveAndUpdateUI()
}

const highlightSimilarItems = (selector: string) => {

    try {
        document.querySelectorAll('.similar-items').forEach(e => e.classList.remove(cssClasses.SIMILAR_ITEMS))
        const elements = document.querySelectorAll(`${selector}:not(.${cssClasses.SELECTED_ITEMS})`)
        similarElements = elements.length
        elements.forEach(e => e.classList.add(cssClasses.SIMILAR_ITEMS))
    } catch (error) { }
}

const recalculateFocusArea = (element: HTMLElement) => {
    const gap = 2
    const box = element.getBoundingClientRect();
    highlightAreaElement.style.top = `${box.top - gap}px`;
    highlightAreaElement.style.left = `${box.left - gap}px`;
    highlightAreaElement.style.width = `${box.width + 2 * gap}px`;
    highlightAreaElement.style.height = `${box.height + 2 * gap}px`;
}

const sendMessage = (action: Action) => {
    switch (action) {
        case Action.UpdateUI:
            extension.send({ action, data: {} })
            break;
        default:
            break;
    }
}

const saveAndUpdateUI = () => {
    extension.save(SELECTED_ELEMENTS, selectedElements.map(e => e.tagName))
    extension.save(SIMILAR_ELEMENTS, similarElements)
    extension.save(SELECTION_MODE_ACTIVE, selectionModeActive)
    extension.save(ACTION_MODE, actionMode)
    extension.save(TEXT_CONTENT, textContent)
    sendMessage(Action.UpdateUI)
}

try {
    initHighlightAreaElement();
    chrome.runtime.onMessage.addListener(function ({ action, data }: MessageRequestBody, sender, sendResponse: (res: MessageResponseBody) => void) {
        switch (action) {
            case Action.ToggleSelectionMode:
                toggleSelectionMode()
                sendResponse({ action, selectionMode: selectionModeActive })
                break;
            case Action.ClickOnSelectedElements:
                selectedElements.forEach(element => { element.click() });
                break;
            case Action.FillForms:
                selectedElements.forEach(element => { (element as HTMLInputElement).value = data.content });
                break;
            case Action.FillForms:
                selectedElements.forEach(element => { (element as HTMLInputElement).value = data.content });
                break;
            case Action.GetTextContent:
                if (selectedElements.length) {
                    actionMode = Action.GetTextContent;
                    toggleSelectionMode(true)
                }
                break;
            case Action.SelectAllElements:
                data.status
                    ? selectAllElements()
                    : unSelectAllElements()
                break;
            case Action.ClearStorage:
                selectionModeActive = false
                unSelectAllElements()
                break;
        }
    });
} catch (err) {
    console.log(err);
}