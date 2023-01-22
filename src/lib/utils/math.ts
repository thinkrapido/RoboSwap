
import _ from "lodash"

export const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value))
}

export const slice = <T>(value: T[], start: number = 0, len: number = 0, skip: number = 1): T[] => {
    let out = value
    out = _.drop(out, start)
    if (len > 0) {
        out = _.chain(out)
            .take(len * skip)
            .chunk(skip)
            .map((d: any[]) => _.take(d, 1))
            .flatten()
            .value()
    }    
    return out
}
