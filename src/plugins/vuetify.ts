import Vue from 'vue';
// @ts-ignore
import Vuetify from 'vuetify/lib';
// @ts-ignore
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.indigo.accent3,
                secondary: colors.amber.accent3,
                accent: colors.lightBlue.accent3,
            }
        }
    },
    icons: {
        iconfont: 'mdi'
    }
});
