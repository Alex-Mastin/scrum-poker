<template>
    <div style="position: relative;">
        <svg id="scrum-logo" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="m240 20c-5.451 0-26.549 0-32 0-52.935 0-96 43.065-96 96s43.065 96 96 96h32v-64c-17.645 0-32-14.355-32-32 0-11.818 6.445-22.153 16-27.694 9.555 5.541 16 15.876 16 27.694h96c0-52.935-43.065-96-96-96z" :fill="fill2"/>
                <path d="m112 116c0 52.935 43.065 96 96 96v-64c-17.645 0-32-14.355-32-32s14.355-32 32-32v-64c-52.935 0-96 43.065-96 96z" :fill="fill1"/>
                <path d="m491.195 423.194-39.918-39.918c-2.098-2.098-4.944-3.276-7.911-3.276h-.178c-6.179 0-28.855 0-31.822 0h-.178c-6.179 0-11.188 5.009-11.188 11.188v89.625c0 6.179 5.009 11.188 11.188 11.188h32c3.072 0 6.009-1.264 8.122-3.493l40.194-42.428c2.887-3.047 4.496-7.085 4.496-11.283 0-4.353-1.729-8.526-4.805-11.603z" :fill="fill2"/>
                <path d="m459.195 423.194-39.918-39.918c-2.098-2.098-4.944-3.276-7.911-3.276h-.178c-6.179 0-11.188 5.009-11.188 11.188v12.812h-176v64h176v12.813c0 6.179 5.009 11.188 11.188 11.188 3.072 0 6.009-1.264 8.122-3.493l40.194-42.428c2.887-3.047 4.496-7.085 4.496-11.283 0-4.353-1.729-8.526-4.805-11.603z" :fill="fill1"/>
                <path d="m241.253 148.005c-.417-.003-.832.006-1.248.006v-.011h-32.005v.011c-88.224.002-160 71.765-160 159.989h-12.812c-6.179 0-11.188 5.009-11.188 11.188v.179c0 2.967 1.179 5.813 3.277 7.91l39.723 39.723c1.714 1.714 3.74 3.116 6.014 3.958 1.908.705 3.862 1.041 5.782 1.041v.001h32.005v-.001c4.198 0 8.236-1.608 11.283-4.495l42.427-40.194c2.374-2.248 3.652-5.432 3.478-8.717-.319-6.007-5.539-10.593-11.554-10.593h-12.43c0-47.458 34.615-86.981 79.923-94.652 44.093 7.418 78.228 45.151 79.998 90.858 2.117 54.655-41.732 99.794-95.926 99.794h-143.995-32.005c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h32.005 143.995 32.005c88.64 0 160.676-72.453 159.995-161.248-.667-87.027-71.72-158.08-158.747-158.747z" :fill="fill4"/>
                <path d="m209.248 148.005c-88.795-.681-161.248 71.355-161.248 159.995h-12.812c-6.179 0-11.188 5.009-11.188 11.188v.178c0 2.967 1.179 5.813 3.277 7.91l39.723 39.724c1.714 1.714 3.74 3.117 6.014 3.958 6.078 2.248 12.624.754 17.066-3.454l42.427-40.194c2.374-2.248 3.652-5.431 3.478-8.717-.32-6.007-5.54-10.593-11.555-10.593h-12.43c0-54.194 45.139-98.043 99.794-95.926 49.824 1.93 90.202 42.308 92.132 92.132 2.117 54.655-41.732 99.794-95.926 99.794h-176c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h176c88.64 0 160.676-72.453 159.995-161.248-.667-87.027-71.72-158.08-158.747-158.747z" :fill="fill3"/>
                <path d="m348.812 116h-121.624c-6.179 0-11.188 5.009-11.188 11.188v.179c0 2.967 1.179 5.813 3.277 7.91l39.918 39.918c3.077 3.077 7.25 4.806 11.601 4.806h32c4.198 0 8.236-1.609 11.283-4.496l42.427-40.194c2.23-2.112 3.493-5.05 3.493-8.122.001-6.18-5.008-11.189-11.187-11.189z" :fill="fill2"/>
                <path d="m316.812 116h-12.812c0-52.935-43.065-96-96-96v64c17.645 0 32 14.355 32 32h-12.812c-6.179 0-11.188 5.009-11.188 11.188v.179c0 2.967 1.179 5.813 3.277 7.91l39.918 39.918c3.077 3.077 7.25 4.806 11.601 4.806 4.198 0 8.236-1.609 11.283-4.496l42.427-40.194c2.23-2.112 3.493-5.05 3.493-8.122.001-6.18-5.008-11.189-11.187-11.189z" :fill="fill1"/>
                <g>
                    <circle cx="400" cy="244" :fill="fill1" r="96"/>
                    <path d="m461.714 244c0-2.072-.107-4.118-.311-6.135-.325-3.211 1.287-6.305 4.082-7.919l.007-.004c3.948-2.279 5.3-7.327 3.021-11.274l-12.318-21.336c-2.279-3.947-7.327-5.3-11.274-3.021l-.013.007c-2.794 1.613-6.279 1.462-8.897-.423-3.318-2.39-6.881-4.458-10.647-6.159-2.932-1.324-4.793-4.267-4.793-7.484 0-4.558-3.695-8.253-8.253-8.253h-24.636c-4.558 0-8.253 3.695-8.253 8.253 0 3.217-1.861 6.16-4.793 7.484-3.766 1.701-7.329 3.769-10.647 6.159-2.618 1.885-6.103 2.036-8.897.423l-.013-.007c-3.947-2.279-8.995-.927-11.274 3.021l-12.318 21.336c-2.279 3.947-.927 8.995 3.021 11.274l.007.004c2.795 1.614 4.406 4.708 4.082 7.919-.204 2.018-.311 4.064-.311 6.135s.107 4.118.311 6.135c.325 3.211-1.287 6.305-4.082 7.919l-.007.004c-3.948 2.279-5.3 7.327-3.021 11.274l12.318 21.336c2.279 3.947 7.327 5.3 11.274 3.021l.013-.007c2.794-1.613 6.279-1.462 8.897.423 3.318 2.39 6.881 4.458 10.647 6.158 2.932 1.324 4.793 4.267 4.793 7.484 0 4.558 3.695 8.253 8.253 8.253h24.636c4.558 0 8.253-3.695 8.253-8.253 0-3.217 1.861-6.16 4.793-7.484 3.766-1.701 7.33-3.769 10.647-6.158 2.618-1.885 6.103-2.036 8.897-.423l.013.007c3.947 2.279 8.995.927 11.274-3.021l12.318-21.336c2.279-3.947.927-8.995-3.021-11.274l-.007-.004c-2.795-1.614-4.406-4.708-4.082-7.919.204-2.017.311-4.063.311-6.135z" :fill="fill5"/>
                    <circle cx="400" cy="244" :fill="fill1" r="24"/>
                </g>
            </g>
        </svg>
        <morph :gradient="gradient" class="morph d-flex" gradient-id="primary" :style="morph"/>
    </div>
