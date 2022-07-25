// @ts-ignore
import colors from 'vuetify/lib/util/colors'

export default {
    computed: {
        /* Color of v-avatar on dashboard grid view */
        avatarColor () {
            return this.$vuetify.theme.isDark ? 'white' : 'primary'
        },
        /* Color of v-avatar's icon on dashboard grid view */
        avatarIconColor () {
            return this.$vuetify.theme.isDark ? 'black' : 'white'
        },
        btnColor() {
            return this.$vuetify.theme.isDark ? undefined : 'primary'
        },
        checkboxColor () {
            return this.$vuetify.theme.isDark ? 'white' : 'primary'
        },
        chipColor () {
            return this.$vuetify.theme.isDark ? undefined : 'primary'
        },
        chipAccentColor () {
            return this.$vuetify.theme.isDark ? undefined : 'secondary'
        },
        /* app-bar background color */
        color () {
            switch (this.$route.fullPath) {
                case "/":
                    return 'transparent'
                default:
                    return this.$vuetify.theme.isDark ? undefined : 'primary'
            }
        },
        /* app-bar dark prop (text color of buttons) */
        dark () {
            return this.$route.fullPath !== "/";
        },
        /* Color of fab button on dashboard */
        fabColor () {
            return this.$vuetify.theme.isDark ? 'white' : 'secondary'
        },
        /* Text color of hidden votes */
        hiddenVoteColor () {
            return this.$vuetify.theme.isDark ? undefined : 'success'
        },
        /* app-bar text color (site name)  */
        headerTitleColor () {
            switch (this.$route.fullPath) {
                case "/":
                    return colors.grey.base
                default:
                    return 'white'
            }
        },
        /* color for the in-progress icon on the planning session screen */
        inProgressIconColor () {
            return this.$vuetify.theme.isDark ? 'white' : 'primary'
        },
        /* Color for buttons in navigation component */
        navBtnColor () {
            switch (this.$route.fullPath) {
                case "/":
                    return this.$vuetify.theme.isDark ? undefined : 'primary'
                default:
                    return 'white'
            }
        },
        selectColor () {
            return this.$vuetify.theme.isDark ? 'white' : 'primary'
        },
        textFieldColor () {
            return this.$vuetify.theme.isDark ? 'white' : 'primary'
        }
    }
}

