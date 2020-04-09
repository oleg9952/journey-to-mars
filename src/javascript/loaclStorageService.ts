export const localStorageService = (action: string, key?: string, data?: any): object => {
     switch (action) {
        case 'set':
            localStorage.setItem(`${key}`, JSON.stringify(data));
            return {};
        case 'get':
            return JSON.parse(localStorage.getItem(`${key}`)); 
        case 'delete':
            localStorage.deleteItem(`${key}`);
            return {}; 
        default:
            break;
    } 
}