class LocalStorageService {
    static readonly AUTH_TOKEN = 'authToken';
  
    static setItem(key: string, value: string): void {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting item to localStorage', error);
      }
    }
  
    static getItem(key: string): string | null {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error getting item from localStorage', error);
        return null;
      }
    }
  
    static removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from localStorage', error);
      }
    }
  
    static clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage', error);
      }
    }
  }
  
  export default LocalStorageService;
  