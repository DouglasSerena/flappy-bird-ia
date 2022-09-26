import GameObject from "../../game-objects/game-object";
import CollisionCircle from "./collision-circle";
import CollisionRect from "./collision-rect";

export interface ICollision {
    draw(ctx: CanvasRenderingContext2D): void;
    checkCollision(collision: ICollision): boolean;
    checkCollisionWithRect(rect: CollisionRect): boolean;
    checkCollisionWithCircle(circle: CollisionCircle): boolean;
}
