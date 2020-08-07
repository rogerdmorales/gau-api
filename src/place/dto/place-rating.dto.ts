export default class PlaceRatingDTO {
    constructor(
        private _placeId: string,
        private _comment: string,
        private _question1: number,
        private _question2: number,
        private _question3: number,
        private _question4: number,
        private _question5: number
    ) { }

    set placeId(placeId: string) {
        this._placeId = placeId;
    }

    get placeId(): string {
        return this._placeId;
    }

    set comment(comment: string) {
        this._comment = comment;
    }
    
    get comment(): string {
        return this._comment;
    }

    set question1(question1: number) {
        this._question1 = question1;
    }

    get question1(): number {
        return this._question1;
    }

    set question2(question2: number) {
        this._question2 = question2;
    }

    get question2(): number {
        return this._question2;
    }

    set question3(question3: number) {
        this._question3 = question3;
    }

    get question3(): number {
        return this._question3;
    }

    set question4(question4: number) {
        this._question4 = question4;
    }

    get question4(): number {
        return this._question4;
    }

    set question5(question5: number) {
        this._question5 = question5;
    }

    get question5(): number {
        return this._question5;
    }
}

