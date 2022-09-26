import CollisionCircle from "./collision-circle";
import { ICollision } from "./collision";
import Vector2 from "../../shared/vector2";
import GameObject from "../../game-objects/game-object";

export type CollisionRectVariables = { x: number; y: number; w: number; h: number };

export default class CollisionRect implements ICollision {
    public get x() {
        return this.variables.x;
    }
    public get y() {
        return this.variables.y;
    }
    public get w() {
        return this.variables.w;
    }
    public get h() {
        return this.variables.h;
    }

    constructor(public variables: CollisionRectVariables) {}

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
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
        // Variável temporária para definir arestas para teste
        const test = new Vector2(circle.x, circle.y);

        if (circle.x < this.x) {
            test.x = this.x; // borda esquerda
        } else if (circle.x > this.x + this.w) {
            test.x = this.x + this.w; // borda direita
        }

        if (circle.y < this.y) {
            test.y = this.y; // borda superior
        } else if (circle.y > this.y + this.h) {
            test.y = this.y + this.h; // borda inferior
        }

        // Distância entre o centro do círculo e o ponto de teste
        const distance = new Vector2(circle.x - test.x, circle.y - test.y).magnitude();

        // Se a distância for menor que o raio do círculo, há colisão
        if (distance <= circle.r) {
            return true;
        }
        return false;
    }

    public checkCollisionWithRect(rect: CollisionRect): boolean {
        // Verificando se há colisão na esquerda
        if (this.x > rect.x + rect.w) {
            return true;
        }

        // Verificando se há colisão na direita
        if (this.x + this.w < rect.x) {
            return true;
        }

        // Verificando se há colisão em cima
        if (this.y > rect.y + rect.h) {
            return true;
        }

        // Verificando se há colisão em baixo
        if (this.y + this.h < rect.y) {
            return true;
        }

        return false;
    }
}
