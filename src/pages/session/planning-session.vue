<template>
    <v-row class="h100">
        <v-col cols="6" sm="4" md="3" lg="2" xl="2" class="py-0 pr-0 hidden-md-and-down">
            <v-navigation-drawer permanent width="100%" :height="height - 64">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title v-if="!currentSession.title">
                            <v-skeleton-loader class="py-1" type="heading"></v-skeleton-loader>
                        </v-list-item-title>
                        <v-list-item-title class="title" v-else>
                            <span class="text-truncate">{{ currentSession.title }}</span>

                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <div v-if="!currentSession.items">
                                <v-skeleton-loader type="text"></v-skeleton-loader>
                            </div>
                            <span v-else>{{ currentSession.items.length }} {{ currentSession.items.length !== 1 ? 'planned items' : 'planned item' }}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-dialog persistent width="400px" v-model="dialogs.itemDialog" v-if="isHost">
                            <template v-slot:activator="{ on }">
                                <v-btn icon class="float-right" v-on="on">
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>{{ formTitle }}</v-card-title>
                                <v-card-text>
                                    <v-form ref="form" v-model="valid">
                                        <v-text-field maxlength="20" counter="20" :color="textFieldColor" filled label="Title" :rules="[required]" autofocus
                                                      v-model="newItem.title"></v-text-field>
                                        <v-textarea maxlength="50" counter="50" :color="textFieldColor" filled label="Description" persistent-hint hint="Optional."
                                                    v-model="newItem.description"></v-textarea>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text :color="btnColor" class="planning-poker-btn" @click="close()">
                                        Cancel
                                    </v-btn>
                                    <v-btn text :color="btnColor" class="planning-poker-btn" :disabled="!valid"
                                           @click="submit()">Finish
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <div v-if="!currentSession.items">
                    <v-skeleton-loader v-for="i in 15" :key="i" type="list-item-three-line"></v-skeleton-loader>
                </div>
                <v-list v-else>
                    <v-list-item v-for="(item, i) in sortedItems" :key="i" @click="(1 + 1)">
                        <v-list-item-content @click="selectItem(item.id)">
                            <v-list-item-title>
                                <span>{{ item.title }}</span>
                                <v-skeleton-loader
                                        v-if="currentSession.participants === undefined || item.participants === undefined"
                                        type="list-item-two-line" style="width: 75%"></v-skeleton-loader>
                                <div class="d-inline-block" v-else>
                                    <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                            <v-icon color="grey"
                                                    class="ml-2"
                                                    v-show="allParticipantsVoted(item)"
                                                    v-on="on">
                                                mdi-check-decagram
                                            </v-icon>
                                        </template>
                                        <span>All participants voted</span>
                                    </v-tooltip>
                                    <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                            <v-icon color="grey"
                                                    class="ml-2"
                                                    v-show="someParticipantsVoted(item)"
                                                    v-on="on">
                                                mdi-progress-check
                                            </v-icon>
                                        </template>
                                        <span>Some participants voted</span>
                                    </v-tooltip>
                                    <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                            <v-icon :color="inProgressIconColor"
                                                    class="ml-2"
                                                    v-show="inProgress(item.id)"
                                                    v-on="on">
                                                mdi-progress-clock
                                            </v-icon>
                                        </template>
                                        <span>Planning in progress</span>
                                    </v-tooltip>
                                </div>

                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ item.description || 'No description'}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-skeleton-loader v-if="!currentSession.participants || !item.participants" type="avatar"
                                               style="zoom: 50%;"></v-skeleton-loader>
                            <v-menu left offset-y
                                    v-else-if="isHost && (currentSession.participants || item.participants)">
                                <template v-slot:activator="{ on }">
                                    <v-btn small icon v-on="on">
                                        <v-icon small>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="editItem(item)">
                                        <v-icon class="mr-3">mdi-pencil-outline</v-icon>
                                        Edit
                                    </v-list-item>

                                    <v-dialog v-model="dialogs.deleteItemDialog" width="300px">
                                        <template v-slot:activator="{ on }">
                                            <v-list-item v-on="on">
                                                <v-icon class="mr-3">mdi-trash-can-outline</v-icon>
                                                Delete
                                            </v-list-item>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                Delete item?
                                            </v-card-title>
                                            <v-card-text>{{ item.title }} will be deleted permanently. This action
                                                cannot be undone.
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text :color="btnColor" class="planning-poker-btn" @click="close()">
                                                    Cancel
                                                </v-btn>
                                                <v-btn text :color="btnColor" class="planning-poker-btn"
                                                       @click="confirmDelete(item)">Delete
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-list>
                            </v-menu>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-col>
        <v-col id="planning-section" class="py-0 h100">
            <!-- Start selected item section -->
            <v-row style="height: 25%">
                <v-col>
                    <div v-if="!currentSession.items">
                        <div class="py-1" style="width: 300px">
                            <v-skeleton-loader type="article"></v-skeleton-loader>
                        </div>
                    </div>
                    <v-list-item v-else class="px-2">
                        <v-list-item-content class="py-0" v-if="currentSession.selectedItem">
                            <v-list-item-title class="title" style="height: 36px">
                                    <span>
                                        {{ currentItem.title }}
                                    </span>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-chip v-on="on" class="mx-1" small :color="chipAccentColor">
                                            <v-icon small class="pl-1 pr-1" left>mdi-account-group</v-icon>
                                            <span>{{ votingParticipants }}</span>
                                        </v-chip>
                                    </template>
                                    <span>{{ votingParticipants }} {{ votingParticipants !== 1 ? 'participants' : 'participant' }}</span>
                                </v-tooltip>
                                <v-tooltip bottom v-if="votingParticipants < currentSession.participants.length">
                                    <template v-slot:activator="{ on }">
                                        <v-chip v-on="on" class="mx-1" small>
                                            <v-icon small class="pl-1 pr-1" left>mdi-eye</v-icon>
                                            <span>{{ observingParticipants }}</span>
                                        </v-chip>
                                    </template>
                                    <span>{{ observingParticipants }} {{ observingParticipants !== 1 ? 'observers' : 'observer' }}</span>
                                </v-tooltip>
                                <span v-if="allowShowingVotes">
                                        <v-btn v-show="isHost && currentItem && !currentItem.showVotes" outlined text :icon="smAndDown"
                                               :color="btnColor"
                                               class="planning-poker-btn float-right mx-5" @click="showVotes(true)">
                                            <v-icon :class="{ 'pr-2' : !smAndDown }">mdi-eye-off-outline</v-icon>
                                            <span class="hidden-sm-and-down">Show votes</span>
                                        </v-btn>
                                        <v-btn v-show="isHost && currentItem && currentItem.showVotes" outlined text :icon="smAndDown"
                                               :color="btnColor"
                                               class="planning-poker-btn float-right mx-5" @click="showVotes(false)">
                                            <v-icon :class="{ 'pr-2' : !smAndDown }">mdi-eye-outline</v-icon>
                                            <span class="hidden-sm-and-down">Hide votes</span>
                                        </v-btn>
                                    </span>
                            </v-list-item-title>
                            <v-list-item-subtitle v-if="currentSession.selectedItem">
                                {{ currentItem.description || 'No description' }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row>
            <!-- End selected item section -->
            <!-- Start votes section -->
            <v-row style="height: 25%">
                <div v-if="!currentSession.items">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </div>
                <v-col v-else>
                    <v-row align="center" justify="center">
                        <div v-show="currentItem && currentItem.votes.length" v-for="(vote) in castVotes" :key="vote.id"
                             class="d-inline-block">
                            <v-row align="center" justify="center" class="no-select">{{ vote.name }}</v-row>
                            <v-card flat :outlined="currentItem.showVotes" :width="cardWidth"
                                    :height="cardHeight"
                                    class="mx-5">
                                <v-col style="height: 100%"
                                       :class="{ 'cast-vote-hidden' : !currentItem.showVotes, 'dark' : $vuetify.theme.isDark }">
                                    <v-row style="height: 100%" align="center" justify="center">
                                                <span v-if="currentItem.showVotes"
                                                      :class="{ 'indigo--text text--accent-3' : !$vuetify.theme.isDark }" :style="`transform: scale(${numberScale}); user-select: none;`">{{ vote.points }}</span>
                                        <span v-else :style="`transform: scale(${numberScale}); user-select: none;`">
                                                    <v-icon v-if="vote.id !== getParticipantId()" small :color="hiddenVoteColor">mdi-check-decagram</v-icon>
                                                    <span v-else :class="{ 'cast-vote-current-user' : !$vuetify.theme.isDark }">{{ vote.points }}</span>
                                                </span>
                                    </v-row>
                                </v-col>
                            </v-card>
                        </div>

                        <div v-if="currentSession.items.length" v-for="(pendingVote) in pendingVotes"
                             :key="pendingVote.id"
                             class="d-inline-block">
                            <v-row align="center" justify="center" class="no-select">{{ pendingVote.name }}
                            </v-row>
                            <v-card flat :width="cardWidth" :height="cardHeight" class="mx-5">
                                <v-col style="height: 100%" class="pending-vote">
                                    <v-row style="height: 100%" align="center" justify="center">
                                                    <span class="grey--text text--lighten-1"
                                                          :style="`transform: scale(${numberScale}); user-select: none;`"
                                                    >?</span>
                                    </v-row>
                                </v-col>
                            </v-card>
                        </div>
                        <div v-show="castVotes.length">
                            <v-row align="center" justify="center" class="no-select">Average</v-row>
                            <v-card flat :width="cardWidth" :height="cardHeight" class="mx-5">
                                <v-col style="height: 100%" class="average-points" :class="{ 'dark' : $vuetify.theme.isDark }">
                                    <v-row style="height: 100%" align="center" justify="center">
                                                <span v-if="currentItem && currentItem.showVotes"
                                                      :class="{ 'indigo--text text--accent-3' : !$vuetify.theme.isDark }" :style="`transform: scale(${numberScale}); user-select: none;`">{{ averagePoints }}</span>
                                        <span v-else
                                              :class="{ 'indigo--text text--accent-3' : !$vuetify.theme.isDark }" :style="`transform: scale(${numberScale}); user-select: none;`">?</span>
                                    </v-row>
                                </v-col>
                            </v-card>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
            <!-- End votes section -->
            <!-- Start points selection section -->
            <v-row style="height: 50%" align="end" justify="center" v-if="currentSession.options">
                <planning-poker-hand v-if="currentSession.items.length && allowedToVote"
                     :numbers="currentSession.cards"
                     :card-height="cardHeight"
                     :card-width="cardWidth"
                     :number-scale="numberScale"
                     :overflowed="overflowed"
                ></planning-poker-hand>
            </v-row>
            <!-- End points selection section -->

        </v-col>
        <v-dialog persistent v-model="dialogs.joinDialog" width="450px">
            <v-card>
                <v-card-title>
                    Join session
                </v-card-title>
                <v-card-text>
                    <v-text-field :color="textFieldColor" filled :rules="[required]" label="Name" v-model="participant.name"></v-text-field>
                    <div v-if="!currentSession.options">
                        <v-skeleton-loader type="chip"></v-skeleton-loader>
                        <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
                    </div>
                    <div v-else>
                        <v-list v-if="currentSession.options.allowJoinAsObserver">
                            <v-subheader style="height: unset;">Options</v-subheader>
                            <v-list-item>
                                <v-col class="pa-0">
                                    <v-checkbox v-model="participant.joinAsObserver"
                                                :label="participant.joinAsObserver ? 'Join as observer*' : 'Join as observer'"
                                                :hint="participant.joinAsObserver ? '*Observers cannot vote' : undefined"
                                                :color="checkboxColor"
                                                persistent-hint
                                    ></v-checkbox>
                                </v-col>
                            </v-list-item>
                        </v-list>
                    </div>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text :color="btnColor" class="planning-poker-btn" @click="cancelJoinSession()">Cancel</v-btn>
                    <v-btn text :color="btnColor" class="planning-poker-btn" @click="joinSession()"
                           :disabled="!participant.name">Join
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import DatabaseMixin from "../../mixins/DatabaseMixin";
    import RulesMixin from "../../mixins/RulesMixin";
    import PlanningPokerHand from "../../components/planning-poker-hand";
    import AuthMixin from "../../mixins/AuthMixin";
    import IdMixin from "../../mixins/IdMixin";
    import differenceBy from 'lodash/differenceBy'
    import BreakpointMixin from "../../mixins/BreakpointMixin";
    import ColorMixin from "../../mixins/ColorMixin";

    export default {
        name: "planning-session",
        components: {PlanningPokerHand},
        mixins: [AuthMixin, BreakpointMixin, ColorMixin, DatabaseMixin, IdMixin, RulesMixin],
        data: () => ({
            defaultItem: {
                description: '',
                id: '',
                participants: [],
                showVotes: false,
                title: '',
                votes: []
            },
            dialogs: {
                deleteItemDialog: false,
                itemDialog: false,
                joinDialog: false
            },
            edit: false,
            newItem: {
                description: '',
                id: '',
                participants: [],
                showVotes: false,
                title: '',
                votes: [],
            },
            participant: {
                name: '',
                joinAsObserver: false
            },
            valid: false
        }),
        methods: {
            allParticipantsVoted(item) {
                const itemHasVotes = item.votes.length !== 0
                const currentSessionHasParticipants = this.currentSession.participants.length !== 0
                const allParticipantsVoted = item.votes.length === this.votingParticipants
                const isNotSelectedItem = this.currentSession.selectedItem !== item.id

                return itemHasVotes && currentSessionHasParticipants && allParticipantsVoted && isNotSelectedItem
            },
            cancelJoinSession() {
                this.$router.push('/')
            },
            close() {
                this.dialogs.deleteItemDialog = false
                this.dialogs.itemDialog = false
                this.dialogs.joinDialog = false
                this.edit = false;
                this.reset()
            },
            confirmDelete(item) {
                const items = Array.from(this.currentSession.items)
                items.splice(items.indexOf(item), 1)
                const index = this.currentSession.items.indexOf(item)

                // If the current item is being deleted
                if (this.currentSession.selectedItem === item.id) {
                    // If the current item is not the very first item
                    if (index !== 0) {
                        // Set the current item to the item before the deleted item
                        this.updateFieldInDocument('sessions', this.$route.params.id, {selectedItem: this.currentSession.items[index - 1].id})
                    }
                    // If the current item is the very first item
                    else {
                        // Unset the current item
                        this.updateFieldInDocument('sessions', this.$route.params.id, {selectedItem: ''})
                    }
                }
                this.updateFieldInDocument('sessions', this.$route.params.id, {items: items})
                this.close()
            },
            delay(timer) {
                return new Promise(resolve => {
                    setTimeout(function () {
                        resolve()
                    }, timer)
                })
            },
            editItem(item) {
                Object.assign(this.newItem, item)
                this.edit = true;
                this.dialogs.itemDialog = true;
            },
            getNextLargestFibonacciNumber(averagePoints) {
                for (let i = 0; i < this.currentSession.cards.length; i++) {
                    if (this.currentSession.cards[i] === '½') {
                        if (averagePoints < 0.5) return '½'
                    } else {
                        if (averagePoints === this.currentSession.cards[i]) return this.currentSession.cards[i]
                        else if (averagePoints < this.currentSession.cards[i]) return this.currentSession.cards[i]
                    }
                }
            },
            inProgress(id) {
                return this.currentSession.selectedItem === id
            },
            joinSession() {
                this.close()
                const participants = Array.from(this.currentSession.participants)
                participants.push({
                    name: this.participant.name,
                    id: this.getParticipantId(),
                    isObserver: this.participant.joinAsObserver
                })

                this.updateFieldInDocument('sessions', this.$route.params.id, {participants: participants})

                // If voting is required and the votes are currently shown while someone new is joining
                if (this.currentItem) {
                    if (this.currentSession.options.requireVote && this.currentItem.showVotes) {
                        const items = Array.from(this.currentSession.items);
                        const filteredItems = items.filter(item => item.id !== this.currentItem.id)

                        // Hide the votes
                        this.currentItem.showVotes = false;
                        filteredItems.push(this.currentItem)

                        // Update the database
                        this.updateFieldInDocument('sessions', this.$route.params.id, {items: filteredItems})
                    }
                }
            },
            reset() {
                if (this.$refs.form) {
                    this.$refs.form.reset()
                    this.$refs.form.resetValidation()
                }
                Object.assign(this.newItem, this.defaultItem)
            },
            selectItem(id) {
                if (!this.isHost && !this.currentSession.options.allowItemChange) return
                if (this.currentSession.selectedItem !== id) {
                    this.updateFieldInDocument('sessions', this.$route.params.id, {selectedItem: id})
                }
            },
            async showJoinDialog() {
                // this.currentSession.participants isn't defined right away, we have to wait (it doesn't return a Promise)
                while (!this.currentSession.participants) {
                    await this.delay(100)
                }

                document.title = `${this.currentSession.title} | Scrum Planning Poker`

                if (this.currentSession.participants) {
                    // If there are participants already
                    if (this.currentSession.participants.length) {
                        // If this user isn't already a participant
                        if (!this.currentSession.participants.find(participant => participant.id === this.getParticipantId())) {
                            this.dialogs.joinDialog = true
                        }
                    }
                    // No participants
                    else if (!this.currentSession.participants.length) {
                        this.dialogs.joinDialog = true
                    }
                }
            },
            showVotes(show) {
                const items = this.currentSession.items
                const filteredItems = items.filter(item => item.id !== this.currentItem.id)
                this.currentItem.showVotes = show
                filteredItems.push(this.currentItem)

                this.updateFieldInDocument('sessions', this.$route.params.id, {items: filteredItems})
            },
            someParticipantsVoted(item) {
                const itemHasVotes = item.votes.length !== 0
                const currentSessionHasParticipants = this.currentSession.participants.length !== 0
                const someParticipantsVoted = item.votes.length !== this.votingParticipants
                const isNotSelectedItem = this.currentSession.selectedItem !== item.id

                return itemHasVotes && currentSessionHasParticipants && someParticipantsVoted && isNotSelectedItem
            },
            submit() {
                const items = Array.from(this.currentSession.items)
                if (this.edit) {
                    // Replace old item with edited version
                    const filteredItems = items.filter(item => item.id !== this.newItem.id)
                    filteredItems.push(this.newItem)

                    this.updateFieldInDocument('sessions', this.$route.params.id, {items: filteredItems})
                } else {
                    // Generate a random short id
                    this.newItem.id = this.generateId();
                    this.newItem.dateCreated = this.currentTimestamp()
                    items.push(this.newItem)

                    this.updateFieldInDocument('sessions', this.$route.params.id, {items: items})

                    // Select the newly added item
                    this.selectItem(this.newItem.id)
                }
                this.close()
            }
        },
        computed: {
            allowedToVote() {
                // If you can join as an observer
                if (this.currentSession.options.allowJoinAsObserver) {
                    // Determine if current user is an observer
                    const participant = this.currentSession.participants.find(participant => participant.id === this.getParticipantId())
                    // If participant was found
                    if (participant) {
                        // Allow participant to vote if they are not an observer
                        return !participant.isObserver
                    }
                    // Participant wasn't found, meaning they haven't joined the session
                    else return true
                }
                // If you can't join as an observer, you can vote
                else return true
            },
            allowShowingVotes() {
                // If you can join as an observer
                if (this.currentSession.options.allowJoinAsObserver) {
                    // If voting is required
                    if (this.currentSession.options.requireVote) {
                        // Filter out observers
                        const votingParticipants = this.currentSession.participants.filter(participant => !participant.isObserver)
                        // Only allow showing the votes if every non-observer participant has voted
                        return votingParticipants.length === this.castVotes.length && this.castVotes.length !== 0
                    }
                    // If voting is not required
                    else {
                        // Only allow showing the votes if someone has voted
                        return this.castVotes.length
                    }
                } else {
                    // If voting is required
                    if (this.currentSession.options.requireVote) {
                        // Only allow showing the votes if every participant has voted
                        return this.currentSession.participants.length === this.castVotes.length
                    }
                    // If voting is not required
                    else {
                        // Only allow showing the votes if someone has voted
                        return this.castVotes.length
                    }
                }
            },
            averagePoints() {
                let totalPoints = 0;
                if (this.castVotes.length) {
                    for (let i = 0; i < this.castVotes.length; i++) {
                        if (this.castVotes[i].points === '½') totalPoints += 0.5
                        else if (this.castVotes[i].points === '?') totalPoints += 0
                        else totalPoints += this.castVotes[i].points
                    }
                    const averagePoints = totalPoints / this.castVotes.length
                    return this.getNextLargestFibonacciNumber(averagePoints)
                } else {
                    return totalPoints
                }
            },
            cardHeight() {
                const baseHeight = 146
                switch (this.currentBreakpoint) {
                    case 'xl':
                        if (this.overflowed) return baseHeight
                        return baseHeight
                    case 'lg':
                        if (this.overflowed) return baseHeight * 0.8
                        return baseHeight
                    case 'md':
                        if (this.overflowed) return baseHeight * 0.75
                        return baseHeight
                    case 'sm':
                        if (this.overflowed) return baseHeight * 0.6
                        return baseHeight
                    case 'xs':
                        if (this.overflowed) return baseHeight * 0.5
                        return baseHeight
                }
                return baseHeight
            },
            cardWidth() {
                const baseWidth = 110
                switch (this.currentBreakpoint) {
                    case 'xl':
                        if (this.overflowed) return baseWidth
                        return baseWidth
                    case 'lg':
                        if (this.overflowed) return baseWidth * 0.8
                        else return baseWidth
                    case 'md':
                        if (this.overflowed) return baseWidth * 0.75
                        return baseWidth
                    case 'sm':
                        if (this.overflowed) return baseWidth * 0.6
                        return baseWidth
                    case 'xs':
                        if (this.overflowed) return baseWidth * 0.5
                        return baseWidth
                }
                return baseWidth
            },
            castVotes() {
                return this.currentItem &&
                this.currentItem.votes &&
                this.currentItem.votes.length ?
                    this.currentItem.votes : []
            },
            colSize() {
                switch (this.currentBreakpoint) {
                    case 'xl':
                    case 'lg':
                        return 2
                    case 'md':
                        return 3
                    case 'sm':
                        return 4
                    default:
                        return 6
                }
            },
            currentItem() {
                if (!this.currentSession.items) return {}
                else return this.currentSession.items.find(item => this.currentSession.selectedItem === item.id)
            },
            formTitle() {
                return this.edit ? 'Edit item' : 'New item'
            },
            observingParticipants() {
                const participants = Array.from(this.currentSession.participants)
                return participants.filter(participant => participant.isObserver).length
            },
            numberScale () {
                const baseScale = 3.5
                switch (this.currentBreakpoint) {
                    case 'xl':
                        if (this.overflowed) return baseScale
                        return baseScale
                    case 'lg':
                        if (this.overflowed) return baseScale * 0.8
                        return baseScale
                    case 'md':
                        if (this.overflowed) return baseScale * 0.75
                        return baseScale
                    case 'sm':
                        if (this.overflowed) return baseScale * 0.6
                        return baseScale
                    case 'xs':
                        if (this.overflowed) return baseScale * 0.5
                        return baseScale
                }
            },
            overflowed() {
                // if (!this.currentSession || !this.currentSession.cards) return false
                const drawer = this.width * (this.colSize / 12) + 125 // The extra 125 is necessary to avoid weird cases of overflow
                const remainder = this.width - drawer
                let scale = 100

                switch (this.currentBreakpoint) {
                    // xl and lg remain at 100% scale
                    case 'md':
                        scale *= 0.8;
                        break;
                    case 'sm':
                        scale *= 0.75;
                        break;
                    case 'xs':
                        scale *= 0.6;
                        break;
                }
                return remainder <= this.currentSession.cards.length * scale
            },
            pendingVotes() {
                if (!this.currentSession.participants) return []
                else {
                    const participants = Array.from(this.currentSession.participants).filter(participant => !participant.isObserver)

                    return this.castVotes.length === 0 ? participants : differenceBy(participants, this.castVotes, 'id');
                }
            },
            sortedItems() {
                const items = Array.from(this.currentSession.items)
                items.sort((a, b) => {
                    return a.dateCreated.toDate() - b.dateCreated.toDate()
                })

                return items
            },
            votingParticipants() {
                const participants = Array.from(this.currentSession.participants)

                // If you can join as an observer
                if (this.currentSession.options.allowJoinAsObserver) {
                    const votingParticipants = participants.filter(participant => !participant.isObserver)
                    return votingParticipants.length
                } else return participants.length
            }
        },
        mounted() {
            // Create and store a participant id if one doesn't already exist
            if (!this.getParticipantId()) {
                this.setParticipantId(this.generateId())
            }

            this.showJoinDialog()
        }
    }
</script>
<style scoped lang="scss">
    .planning-poker-btn {
        font-weight: 400;
        text-transform: none;
        letter-spacing: 0.025em;
    }

    .pending-vote {
        border: 5px dashed #BDBDBD;
    }

    .cast-vote-current-user {
        color: #4CAF50;
    }

    .cast-vote-hidden {
        border: 5px dashed #4CAF50;

        &.dark {
            border: 5px dashed white;
        }
    }

    .average-points {
        border: 5px dashed #3D5AFE;

        &.dark {
            border: 5px dashed white;
        }
    }

    .no-select {
        user-select: none;
    }
</style>
