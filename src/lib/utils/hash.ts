
import _ from "lodash"

export const shorten = (hash: string): string => {
    const left  = _.take(hash, 4).join('')
    const right = _.takeRight(hash, 4).join('')
    return `${left}...${right}`
}
