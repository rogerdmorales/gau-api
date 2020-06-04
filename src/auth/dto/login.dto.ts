export class LoginDTO {
    constructor(
        private _username: string,
        private _password: string
    ) { }

    set username(value: string) {
        this._username = value;
    }

    get username(): string {
        return this._username;
    }

    set password(value: string) {
        this._password = value;
    }

    get password(): string {
        return this._password;
    }
}