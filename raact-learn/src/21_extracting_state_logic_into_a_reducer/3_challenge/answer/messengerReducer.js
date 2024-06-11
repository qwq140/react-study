export const initialState = {
    selectedId: 0,
    messages: {
        0 : 'Hello'
    }
};

export function messengerReducer(
    state,
    action
) {
    switch (action.type) {
        case 'changed_selection': {
            return {
                ...state,
                selectedId: action.contactId,
                messages: {
                    ...state.messages
                }
            };
        }
        case 'edited_message': {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.contactId] : action.message
                }
            };
        }
        case 'sent_message': {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.contactId] : '',
                }
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
