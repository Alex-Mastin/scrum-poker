export default {
    computed: {
        currentBreakpoint () {
            if (this.isXs) return 'xs'
            if (this.isSm) return 'sm'
            if (this.isMd) return 'md'
            if (this.isLg) return 'lg'
            if (this.isXl) return 'xl'
        },
        height () {
            return this.$vuetify.breakpoint.height
        },
        isLg () {
            /* 1264px to 1904px */
            return this.$vuetify.breakpoint.lg
        },
        isMd () {
            /* 960px to 1264px */
            return this.$vuetify.breakpoint.md
        },
        isSm () {
            /* 600px to 960px */
            return this.$vuetify.breakpoint.sm
        },
        isXl () {
            /* > 1904px */
            return this.$vuetify.breakpoint.xl
        },
        isXs () {
            /* < 600px */
            return this.$vuetify.breakpoint.xs
        },
        mdAndDown () {
            return this.$vuetify.breakpoint.mdAndDown
        },
        smAndDown () {
            return this.$vuetify.breakpoint.smAndDown
        },
        width () {
            return this.$vuetify.breakpoint.width
        }
    }
}
