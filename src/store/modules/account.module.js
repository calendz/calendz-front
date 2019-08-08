// ==================================
// == State
// ==================================
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  status: {}
}

// ==================================
// == Mutations
// ==================================
const mutations = {
}

// ==================================
// == Actions
// ==================================
const actions = {
}

export const account = {
  namespaced: true,
  state,
  mutations,
  actions
}
