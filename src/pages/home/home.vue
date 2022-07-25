<template>
    <v-row justify="center" style="height: 95vh; overflow: hidden;">
        <v-container fluid>
            <v-col style="height: 100%">
                <v-row style="height: 80%" justify="center" no-gutters>
                    <v-col align-self="center">
                        <v-sheet class="no-bg">
                            <v-card-title
                                    class="display-1 pa-0 justify-center slogan z-index-2"
                                    :class="{ 'amber--text text--accent-2' : !$vuetify.theme.isDark }"
                            >
                                "Plan Your Work and
                            </v-card-title>
                            <v-card-title
                                    class="pa-0 justify-center slogan z-index-2"
                                    :class="{ 'display-3' : currentBreakpoint !== 'xs',
                                     'display-2' : currentBreakpoint === 'xs',
                                     'amber--text text--accent-3' : !$vuetify.theme.isDark }">
                                Work Your Plan"
                            </v-card-title>
                            <v-row justify="center">
                                <v-card-subtitle class="pa-5 text-justify z-index-2" style="width: 450px;">
                                    <b :class="{ 'indigo--text text--accent-3' : !$vuetify.theme.isDark }">Scrum Planning Poker</b> is an elegant,
                                    free-to-use tool which provides an easy and effective way for agile teams to plan
                                    their sprints.
                                </v-card-subtitle>
                            </v-row>
                            <v-row justify="center">
                                <v-btn dark rounded depressed class="ma-3 slogan-btn z-index-2" :color="btnColor"
                                       @click="getStarted()">
                                    Get Started
                                </v-btn>

                                <v-dialog persistent v-model="sessionDialog" max-width="350px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn rounded outlined class="ma-3 slogan-btn z-index-2"
                                               :color="btnColor" v-on="on">
                                            <v-icon class="mr-2">mdi-account-multiple-plus-outline</v-icon>
                                            Join a Session
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>Join Session</v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid">
                                                <v-text-field :color="textFieldColor" filled label="Session ID" v-model="sessionId" counter="20"
                                                              maxlength="20" @input="validate"
                                                              :rules="[sessionIdLength]"
                                                              :error-messages="validation.errors"
                                                ></v-text-field>
                                            </v-form>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer/>
                                            <v-btn text :color="btnColor" class="slogan-btn" @click="close()">
                                                Cancel
                                            </v-btn>
                                            <v-btn text :color="btnColor" class="slogan-btn"
                                                   :disabled="!isValidSessionId" @click="joinSession()">
                                                Join
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                        </v-sheet>
                    </v-col>
                    <v-col align-self="center" class="hidden-xs-only">
                        <v-sheet class="no-bg">
                            <scrum-logo/>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-col>
        </v-container>
        <floating-shapes :height="height" :width="width"/>
        <v-card-subtitle class="grey--text text--lighten-2 copyright"> Copyright © {{ new Date().getFullYear() }} Scrum
            Planning Poker
        </v-card-subtitle>
    </v-row>
</template>

<script>
    import ScrumLogo from "../../components/scrum-logo";
    import FloatingShapes from "../../components/floating-shapes";
    import AuthMixin from "../../mixins/AuthMixin";
    import DatabaseMixin from "../../mixins/DatabaseMixin";
    import RulesMixin from "../../mixins/RulesMixin";
    import BreakpointMixin from "../../mixins/BreakpointMixin";
    import ColorMixin from "../../mixins/ColorMixin";

    export default {
        name: "home",
        mixins: [AuthMixin, BreakpointMixin, ColorMixin, DatabaseMixin, RulesMixin],
        components: {FloatingShapes, ScrumLogo},
        data: () => ({
            sessionDialog: false,
            sessionId: '',
            valid: false, // form is valid
            validation: {
                errors: [],
                valid: false, // valid session id
                validated: false, // response received from server
                validating: false // awaiting response from server
            }
        }),
        methods: {
            close() {
                this.sessionDialog = false
                this.sessionId = ''
                this.reset()
            },
            getStarted() {
                if (this.getUser()) this.$router.push("/dashboard")
                else this.signInWithGoogle()
            },
            joinSession() {
                this.$router.push(`/session/${this.sessionId}`)
                this.close()
            },
            reset () {
                if (this.$refs.form) {
                    this.$refs.form.reset()
                    this.$refs.form.resetValidation()
                }
            },
            async validate(value) {
                this.validation.errors = []
                if (value.length === 20) {
                    this.validation.validating = true;
                    this.validation.validated = await this.validateSessionId()
                    this.validation.validating = false;

                    if (this.validation.validated === false) {
                        this.validation.errors = ['Invalid session id.']
                    }
                }
            },
            validateSessionId() {
                return this.getFromCollection('sessions', this.sessionId)
                    .then((docSnapshot) => {
                        return docSnapshot.exists
                    })
            }
        },
        computed: {
            height() {
                return window.innerHeight
            },
            isValidSessionId() {
                return !this.validation.validating && this.sessionId && this.validation.validated;
            },
            width() {
                return window.innerWidth
            }
        }
    }
</script>

<style scoped lang="scss">
    .z-index-2 {
        position: relative;
        z-index: 2;
    }

    .no-bg {
        background: unset;
    }

    .copyright {
        position: absolute;
        bottom: min(30px, 3vh);
        transition: 0.5s ease-out;
        opacity: 50%;
        user-select: none;

        &:hover {
            opacity: 100%;
            cursor: default;
        }
    }

    .morph {
        width: 100%;
        height: 100%;
        transform: scaleX(-1);
        position: absolute;
        top: 45vh;
        right: 95vw;
        z-index: 1;
    }

    .slogan {
        font-family: "CircularStd", sans-serif !important;
    }

    .slogan-btn {
        font-weight: 400;
        text-transform: none;
        letter-spacing: 0.025em;
    }
</style>
