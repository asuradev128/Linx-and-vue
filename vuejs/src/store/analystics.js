import { analysticService } from '../services';

const state = {
    all: {},
    total: 0,
    sell: 0,
    pl:0
};

const actions = {
    getAll({ commit }) {
        analysticService.getAll()
            .then(
                analystics => commit('getAllSuccess', analystics),
                error => commit('getAllFailure', error)
            );
    },
    create({ commit }, analystic) {
        analysticService.create(analystic)
            .then(
                analystics => commit('createSuccess', analystics),
                error => commit('createFailure', error)
            );
    },
    update({commit}, data) {
            analysticService.update(data.id, data.analystic)
                .then(
                    ()=>commit('updateSuccess', data),
                    error => commit('updateFailure', error)
                )   
    },
    delete({ commit }, id) {
        analysticService.delete(id)
            .then(
                () => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    createSuccess(state, analystic) {
        state.all=state.all.items?state.all:{itmes:[]}
        state.all.items.push(analystic);
    },
    createFailure(state, error) {
        state.all = { error };
    },
    getAllSuccess(state, analystics) {
        state.all = { items: analystics };
        var t=0, s=0, pl=0;
        analystics.map(item=>{
            t+=item.buy*item.price;
            s+=item.sell*item.price;
            pl+=item.sell*item.netvar;
        });
        state.total = t.toPrecision(4);
        state.sell = s.toPrecision(4);
        state.pl = pl.toPrecision(4);
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    updateSuccess(state, data) {
        state.all.items = state.all.items.filter(analystic => analystic.id !== data.id)
        state.all.items.push(data.analystic);
    },
    updateFailure(state, { id, error }) {
        console.log(id, error, state)
    },
    deleteSuccess(state, id) {
        // remove deleted analystic from state
        state.all.items = state.all.items.filter(analystic => analystic.id !== id)
    },
    deleteFailure(state, { id, error }) {
        console.log(id, error, state)
    }
};

export const analystics = {
    namespaced: true,
    state,
    actions,
    mutations
};
