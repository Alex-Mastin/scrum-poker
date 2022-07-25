/* eslint-disable */

import { register } from 'register-service-worker'
import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import {VAlert, VIcon} from "vuetify/lib";
import Vuetify from "../src/plugins/vuetify";

Vue.use(Vuetify)

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready (registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      console.log('Service worker has been registered.')
    },
    cached (registration) {
      console.log('Content has been cached for offline use.')
    },
    updatefound (registration) {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      // new Vue({
      //   el: '#serviceWorkerMount',
      //   components: {
      //     VAlert,
      //     VIcon
      //   },
      //   data: () => ({
      //     alert: true
      //   }),
      //   methods: {
      //     update () {
      //       registration.update()
      //           .then((result) => {
      //             console.log(result)
      //           })
      //           .catch((error) => {
      //             console.error(error)
      //           })
      //     }
      //   },
      //   render(h) {
      //     return (
      //         <v-alert dark icon="mdi-alert" color="warning" tile>
      //           A new version of the app is available.
      //           Click <a style={ 'text-decoration: underline; color: white;' } on-click={ this.update }>here</a> to update.
      //         </v-alert>
      //     )
      //   }
      // });
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
