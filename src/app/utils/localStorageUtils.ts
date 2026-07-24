export default class LocalStorageUtils {{
    static tokenKey: string = 'token'

    static setItem(key: string, value: any): void {
        localStorage.setItem(key,value);
    }

    static getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    static deleteItem(key: string): void {
        localStorage.removeItem(key);
    }       

}