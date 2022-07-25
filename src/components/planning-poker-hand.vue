<template>
    <div>
        <div class="planning-poker-hand" v-if="!overflowed || !smAndDown">
            <planning-poker-card v-for="(card, i) in cards"
                 :class="cardClass(i)"
                 :key="i"
                 :number="card.number"
                 :number-scale="numberScale"
                 :height="cardHeight"
                 :width="cardWidth"
                 @click="select(card)"
            />
        </div>
        <v-slide-group show-arrows center-active v-model="slideGroup" class="planning-poker-hand px-4" style="max-width: 100vw" v-else>
            <v-slide-item v-for="(card, i) in cards" :key="i" v-slot:default="{ active, toggle }">
                <v-card class="mx-1" flat outlined :width="cardWidth" :height="cardHeight" @click="[toggle(), select(card)]">
                    <v-col style="height: 100%">
                        <v-row style="height: 100%" align="center" justify="center">
                            <span :class="{ 'amber--text accent-3' : !$vuetify.theme.isDark}" :style="`transform: scale(${numberScale}); user-select: none;`">{{ card.number }}</span>
                        </v-row>
                    </v-col>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
    import PlanningPokerCard from "./planning-poker-card";
    import DatabaseMixin from "../mixins/DatabaseMixin";
    import AuthMixin from "../mixins/AuthMixin";
    import BreakpointMixin from "../mixins/BreakpointMixin";
    import ColorMixin from "../mixins/ColorMixin";

    export default {
        name: "planning-poker-hand",
        mixins: [AuthMixin, BreakpointMixin, ColorMixin, DatabaseMixin],
        components: {PlanningPokerCard},
        props: {
            cardHeight: {
                type: Number,
                required: true
            },
            cardWidth: {
                type: Number,
                required: true
            },
            numbers: {
                type: Array
            },
            numberScale: {
                type: Number,
                required: true
            },
            overflowed: {
                type: Boolean,
                required: true
            }
        },
        data: () => ({
            cards: [
                {number: 0},
                {number: 1},
                {number: 2},
                {number: 3},
                {number: 5},
                {number: 8},
                {number: 13},
                {number: 21},
                {number: 34},
                {number: 55},
                {number: 89},
            ],
            slideGroup: null
        }),
        methods: {
            cardClass(index) {
                return this.cards[index].selected ? `planning-poker-card-${index + 1} planning-poker-card-selected` : `planning-poker-card-${index + 1}`;
            },
            select(card) {
                // All items for this session
                const items = this.currentSession.items
                // Remove current item
                const filteredItems = items.filter(item => item.id !== this.currentItem.id)
                // Votes for the current item
                const votes = this.currentItem.votes
                // Last submitted vote, if any
                const oldVote = votes.find(vote => vote.id === this.getParticipantId())
                // Remove existing vote
                const filteredVotes = votes.filter(vote => vote.id !== this.getParticipantId())
                // Name of the current user
                const participant = this.currentSession.participants.find(participant => participant.id === this.getParticipantId())

                // If user has already voted
                if (oldVote) {
                    // If their last vote is not the same as the vote being submitted
                    if (oldVote.points !== card.number) {
                        // Add it to the list of filtered votes
                        filteredVotes.push({id: this.getParticipantId(), name: participant.name, points: card.number})
                    }
                    // Otherwise, it is removed by proxy of not being added back to filteredVotes
                }
                // User has not voted
                else {
                    // Add it to the list of filtered votes (for consistency, votes might work instead of filtered votes too)
                    filteredVotes.push({id: this.getParticipantId(), name: participant.name, points: card.number})
                }

                this.currentItem.votes = filteredVotes
                filteredItems.push(this.currentItem)

                this.updateFieldInDocument('sessions', this.$route.params.id, {items: filteredItems})
            }
        },
        computed: {
            currentItem() {
                if (!this.currentSession.items) return {}
                else return this.currentSession.items.find(item => item.id === this.currentSession.selectedItem)
            }
        },
        mounted() {
            if (this.numbers) {
                const cards = [];
                for (let i = 0; i < this.numbers.length; i++) {
                    cards.push({number: this.numbers[i]})
                }
                cards.sort((a, b) => {
                    if (a.number === '½') return 0.5 - b.number
                    if (a.number === '?') return 999 - b.number
                    if (b.number === '½') return a.number - 0.5
                    if (b.number === '?') return a.number - 999
                    return a.number - b.number
                })
                this.cards = cards
            }
        }
    }
</script>

<style scoped>
    .planning-poker-hand {
        position: relative;
        bottom: 64px;
        overflow: hidden;
        padding-top: 15px;
    }
</style>
