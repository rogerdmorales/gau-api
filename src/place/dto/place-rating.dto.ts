export default class PlaceRatingDTO {
    constructor(
        private _placeId: string,
        private _answers: string[],
        private _comment: string
    ) { }

    set placeId(placeId: string) {
        this._placeId = placeId;
    }

    get placeId(): string {
        return this._placeId;
    }

    set answers(answers: string[]) {
        this._answers = answers;
    }

    get answers(): string[] {
        return this._answers;
    }

    set comment(comment: string) {
        this._comment = comment;
    }

    get comment(): string {
        return this._comment;
    }
}

