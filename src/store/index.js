import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedNotes: [
      {
        id: 'afajfjadfaadfa323',
        text: 'sagar',
        timestamp:121212
      },
      {
        id: 'afajfjadfaadfa323',
        text: 'tamang',
        timestamp:121212
      }
    ],
    user: null,
    loading: false,
    error: {
      isError: false,
      code: null,
      message: null
    },
    userSaved: false,
  },
  mutations: {
    setloadedNotes (state, payload) {
      state.loadedNotes = payload
    },
    createNote (state, payload) {
      state.loadedNotes.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = { isError: true, code: payload.code, message: payload.message }
    },
    clearError (state) {
      state.error = { isError: false, code: null, message: null }
    },
    setUserSaved(state, payload){
      state.userSaved = payload;
    }
  },
  actions: {
    loadNotes ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('notes').child(getters.uid).once('value')
        .then((data) => {
          const notes = []
          const obj = data.val()
          for (let key in obj) {
            notes.push({
              id: key,
              text: obj[key].text,
              timestamp: obj[key].timestamp
            })
          }
          console.log({ notes: notes })
          commit('setloadedNotes', notes)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createNote ({commit, getters}, payload) {
      const note = {
        text: payload.text,
        timestamp: payload.timestamp
      }
      return new Promise((resolve, reject) => {
        firebase.database().ref('notes').child(getters.uid).push(note)
        .then((data) => {
          const key = data.key
          commit('createNote', {
            ...note,
            id: key
          })
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      });
      // Reach out to firebase and store it
    },
    signUserUp ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                detail: user,
                notes: []
              }
              commit('setUser', newUser)
              commit('setUserSaved', true)
              resolve()
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              reject(error)
              console.log(error)
            }
          )
      });
    },
    signUserIn ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                detail: user,
                registeredMeetups: []
              }
              commit('setUser', newUser)
              commit('setUserSaved', true)
              resolve()
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              commit('setUserSaved', false)
              reject(error)
              console.log(error)
            }
          )
      });      
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {detail: payload, notes: []})
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signOut()
          .then(() => {
            commit('setUserSaved', true)
            commit('setUser', null)
            resolve()
        })
          .catch((error) => {
            commit('setLoading', false)
            commit('setError', error)
            commit('setUserSaved', false)
            reject(error)
            console.log(error);
        });
      });
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedNotes (state) {
      return state.loadedNotes.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedNotes.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedNotes.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    userSaved (state){
      return state.userSaved
    },
    isUserLoggedIn(state){
      if (state.user == null)
        return false;
      else 
        return true;
    },
    uid(state){
      if (state.user == null)
        return false;
      else
        return state.user.detail.uid;
    }
  }
})
