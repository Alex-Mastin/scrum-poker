import AuthMixin from './AuthMixin.js'
import {db} from '@/firebase/db'
import firebase from 'firebase'


export default {
    mixins: [AuthMixin],
    data: () => ({
        currentSession: {},
        db: db,
        sessions: []
    }),
    firestore: {
        // Something would go here if I wasn't doing this.$bind below
    },
    methods: {
        async addToCollection(collection, data) {
            return await db.collection(collection).add(data)
        },
        currentTimestamp() {
            return firebase.firestore.Timestamp.now()
        },
        serverTimestamp() {
            return firebase.firestore.FieldValue.serverTimestamp()
        },
        async deleteFromCollection(collection, docId) {
            return await db.collection(collection).doc(docId).delete()
        },
        async getFromCollection(collection, docId) {
            return await db.collection(collection).doc(docId).get()
        },
        async updateFieldInDocument(collection, docId, data) {
            /* expected format for data: { fieldName: newValue } */
            return await db.collection(collection).doc(docId).update(data)
        }
    },
    computed: {
        isHost () {
            return this.getUser() ? this.currentSession.uid === this.getUser().uid : false;
        },
        isLoggedIn () {
            return this.getUser()
        }
    }
    ,
    created() {
        /* Can't access this.$route inside of the firestore section above */
        if (this.$route.name === 'Planning Session') {
            this.$bind('currentSession', db.collection('sessions').doc(this.$route.params.id))

            if (!this.isHost) {
                this.$bind('sessions', db.collection('sessions')
                    .where('uid', '==', this.$route.params.id)
                    .orderBy('dateCreated', 'desc'))
            }
        }

        if (this.isLoggedIn) {
            this.$bind('sessions', db.collection('sessions').where('uid', '==', this.getUser().uid)
                .orderBy('dateCreated', 'desc'))
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     if (to.name === 'Planning Session') {
    //         console.log("Going to planning session")
    //         this.getFromCollection('sessions', to.params.id)
    //             .then((docSnapshot) => {
    //                 if (docSnapshot.exists) {
    //                     console.log("document exists")
    //                     next()
    //                 }
    //                 else {
    //                     console.log("document doesn't exist")
    //                     this.$router.push(from.path)
    //                 }
    //             })
    //     }
    //     else {
    //         console.log("Not going to planning session")
    //     }
    // }

}
