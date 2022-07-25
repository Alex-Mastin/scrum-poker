<template>
    <div class="h100">
        <v-app-bar :dark="dark" :color="color" flat :class="{ 'px-5' : currentBreakpoint !== 'xs', 'px-0' : currentBreakpoint === 'xs' }">
            <router-link to="/">
                <v-toolbar-title class="header-title" :style="{ color: headerTitleColor }">
                    Scrum Planning Poker
                </v-toolbar-title>
            </router-link>
            <v-spacer/>
            <!--  Not logged in  -->
            <div v-if="!getUser()">
                <v-btn rounded text class="header-btn" :color="navBtnColor" @click="signInWithGoogle()">Login</v-btn>
                <v-btn rounded text class="header-btn" :color="navBtnColor" @click="signInWithGoogle()">Sign Up</v-btn>
            </div>

            <!--  Logged in -->
            <div v-else>
                <v-btn rounded text :icon="currentBreakpoint === 'xs'" class="header-btn" :color="navBtnColor" exact-active-class="no-bg-color"
                       to="/dashboard">
                    <v-icon :class="{ 'mr-2' : currentBreakpoint !== 'xs' }">mdi-account-circle-outline</v-icon>
                    <span class="hidden-xs-only">{{ getName() }}</span>
                </v-btn>
                <v-btn rounded text class="header-btn" :color="navBtnColor" exact-active-class="no-bg-color" to="/"
                       @click="signOut()">
                    <span>Sign Out</span>
                </v-btn>
            </div>
            <v-btn icon class="ml-2 hidden-xs-only" :color="navBtnColor" @click="toggleDarkMode()">
                <v-icon>{{ this.$vuetify.theme.isDark ? 'mdi-brightness-7' : 'mdi-brightness-4' }}</v-icon>
            </v-btn>
        </v-app-bar>
        <div id="serviceWorkerMount"></div>
        <v-content class="h100">
            <router-view></router-view>
        </v-content>
        <div id="firebaseui-auth-container" v-show="false"></div>
    </div>
</template>

<script>
    import ColorMixin from "@/mixins/ColorMixin";
    import AuthMixin from "@/mixins/AuthMixin";
    import BreakpointMixin from "@/mixins/BreakpointMixin";

    export default {
        name: "navigation",
        mixins: [ColorMixin, AuthMixin, BreakpointMixin],
        methods: {
            toggleDarkMode() {
                this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
            }
        },
        created() {
            this.initAuth()
        },
        mounted() {
            this.initAuth()
        },
        updated() {
            this.initAuth()
        }
    }
</script>

<style scoped lang="scss">
    .header-title {
        font-weight: 800;
        user-select: none;
    }

    .header-btn {
        font-weight: 500;
        text-transform: none;
        letter-spacing: normal;
    }

    a {
        &.router-link-exact-active, &.router-link-active {
            text-decoration: none;
        }

        &.header-btn {
            font-weight: 500;
            text-transform: none;
            letter-spacing: normal;
        }
    }

    .v-btn--active {
        &.no-bg-color::before {
            background-color: transparent;
        }
    }

    .overflow-hidden {
        overflow: hidden;
    }
</style>
