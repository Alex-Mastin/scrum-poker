<template>
    <svg :width="size * 1.25" :height="size * 1.25" :style="style">
        <defs>
            <mask id="round-hole">
                <rect width="100%" height="100%" fill="white"/>
                <circle :r="size / 3.5" :cx="size / 2" :cy="size / 2"/>
            </mask>
        </defs>
        <circle :r="size / 2" :cx="size / 2" :cy="size / 2" mask="url(#round-hole)" :fill="color"/>
    </svg>
</template>

<script>
    import BrowserMixin from "../mixins/BrowserMixin";

    export default {
        name: "floating-shape-circle",
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
            size: 30
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
