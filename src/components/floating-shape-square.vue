<template>
    <svg :width="size / 2" :height="size / 2" :style="style">
        <defs>
            <mask id="square-hole">
                <rect width="100%" height="100%" fill="white"/>
                <rect :rx="size / 20" :width="size / 4" :height="size / 4" :x="size / 8" :y="size / 8"/>
            </mask>
        </defs>
        <rect ref="square" :rx="size / 10" :width="size / 2" :height="size / 2" mask="url(#square-hole)" :fill="color"/>
    </svg>
</template>

<script>
    import BrowserMixin from "../mixins/BrowserMixin";

    export default {
        name: "floating-shape-square",
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
            size: 65
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