</template>

<script>
    import colors from 'vuetify/lib/util/colors'
    import Morph from "./morph";

    export default {
        name: "scrum-logo",
        components: {Morph},
        data: () => ({
            morph: {
                top: '-5vh',
                left: 0,
                right: 0,
                bottom: 0
            }
        }),
        methods: {
            getMorphStyle () {
                const svg = document.getElementById("scrum-logo")
                if (!svg) return
                const svgPosition = svg.getBoundingClientRect()

                this.morph.right = window.innerWidth - svgPosition.right - 200
            }
        },
        computed: {
            fill1 () {
                return this.$vuetify.theme.isDark ? colors.grey.base : colors.lightBlue.accent1
            },
            fill2 () {
                return this.$vuetify.theme.isDark ? colors.grey.darken2 : colors.lightBlue.accent3
            },
            fill3 () {
                return this.$vuetify.theme.isDark ? colors.grey.lighten4 : colors.amber.accent1
            },
            fill4 () {
                return this.$vuetify.theme.isDark ? colors.grey.lighten1 : colors.amber.accent3
            },
            fill5 () {
                return this.$vuetify.theme.isDark ? 'white' : colors.grey.lighten3
            },
            gradient () {
                return this.$vuetify.theme.isDark ?
                    { start: colors.grey.darken3, stop: colors.blueGrey.lighten5 } :
                    { start: colors.deepPurple.accent4, stop: colors.lightBlue.accent1 }
            }
        },
        created() {
            window.addEventListener('resize', () => {
                this.getMorphStyle()
            })
        },
        mounted() {
            this.getMorphStyle()
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
    #scrum-logo {
        animation: float #{random(10) + 10}s ease-in-out infinite;
    }
    .morph {
        position: absolute;
        z-index: 2;
    }
    svg {
        position: relative;
        z-index: 3;
    }
</style>
