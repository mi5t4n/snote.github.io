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
    createMeetup (state, payload) {
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
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setloadedNotes', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
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
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
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
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
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
    }
  }
})
