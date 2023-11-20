export enum Action {
    UpdateUI = 'updateUI',
    FillForms = 'fillForms',
    ClickOnSelectedElements = 'clickOnSelectedElements',
    ToggleSelectionMode = 'toggleSelectionMode',
    SelectAllElements = 'selectAllElements',
    GetTextContent = 'getTextContent',
    ClearStorage = 'clearStorage',
}

export type ActionButton = {
    message: Action
    icon: string,
    title: string,
    description: string,
}

export type MessageRequestBody = {
    action: Action.UpdateUI,
    data: {}
} | {
    action: Action.FillForms,
    data: {
        content: string
    }
} | {
    action: Action.ClickOnSelectedElements,
    data: {}
} | {
    action: Action.ToggleSelectionMode,
    data: {}
} | {
    action: Action.SelectAllElements,
    data: { status: boolean }
} | {
    action: Action.ClearStorage,
    data: {}
} | {
    action: Action.GetTextContent,
    data: {}
}

export type MessageResponseBody = {
    action: Action.ToggleSelectionMode,
    selectionMode: boolean,
} | {
    action: Action.GetTextContent,
    content: string,
}