
import _ from "lodash"

export const shorten = (hash: string): string => {
    const left  = _.take(hash, 3).join('')
    const right = _.takeRight(hash, 3).join('')
    return `${left}..${right}`
}
