<template>
    <div class="shapes">
        <div v-for="(circle, i) in shapes.circle" :key="randInt(i, 100000)" :style="{ transform: `rotate(${randFloat(0, 180)}deg)`}">
            <floating-shape-circle :class="randomClass()" :zoom="randFloat(50, 125)" :color="randomColor()" :style="randomStyling()"/>
        </div>
        <div v-for="(square, j) in shapes.square" :key="randInt(j, 100000)" :style="{ transform: `rotate(${randFloat(0, 180)}deg)`}">
            <floating-shape-square :class="randomClass()" :zoom="randFloat(50, 125)" :color="randomColor()" :style="randomStyling()"/>
        </div>
        <div v-for="(line, k) in shapes.line" :key="randInt(k, 100000)" :style="{ transform: `rotate(${randFloat(-40, 40)}deg)`}">
            <floating-shape-line :class="randomClass()" :zoom="randFloat(50, 125)" :color="randomColor()" :style="randomStyling()"/>
        </div>
        <div v-for="(x, l) in shapes.x" :key="randInt(l, 100000)" :style="{ transform: `rotate(${randFloat(0, 180)}deg)`}">
            <floating-shape-x :class="randomClass()" :zoom="randFloat(50, 125)" :color="randomColor()" :style="randomStyling()"/>
        </div>
    </div>
</template>

<script>
    import colors from 'vuetify/lib/util/colors'
    import RandomMixin from "../mixins/RandomMixin";
    import FloatingShapeCircle from "./floating-shape-circle";
    import FloatingShapeSquare from "./floating-shape-square";
    import FloatingShapeLine from "./floating-shape-line";
    import FloatingShapeX from "./floating-shape-x";

    export default {
        name: "floating-shapes",
        mixins: [RandomMixin],
        components: {FloatingShapeX, FloatingShapeLine, FloatingShapeSquare, FloatingShapeCircle},
        props: {
            height: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                required: true
            }
        },
        data: () => ({
            shapes: {
                circle: 0,
                square: 0,
                line: 0,
                x: 0
            }
        }),
        methods: {
            randomColor () {
                return this.colors[this.randomMin(this.colors.length)]
            },
            randomStyling () {
                return {
                    top: `${this.height - this.randFloat(0, this.height / 4)}px`,
                    opacity: `${this.randFloat(5, 100)}%`
                }
            },
            randomClass() {
                const classes = []
                const max = 10
                for (let i = 0; i < max; i++) {
                    classes.push(`shape-${i + 1}`)
                }

                return classes[this.randInt(0, max - 1)]
            }
        },
        computed: {
            colors () {
                return this.$vuetify.theme.isDark ? ['white'] : [
                    colors.amber.accent3,
                    colors.cyan.accent3,
                    colors.deepOrange.accent3,
                    colors.green.accent3,
                    colors.lightBlue.accent3,
                    colors.lightGreen.accent3,
                    colors.pink.accent3,
                    colors.red.accent3,
                    colors.teal.accent3,
                ]
            }
        },
        mounted() {
            this.shapes = {
                circle: this.randInt(2, 6),
                square: this.randInt(2, 7),
                line: this.randInt(1, 3),
                x: this.randInt(2, 4)
            }
        }
    }
</script>

<style scoped lang="scss">
    @keyframes float {
        0%, 100% {
            transform: translateY(#{random(5)}px);
        }
        50% {
            transform: translateY(-#{random(10) + 10}px);
        }
    }

    @function randomNum($min, $max) {
        $rand: random();
        $randomNum: $min + floor($rand * (($max - $min) + 1));

        @return $randomNum;
    }

    @for $i from 1 through 10 {
        .shape-#{$i} {
            animation: float #{randomNum(3, 12)}s ease-in-out infinite;
            animation-delay: #{randomNum(0, 1.5)}s;
            position: absolute;
            z-index: 1;
        }
    }
</style>
