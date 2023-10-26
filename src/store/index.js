import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [], // almacenar los personajes
    charactersFilter: [] // almacenar las consultas y filtros del proyecto para evitar peticiones
  },
  
  mutations: {
    setCharacters(state, payload){
      state.characters = payload
    },
    setCharactersFilter(state, payload){
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({commit}){
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        // obtener todos los personajes al cargar la pagina
        commit('setCharacters',data.results)
        commit('setCharactersFilter',data.results)
      } catch (error) {
        console.error
      }
    },
    filterByStatus({commit,state},status){
      const results = state.characters.filter((character) =>{
        return character.status.includes(status) // retornar los personajes con x status
      })
      commit('setCharactersFilter', results)
    },
    filterByName({ commit, state }, name) {
      const formatName = name.toLowerCase();
      const results = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase();
    
        if (characterName.includes(formatName)) {
          return character;
        }
      });
      commit('setCharactersFilter', results)
    }    
  },
  modules: {
  }
})
