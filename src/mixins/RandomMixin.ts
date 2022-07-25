// @ts-ignore
import random from 'random'

export default {
    methods: {
        randomMin (min: number) {
            return Math.floor(Math.random() * min)
        },
        randFloat(min: number, max: number, floor?: boolean): number {
            return floor ? Math.floor(random.float(min, max)) : random.float(min, max);
        },
        randInt(min: number, max: number, floor?: boolean): number {
            return floor ? Math.floor(random.int(min, max)) : random.int(min, max);
        }
    }
}
