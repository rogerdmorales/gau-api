import { User } from "./user.model";

export class UserDTO {
    constructor(
        private _name: string,
        private _email: string,
        private _photo: string,
        private _hasDisability: boolean,
    ) { }

    set name(value: string) {
        this._name = value;
    }

    get name(): string {
        return this._name;
    }

    set email(value: string) {
        this._email = value;
    }

    get email(): string {
        return this._email;
    }

    set photo(value: string) {
        this._photo = value;
    }

    get photo(): string {
        return this._photo;
    }

    set hasDisability(value: boolean) {
        this._hasDisability = value;
    }

    get hasDisability(): boolean {
        return this._hasDisability;
    }

    static fromUser(user: User) {
        return new UserDTO(user.name, user.email, user.photo, user.hasDisability);
    }
}