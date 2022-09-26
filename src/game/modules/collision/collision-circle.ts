import Vector2 from "../../shared/vector2";
import { ICollision } from "./collision";
import CollisionRect from "./collision-rect";

export type CollisionCircleVariables = { x: number; y: number; r: number };

export default class CollisionCircle implements ICollision {
    public get x() {
        return this.variables.x;
    }
    public get y() {
        return this.variables.y;
    }
    public get r() {
        return this.variables.r;
    }

    constructor(public variables: CollisionCircleVariables) {}

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    public checkCollision(collision: ICollision): boolean {
        if (collision instanceof CollisionCircle) {
            return this.checkCollisionWithCircle(collision);
        }

        if (collision instanceof CollisionRect) {
            return this.checkCollisionWithRect(collision);
        }

        return false;
    }

    public checkCollisionWithCircle(circle: CollisionCircle): boolean {
        // Distância entre os centros dos círculos
        const dist = new Vector2(circle.x - this.x, circle.y - this.y);

        // Se a distância for menor que a soma dos raios, há colisão
        return dist.magnitude() < this.r + circle.r;
    }

    public checkCollisionWithRect(rect: CollisionRect): boolean {
        return rect.checkCollisionWithCircle(this);
    }
}
