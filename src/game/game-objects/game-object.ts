import Game from "../game";
import Vector2 from "../shared/vector2";

export default abstract class GameObject {
    public static game: Game;
    public get game() {
        return GameObject.game;
    }

    private readonly objects: Map<string, GameObject[]> = new Map();

    public readonly id = crypto.randomUUID();
    public abstract readonly name: string;

    public zIndex = 0;
    public readonly coord: Vector2 = new Vector2(0, 0); // As coordenas do objeto na tela

    // A posição X do objeto
    public get x() {
        return this.coord.x;
    }
    // A posição Y do objeto
    public get y() {
        return this.coord.y;
    }

    constructor(coord?: Vector2) {
        this.coord = coord ?? this.coord;
    }

    public create?(): void;
    public update?(delta: number): void;
    public draw?(ctx: CanvasRenderingContext2D): void;
    public destroy?(): void;

    public find<T extends GameObject>(name: string, cache = true): T[] {
        if (!this.objects.has(name) || !cache) {
            this.objects.set(name, this.game.findByName<T>(name));
        }

        return this.objects.get(name) as T[];
    }
}
