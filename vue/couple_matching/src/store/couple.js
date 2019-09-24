import Vue from 'vue'
import Vuex from 'vuex'
import { CoupleService, CoupleApiError } from '../services/couple.service'
import CONST from "./../constants";


Vue.use(Vuex)

const state = {
    // list structure - 
    // [ {'matched': ..., 'left': ...,'right': ...,'matchedStr': ...,'matchedCnt': ... } ]
    realList: [],
    displayList: [],
    selected: 'ALL',
    isLoading: false,
    errMsg: ''
}

const mutations = {
    setRealList: (state, couples) => {
        state.realList = couples;
    },
    setDisPlayList: (state, displayList) => {
        state.displayList = displayList
    },
    setSelected: (state, selected) => {
        state.selected = !!selected ? 'ALL' : selected;
        state.displayList = selected === 'ALL' ?
                            state.realList :
                            state.realList.filter((couple) => couple.matchedStr.includes(selected))
    },
    loading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setErrMsg(state, obj) {
        state.errMsg = obj.code + " | " + obj.message
    },
    clearErrMsg(state) {
        state.errMsg = ''
    }
}

const actions = {
    initCouples: async ({ commit, state }, size) => {
        try {
            commit('loading', true);
            const couples = await CoupleService.callApiOfPerHobbies(size);
            commit('setRealList', couples);
            commit('setDisPlayList', couples);
            commit('clearErrMsg');
            commit('loading', false);

        } catch (e) {
            if (e instanceof CoupleApiError) {
                commit('setErrMsg', {code: e.errorCode, message: 'couple API error : ' + e.message})
            } else {
                commit('setErrMsg', {code: CONST.UNKNOWN_ERR_CODE, message: 'unknown error'})
            }
            commit('setDisPlayList', []);
            commit('loading', false);
        }
    }
}

const getters = {
    couples: (state, getters) => {
        return state.displayList;
    },
    len: (state) => {
        return state.displayList.length;
    },
    isLoading: (state) => {
        return state.isLoading;
    },
    errMsg: (state) => {
        return state.errMsg
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}