<template>
    <svg :width="size" :height="size" :style="style">
        <rect ref="line" :rx="size / 8" :width="size * 1.25" :height="size / 4" :x="size / 12" :y="-(size / 8)" :fill="color" transform="rotate(45)"/>
        <rect ref="line" :rx="size / 8" :width="size * 1.25" :height="size / 4" :x="-(size * 0.62)" :y="size / 1.7" :fill="color" transform="rotate(-45)"/>
    </svg>
</template>

<script>
    import BrowserMixin from "../mixins/BrowserMixin";

    export default {
        name: "floating-shape-x",
        mixins: [BrowserMixin],
        props: {
            color: {
                type: String,
                required: true
            },
            zoom: {
                type: Number,
                required: true
            }
        },
        data: () => ({
            size: 25
        }),
        computed: {
            style () {
                if (this.browser !== 'Firefox') return {zoom: `${this.zoom}%`}
                else return { transform: `scale(${this.zoom / 100})` }
            }
        }
    }
</script>

<style scoped>

</style>
