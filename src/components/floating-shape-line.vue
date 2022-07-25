<template>
    <svg :width="size" :height="size" :style="style">
        <rect ref="line" :rx="size / 12" :width="size / 1.25" :height="size / 6" :fill="color"/>
    </svg>
</template>

<script>
    import BrowserMixin from "../mixins/BrowserMixin";

    export default {
        name: "floating-shape-line",
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
