export type Coord = { x: number; y: number };

export default class Vector2 {
    constructor(public x: number, public y: number) {}

    public add(vector: Coord) {
        this.x += vector.x;
        this.y += vector.y;
    }
    public addX(x: number) {
        this.x += x;
    }
    public addY(y: number) {
        this.y += y;
    }

    public sub(vector: Coord) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    public subX(x: number) {
        this.x -= x;
    }
    public subY(y: number) {
        this.y -= y;
    }

    public mul(vector: Coord) {
        this.x *= vector.x;
        this.y *= vector.y;
    }
    public mulX(x: number) {
        this.x *= x;
    }
    public mulY(y: number) {
        this.y *= y;
    }

    public div(vector: Coord) {
        this.x /= vector.x;
        this.y /= vector.y;
    }
    public divX(x: number) {
        this.x /= x;
    }
    public divY(y: number) {
        this.y /= y;
    }

    public mod(vector: Coord) {
        this.x %= vector.x;
        this.y %= vector.y;
    }
    public modX(x: number) {
        this.x %= x;
    }
    public modY(y: number) {
        this.y %= y;
    }

    public clamp(min: number, max: number) {
        this.y = Math.min(Math.max(this.y, min), max);
        this.x = Math.min(Math.max(this.x, min), max);
    }
    public clampY(min: number, max: number) {
        this.y = Math.min(Math.max(this.y, min), max);
    }
    public clampX(min: number, max: number) {
        this.x = Math.min(Math.max(this.x, min), max);
    }

    public magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize() {
        const length = this.magnitude();

        this.x /= length;
        this.y /= length;
    }

    public distance(vector: Coord) {
        return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
    }

    public static add(vector1: Coord, vector2: Coord) {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    public static sub(vector1: Coord, vector2: Coord) {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    public static mul(vector1: Coord, vector2: Coord) {
        return new Vector2(vector1.x * vector2.x, vector1.y * vector2.y);
    }

    public static div(vector1: Coord, vector2: Coord) {
        return new Vector2(vector1.x / vector2.x, vector1.y / vector2.y);
    }

    public static mod(vector1: Coord, vector2: Coord) {
        return new Vector2(vector1.x % vector2.x, vector1.y % vector2.y);
    }

    public static clamp(vector: Coord, min: number, max: number) {
        return new Vector2(Math.min(Math.max(vector.x, min), max), Math.min(Math.max(vector.y, min), max));
    }

    public static distance(vector1: Coord, vector2: Coord) {
        return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
    }
}
