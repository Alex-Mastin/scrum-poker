// @ts-ignore
import humanizeDuration from 'humanize-duration'

export default {
    methods: {
        timeSince (time: number) {
            return humanizeDuration(new Date().getTime() - time)
        }
    }
}
