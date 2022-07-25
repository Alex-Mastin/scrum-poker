<template>
    <v-container>
        <v-col>
            <v-row align="center">
                <v-toolbar-title class="header-title headline align-baseline d-flex">
                    <v-icon class="mr-2">mdi-lightbulb-on-outline</v-icon>
                    Sessions ({{ sessions.length }})
                </v-toolbar-title>
                <v-spacer/>
                <v-btn-toggle mandatory v-model="display">
                    <v-btn :ripple="false">
                        <v-icon>mdi-view-headline</v-icon>
                    </v-btn>
                    <v-btn :ripple="false">
                        <v-icon>mdi-view-grid-outline</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </v-row>
            <v-row class="mt-5" v-if="display === 0">
                <v-list width="100%" class="no-bg">
                    <v-list-item class="pb-5 mb-5">
                        <v-card flat outlined width="100%" class="dashed">
                            <v-card-text class="align-center d-flex">
                                Create a new session

                                <v-dialog persistent v-model="dialogs.sessionDialog" width="675px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn :color="fabColor" fab absolute bottom right v-on="on">
                                            <v-icon color="black">mdi-plus</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>{{ formTitle }}</v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid">
                                                <v-text-field maxlength="20" counter="20" :color="textFieldColor" filled label="Title" :rules="[required]" v-model="newSession.title"></v-text-field>
                                                <v-select :color="selectColor" filled multiple chips label="Cards" :rules="[required]" v-model="newSession.cards" :items="cards"></v-select>
                                                <v-list>
                                                    <v-subheader style="height: unset;">Options</v-subheader>
                                                    <v-list-item>
                                                        <v-col>
                                                            <v-row>
                                                                <v-col class="pa-0">
                                                                    <v-checkbox v-model="newSession.options.allowJoinAsObserver"
                                                                                :label="newSession.options.allowJoinAsObserver ? 'Allow joining as observer*' : 'Allow joining as observer'"
                                                                                :hint="newSession.options.allowJoinAsObserver ? '*Observers cannot vote' : undefined"
                                                                                :color="checkboxColor"
                                                                                persistent-hint
                                                                    ></v-checkbox>
                                                                </v-col>
                                                                <v-col class="pa-0">
                                                                    <v-checkbox v-model="newSession.options.requireVote"
                                                                                :label="newSession.options.requireVote ? 'All participants must vote*' : 'All participants must vote'"
                                                                                :hint="newSession.options.requireVote ? '*Voting will be required for the host' : undefined"
                                                                                :color="checkboxColor"
                                                                                persistent-hint
                                                                    ></v-checkbox>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row>
                                                                <v-col class="pa-0">
                                                                    <v-checkbox v-model="newSession.options.allowItemChange"
                                                                                label="Allow any participant to change the selected item"
                                                                                :color="checkboxColor"
                                                                    ></v-checkbox>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-list-item>
                                                </v-list>
                                            </v-form>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer/>
                                            <v-btn text :color="btnColor" class="dashboard-btn" @click="close()">Cancel</v-btn>
                                            <v-btn text :color="btnColor" class="dashboard-btn" :disabled="!valid" @click="submit()">Continue</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                    <v-list-item :class="[ i === 0 ? 'pt-5 pb-1' : 'py-1' ]" v-for="(session, i) in sessions" :key="i">
                        <v-card flat outlined width="100%">
                            <v-card-title>
                                <v-skeleton-loader type="chip" v-if="!session.dateCreated"></v-skeleton-loader>
                                <router-link v-else :to="`/session/${session.id}`" class="text--primary">{{ session.title }}</router-link>
                                <v-tooltip right>
                                    <template v-slot:activator="{ on }">
                                        <v-icon small class="pl-1" color="grey" v-on="on">mdi-information</v-icon>
                                    </template>
                                    <span>{{ session.items.length }} {{ session.items.length !== 1 ? 'planned items' : 'planned item' }}</span>
                                </v-tooltip>
                                <v-spacer></v-spacer>
                                <v-chip :small="currentBreakpoint === 'xs'" :color="chipColor" class="mx-2">
                                    <v-icon :small="currentBreakpoint === 'xs'" class="pr-2">mdi-account-group</v-icon>
                                    {{ getParticipantCount(session.participants.length) }}
                                </v-chip>
                                <v-menu left offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on">
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item @click="editSession(session)">
                                            <v-icon class="mr-3">mdi-pencil-outline</v-icon>
                                            Edit
                                        </v-list-item>
                                        <v-dialog v-model="dialogs.deleteSessionDialog" width="300px">
                                            <template v-slot:activator="{ on }">
                                                <v-list-item v-on="on">
                                                    <v-icon class="mr-3">mdi-trash-can-outline</v-icon>
                                                    Delete
                                                </v-list-item>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                    Delete session?
                                                </v-card-title>
                                                <v-card-text>{{ session.title }} will be deleted permanently. This action cannot be undone.</v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text :color="btnColor" class="dashboard-btn" @click="close()">Cancel</v-btn>
                                                    <v-btn text :color="btnColor" class="dashboard-btn" @click="confirmDelete(session.id)">Delete</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-list>
                                </v-menu>
                            </v-card-title>
                            <v-card-subtitle>
                                <v-skeleton-loader type="list-item" v-if="!session.dateCreated" class="px-0" width="25%"></v-skeleton-loader>
                                <span v-else>Created on {{ session.dateCreated.toDate().toLocaleDateString(undefined, dateFormatOptions) }}</span>
                            </v-card-subtitle>
                        </v-card>
                    </v-list-item>
                </v-list>
            </v-row>
            <v-row class="mt-5" v-else>
                <v-list width="100%" class="no-bg">
                    <v-list-item class="pb-5 mb-5">
                        <v-card flat outlined width="100%" class="dashed">
                            <v-card-text class="align-center d-flex">
                                Create a new session

                                <v-dialog persistent v-model="dialogs.sessionDialog" width="675px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn :color="fabColor" fab absolute bottom right v-on="on">
                                            <v-icon color="black">mdi-plus</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>{{ formTitle }}</v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid">
                                                <v-text-field maxlength="20" counter="20" :color="textFieldColor" filled label="Title" :rules="[required]" v-model="newSession.title"></v-text-field>
                                                <v-select :color="selectColor" filled multiple chips label="Cards" :rules="[required]" v-model="newSession.cards" :items="cards"></v-select>
                                                <v-list>
                                                    <v-subheader style="height: unset;">Options</v-subheader>
                                                    <v-list-item>
                                                        <v-col>
                                                            <v-row>
                                                                <v-col class="pa-0">
                                                                    <v-checkbox v-model="newSession.options.allowJoinAsObserver"
                                                                                :label="newSession.options.allowJoinAsObserver ? 'Allow joining as observer*' : 'Allow joining as observer'"
                                                                                :hint="newSession.options.allowJoinAsObserver ? '*Observers cannot vote' : undefined"
                                                                                :color="checkboxColor"
                                                                                persistent-hint
                                                                    ></v-checkbox>
                                                                </v-col>
                                                                <v-col class="pa-0">
                                                                    <v-checkbox v-model="newSession.options.requireVote"
                                                                                :label="newSession.options.requireVote ? 'All participants must vote*' : 'All participants must vote'"
                                                                                :hint="newSession.options.requireVote ? '*Voting will be required for the host' : undefined"
                                                                                :color="checkboxColor"
                                                                                persistent-hint
                                                                    ></v-checkbox>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row>
                                                                <v-col class="pa-0">
                                                                    <v-checkbox v-model="newSession.options.allowItemChange"
                                                                                label="Allow any participant to change the selected item"
                                                                                :color="checkboxColor"
                                                                    ></v-checkbox>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-list-item>
                                                </v-list>
                                            </v-form>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer/>
                                            <v-btn text :color="btnColor" class="dashboard-btn" @click="close()">Cancel</v-btn>
                                            <v-btn text :color="btnColor" class="dashboard-btn" :disabled="!valid" @click="submit()">Continue</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                </v-list>
                <v-col cols="12" lg="3" md="4" sm="6" v-for="(session, i) in sessions" :key="i" style="padding: 12px 16px 16px">
                    <v-card flat outlined width="100%" height="275px">
                        <v-card-title style="height: 82.5%">
                            <v-col class="h100">
                                <v-tooltip right>
                                    <template v-slot:activator="{ on }">
                                        <v-icon class="ma-2" style="position: absolute; top: 0; left: 0;" color="grey" v-on="on">mdi-information</v-icon>
                                    </template>
                                    <span>{{ session.items.length }} {{ session.items.length !== 1 ? 'planned items' : 'planned item' }}</span>
                                </v-tooltip>
                                <v-row class="h100" align="center" justify="center">
                                    <div>
                                        <v-row justify="center">
                                            <v-avatar :color="avatarColor" size="100">
                                                <v-col class="pb-0">
                                                    <v-row justify="center">
                                                        <v-icon large :color="avatarIconColor">mdi-account-group-outline</v-icon>
                                                    </v-row>
                                                    <v-row justify="center">
                                                        <span :class="{ 'white--text' : !$vuetify.theme.isDark, 'black--text' : $vuetify.theme.isDark }">{{ session.participants.length }}</span>
                                                    </v-row>
                                                </v-col>
                                            </v-avatar>
                                        </v-row>
                                        <v-row justify="center">
                                            <router-link :to="`/session/${session.id}`" class="text--primary headline font-weight-medium">{{ session.title }}</router-link>
                                        </v-row>
                                        <v-row justify="center">
                                            <v-card-subtitle>Created on {{ session.dateCreated.toDate().toLocaleDateString(undefined, dateFormatOptions) }}</v-card-subtitle>
                                        </v-row>
                                    </div>
                                </v-row>
                            </v-col>
                        </v-card-title>
                        <v-col class="pa-0" style="position: absolute; bottom: 0;">
                            <v-divider/>
                            <v-row class="mx-0">
                                <v-col class="pa-0">
                                    <v-list-item @click="editSession(session)">
                                        <v-row align="center" justify="center">
                                            Edit
                                        </v-row>
                                    </v-list-item>
                                </v-col>
                                <v-divider vertical/>
                                <v-col class="pa-0">
                                    <v-dialog v-model="dialogs.deleteSessionDialog" width="300px">
                                        <template v-slot:activator="{ on }">
                                            <v-list-item v-on="on">
                                                <v-row align="center" justify="center">
                                                    Delete
                                                </v-row>
                                            </v-list-item>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                Delete session?
                                            </v-card-title>
                                            <v-card-text>{{ session.title }} will be deleted permanently. This action cannot be undone.</v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text :color="btnColor" class="dashboard-btn" @click="close()">Cancel</v-btn>
                                                <v-btn text :color="btnColor" class="dashboard-btn" @click="confirmDelete(session.id)">Delete</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
    import AuthMixin from "../../mixins/AuthMixin";
    import DatabaseMixin from "../../mixins/DatabaseMixin";
    import RulesMixin from "../../mixins/RulesMixin";
    import TimeMixin from "../../mixins/TimeMixin";
    import BreakpointMixin from "../../mixins/BreakpointMixin";
    import ColorMixin from "../../mixins/ColorMixin";

    export default {
        name: "dashboard",
        mixins: [AuthMixin, BreakpointMixin, ColorMixin, DatabaseMixin, RulesMixin, TimeMixin],
        components: {},
        data: () => ({
            defaultSession: {
                cards: [0,'½',1,2,3,5,8,13,21,34,55,89,100],
                id: '',
                options: {
                    allowJoinAsObserver: false,
                    requireVote: false,
                    allowItemChange: false
                },
                title: '',
            },
            dialogs: {
                sessionDialog: false,
                deleteSessionDialog: false
            },
            display: 0,
            edit: false,
            newSession: {
                cards: [0,'½',1,2,3,5,8,13,21,34,55,89,100],
                id: '',
                options: {
                    allowJoinAsObserver: false,
                    requireVote: false,
                    allowItemChange: false
                },
                title: ''
            },
            cards: [0,'½',1,2,3,5,8,13,20,21,34,40,55,89,100,'?'],
            valid: false
        }),
        methods: {
            close () {
                this.dialogs.sessionDialog = false
                this.dialogs.deleteSessionDialog = false
                this.reset()
                this.edit = false
            },
            confirmDelete (docId) {
                this.deleteFromCollection('sessions', docId)
                this.close()
            },
            editSession (session) {
                Object.assign(this.newSession, session)
                this.newSession.id = session.id
                this.edit = true;
                this.dialogs.sessionDialog = true;
            },
            open () {
                Object.assign(this.newSession, this.defaultSession)
                this.dialogs.sessionDialog = true
            },
            getParticipantCount(participants) {
                if (this.currentBreakpoint === 'xs') return participants
                else return participants !== 1 ? `${participants} participants` : `${participants} participant`
            },
            reset () {
                if (this.$refs.form) {
                    this.$refs.form.reset()
                    this.$refs.form.resetValidation()
                }
                this.newSession = JSON.parse(JSON.stringify(this.defaultSession));
            },
            submit () {
                if (this.edit) {
                    const filteredSessions = this.sessions.filter(session => session.id !== this.newSession.id)

                    if (this.newSession.options.allowJoinAsObserver === undefined) this.newSession.options.allowJoinAsObserver = false
                    if (this.newSession.options.requireVote === undefined) this.newSession.options.requireVote = false
                    if (this.newSession.options.allowItemChange === undefined) this.newSession.options.allowItemChange = false

                    filteredSessions.push(this.newSession)

                    this.updateFieldInDocument('sessions', this.newSession.id, this.newSession)
                }
                else {
                    this.addToCollection('sessions', {
                        cards: this.newSession.cards,
                        dateCreated: this.serverTimestamp(),
                        items: [],
                        lastModified: this.serverTimestamp(),
                        options: this.newSession.options,
                        participants: [],
                        selectedItem: '',
                        title: this.newSession.title,
                        uid: this.getUser().uid
                    })
                }
                this.close()
            },
            validate () {
                this.$refs.form.validate()
            }
        },
        computed: {
            dateFormatOptions () {
                return {
                    day: 'numeric',
                    month: 'long',
                    weekday: undefined,
                    year: 'numeric'
                }
            },
            formTitle () {
                return this.edit ? 'Edit session' : 'New session'
            }
        }
    }
</script>

<style lang="scss">
    .v-application .overline,
    .v-application .caption,
    .v-application .body-2,
    .v-application .body-1,
    .v-application .subtitle-2,
    .v-application .subtitle-1,
    .v-application .title,
    .v-application .headline,
    .v-application .display-1,
    .v-application .display-2,
    .v-application .display-3,
    .v-application .display-4 {
        font-family: "CircularStd", sans-serif !important;
    }


    .v-skeleton-loader {
        &.px-0 {
            .v-skeleton-loader__list-item {
                padding: 0;
            }
        }
    }

</style>

<style lang="scss">
    .v-subheader {
        height: unset;
    }

    .no-bg {
        background: unset !important;
    }

    .v-list {
        &.theme--dark {
            .v-list-item--active {
                color: inherit !important;
            }
            .primary--text {
                color: inherit !important;
            }
        }
    }
</style>

<style scoped>
    .dashed {
        border-style: dashed !important;
    }
    .header-title {
        font-weight: 500 !important;
    }
    .dashboard-btn {
        font-weight: 400;
        text-transform: none;
        letter-spacing: 0.025em;
    }
</style>
