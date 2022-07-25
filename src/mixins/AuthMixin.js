import firebase from 'firebase'
import * as firebaseui from 'firebaseui' // 'import as' is necessary for this to work correctly
import { auth } from '@/firebase/auth'

export default {
    methods: {
        authUIConfig () {
            const self = this;
            return {
                callbacks: {
                    signInSuccessWithAuthResult: function (authResult) {
                        self.setUser(authResult.user)
                        return true;
                    },
                },
                signInFlow: 'popup',
                signInSuccessUrl: `${window.location.href}dashboard`,
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ]
            }
        },
        getInstance () {
            return firebaseui.auth.AuthUI.getInstance()
        },
        getName () {
            return this.getUser().displayName
        },
        getParticipantId () {
            return this.$store.getters.getParticipantId
        },
        getUser () {
            return this.$store.getters.getUser
        },
        initAuth () {
            try {
                this.startInstance(new firebaseui.auth.AuthUI(auth))
            } catch (error) {
                this.startInstance(this.getInstance())
            }
        },
        setParticipantId (id) {
            this.$store.commit('setParticipantId', id)
        },
        setUser (user) {
            this.$store.commit('setUser', user)
        },
        signInWithGoogle () {
            const button = document.querySelector('button.firebaseui-idp-button')

            if (button) {
                button.dispatchEvent(new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                }))
            }
        },
        signOut () {
            this.setUser(null)
            return firebase.auth().signOut()
        },
        startInstance (instance) {
            if (!instance) return
            instance.start('#firebaseui-auth-container', this.authUIConfig())
        }
    }
}
