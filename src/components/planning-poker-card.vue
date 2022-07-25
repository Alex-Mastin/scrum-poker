<template>
    <v-card flat outlined :width="width" :height="height" :style="cardStyle" @mouseenter="onMouseEnter()"
            @mouseleave="onMouseLeave()" @click.native="$emit('click', $event)">
        <v-col style="height: 100%">
            <v-row style="height: 100%" align="center" justify="center">
                <span :class="{ 'amber--text accent-3' : !$vuetify.theme.isDark }" :style="`transform: scale(${numberScale}); user-select: none;`">{{ number }}</span>
            </v-row>
        </v-col>
    </v-card>
</template>

<script>
    export default {
        name: "planning-poker-card",
        props: {
            height: {
                type: Number,
                required: true
            },
            number: {
                type: [String, Number],
                required: true
            },
            numberScale: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                required: true
            }
        },
        data: () => ({
            cardStyle: {}
        }),
        methods: {
            generateCardStyle() {
                const cards = document.querySelectorAll("[class*=planning-poker-card]")
                const halfDeck = Math.floor(cards.length / 2)

                for (let i = 0; i < cards.length; i++) {
                    if (i < halfDeck) {
                        cards[i].style.transform = `rotate(${-(halfDeck - i)}deg)`
                        cards[i].style.position = 'relative';
                        cards[i].style.right = `${(-(halfDeck - i) * 3) * 5}px`
                        cards[i].style.bottom = `${(-(halfDeck - i) * 3) * 2}px`
                    } else if (i === halfDeck) {
                        cards[i].style.position = 'relative'
                        cards[i].style.bottom = `${-(cards.length) / 2}px`
                    } else if (i > halfDeck) {
                        cards[i].style.transform = `rotate(${(i - (halfDeck))}deg)`
                        cards[i].style.position = 'relative';
                        cards[i].style.left = `${((halfDeck - i) * 3) * 5}px`
                        cards[i].style.bottom = `${((halfDeck - i) * 3) * 2}px`
                    }
                }
            },
            onMouseEnter() {
                this.$el.style.transform = `${this.$el.style.transform} translateY(-1.25vh)`
            },
            onMouseLeave() {
                this.$el.style.transform = this.$el.style.transform.replace('translateY(-1.25vh)', '')
            }
        },
        mounted() {
            this.generateCardStyle()
        }
    }
</script>

<style lang="scss">
    [class*="planning-poker-card"] {
        display: inline-block;
        transition: transform 0.05s;
        transition-timing-function: ease-in-out;
    }

    .planning-poker-card-selected {
        border: 3px solid red;
    }
</style>
