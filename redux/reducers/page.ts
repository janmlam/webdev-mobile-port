// Reducer for å endre siden vi er på
const pageReducer = (page = 1, action: { type: string; payload: number; }) => {
    switch (action.type) {
        case 'setPage':
            return action.payload;
        default:
            return page;
    }
}
export default pageReducer;