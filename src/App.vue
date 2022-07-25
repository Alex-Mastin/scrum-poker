<template>
  <v-app :class="{ 'overflow-hidden' : $route.name !== 'dashboard' }">
    <navigation></navigation>
  </v-app>
</template>

<script>


import Navigation from "@/components/navigation.vue";
export default {
  components: {Navigation},
  data: () => ({
    //
  }),
  watch: {
    '$route' (to) {
      document.title = `${to.meta.title} | Scrum Planning Poker`
    }
  }
}
</script>

<style>
  @font-face {
    font-family: "CircularStd";
    src: url("../public/fonts/CircularStd-Black.eot");
    src: url("../public/fonts/CircularStd-Black.eot?#iefix") format("embedded-opentype"), url("../public/fonts/CircularStd-Black.woff") format("woff"), url("../public/fonts/CircularStd-Black.ttf") format("truetype"), url("../public/fonts/CircularStd-Black.svg#bcc26993292869431e54c666aafa8fcd") format("svg");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "CircularStd";
    src: url("../public/fonts/CircularStd-Bold.eot");
    src: url("../public/fonts/CircularStd-Bold.eot?#iefix") format("embedded-opentype"), url("../public/fonts/CircularStd-Bold.woff") format("woff"), url("../public/fonts/CircularStd-Bold.ttf") format("truetype"), url("../public/fonts/CircularStd-Bold.svg#bcc26993292869431e54c666aafa8fcd") format("svg");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "CircularStd";
    src: url("../public/fonts/CircularStd-Medium.eot");
    src: url("../public/fonts/CircularStd-Medium.eot?#iefix") format("embedded-opentype"), url("../public/fonts/CircularStd-Medium.woff") format("woff"), url("../public/fonts/CircularStd-Medium.ttf") format("truetype"), url("../public/fonts/CircularStd-Medium.svg#bcc26993292869431e54c666aafa8fcd") format("svg");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "CircularStd";
    src: url("../public/fonts/CircularStd-Book.eot");
    src: url("../public/fonts/CircularStd-Book.eot?#iefix") format("embedded-opentype"), url("../public/fonts/CircularStd-Book.woff") format("woff"), url("../public/fonts/CircularStd-Book.ttf") format("truetype"), url("../public/fonts/CircularStd-Book.svg#bcc26993292869431e54c666aafa8fcd") format("svg");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }


  *,
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

  .overflow-hidden {
    overflow: hidden;
  }

  .h100 {
    height: 100%;
  }
</style>
