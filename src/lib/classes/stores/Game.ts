import _ from "lodash"
import { RobotStore } from "./Robot"

export class GameStore {
    constructor() {}

    get isConnected(): boolean {
        return $appStore.isConnected
    }
    async initialize(user: RobotStore): Promise<void> {
        await $appStore.program.instruction
            .initialize()
            .accounts({
                user: user.pubkey
            })
            .rpc()
    }
    async delete(user: RobotStore): Promise<void> {
        await $appStore.program.instruction
        .delete()
        .accounts({
            receiver: user.pubkey
        })
        .rpc()
    }
    async stealFrom(robber: RobotStore, robber_idx: number, victim: RobotStore, victim_idx: number): Promise<boolean> {
        await $appStore.program.instruction
            .steal(robber_idx, victim_idx)
            .accouts({
                robber: robber.pubkey,
                victim: victim.pubkey,
            })
            .rpc()
    }
}

