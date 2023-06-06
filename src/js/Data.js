// eigen class

export class Data {
    score = 0

    setScore(value) {
        this.score = value;
    }

    incrementScore() {
        this.score = this.score + 1;
    }

    getScore() {
        return this.score;
    }
}