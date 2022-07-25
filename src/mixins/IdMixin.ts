// @ts-ignore
import shortid from 'shortid'
export default {
    methods: {
        generateId () {
            return shortid.generate()
        }
    }
}
