// @ts-ignore
import DatabaseMixin from './DatabaseMixin.js'

export default {
    mixins: [DatabaseMixin],
    methods: {
        required: (v: string) => (v && v.length > 0) || 'Required.',
        sessionIdLength: (v: string) => v.length === 20 || 'Must be 20 characters long.'
    }
}
