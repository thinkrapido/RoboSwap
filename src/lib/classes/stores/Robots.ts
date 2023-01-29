
import { picUrl } from "$lib/utils/hash";
import { clamp } from "$lib/utils/math";
import type { web3 } from "@project-serum/anchor";
import { writable } from "svelte/store";
import { getRandomRobots, MAX_ROBOTS, type GameRobot } from "./Game";

export class Robots {

    constructor(robots?: GameRobot[]) {
        this._robots = robots || getRandomRobots()
    }

    private _robots: GameRobot[] = []

    robot0(): GameRobot {
        return this._robots[0]
    }
    robot(idx: number): GameRobot {
        idx = clamp(idx, 1, MAX_ROBOTS)
        return this._robots[idx]
    }
    robots(): GameRobot[] {
        return this._robots
    }

    pubkey0(): web3.PublicKey {
        return this.robot0().wallet
    }
    pubkey(idx: number): web3.PublicKey {
        return this.robot(idx).owner
    }

    hash0(): string {
        return this.pubkey0().toBase58()
    }
    hash(idx: number): string {
        return this.pubkey(idx).toBase58()
    }

    picUrl0(): string {
        return picUrl(this.pubkey0())
    }
    picUrl(idx: number): string {
        return picUrl(this.pubkey(idx), this.robot(idx).idx)
    }

    stolen(idx: number): number {
        return this.robot(idx).stolen
    }
}

export const robberStore = writable(new Robots())
export const victimStore = writable(new Robots())