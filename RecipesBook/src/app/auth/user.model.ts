export class User {
    constructor(
        public email: string,
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date) {}

    get token() {
        //if expirationDate doesnt exists or Today is greater than expirationDate
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}