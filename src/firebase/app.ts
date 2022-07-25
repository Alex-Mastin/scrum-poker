import firebase from 'firebase/app'
import credentials from './credentials'

export const app = firebase.initializeApp(credentials)
