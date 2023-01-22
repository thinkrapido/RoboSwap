
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

export const getInt64Bytes = (x: number): number[] => {
    let y= Math.floor(x/2**32);
    return [y,(y<<8),(y<<16),(y<<24), x,(x<<8),(x<<16),(x<<24)].map(z=> z>>>24)
}
export const getInt32Bytes = (x: number): number[] => {
    return _.takeRight(getInt64Bytes(x), 4)
}
export const getInt16Bytes = (x: number): number[] => {
    return _.takeRight(getInt64Bytes(x), 2)
}
export const getInt8Bytes = (x: number): number[] => {
    return _.takeRight(getInt64Bytes(x), 1)
}

export const intFromBytes = (byteArr: number[]): number => {
    return byteArr.reduce((a,c,i)=> a+c*2**(56-i*8),0)
}