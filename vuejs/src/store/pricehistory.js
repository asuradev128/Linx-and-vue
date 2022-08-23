import { pricehistoryservice } from '../services';

const state = {
    all: {},
};

const actions = {
    getAll({ commit, dispatch}) {
        pricehistoryservice.getAll()
            .then(
                pricehistorys => {
                    dispatch('stock/getAll', [], { root: true });
                    commit('getAllSuccess', pricehistorys)
                },
                error => commit('getAllFailure', error)
            );
    },
    create({ commit }, pricehistory) {
        pricehistoryservice.create(pricehistory)
            .then(
                pricehistorys => commit('createSuccess', pricehistorys),
                error => commit('createFailure', error)
            );
    },
    delete({ commit }, id) {
        pricehistoryservice.delete(id)
            .then(
                () => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    createSuccess(state, pricehistory) {
        state.all = {new : pricehistory}
    },
    createFailure(state, error) {
        state.all = { error };
    },
    getAllSuccess(state, pricehistorys) {
        state.all = { items: pricehistorys };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteSuccess(state, id) {
        // remove deleted pricehistory from state
        state.all.items = state.all.items.filter(pricehistory => pricehistory.id !== id)
    },
    deleteFailure(state, { id, error }) {
        console.log(id, error, state);
    }
};

export const pricehistory = {
    namespaced: true,
    state,
    actions,
    mutations
};
