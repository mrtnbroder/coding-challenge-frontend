
import * as types from '../constants/reasonTypes'
import { ReasonList } from '../structs/reasonStructs'
import { mkReasonList, mkReason, updateReasonCount, findReasonIndex, saveState } from '../utils/reasonUtils'
import { handleActions } from 'redux-actions'

export default handleActions({

  [types.ADD]: (state, { payload }) => {
    const newState = ReasonList.update(state, {
      reasons: {
        $push: [mkReason(payload)]
      }
    })

    saveState(newState)

    return newState
  },

  [types.REMOVE]: (state, { payload }) => {
    const idx = findReasonIndex(state.reasons, payload)
    const newState = ReasonList.update(state, {
      reasons: {
        $splice: [[idx, 1]]
      }
    })

    saveState(newState)

    return newState
  },

  [types.INCREMENT]: (state, { payload }) => {
    const idx = findReasonIndex(state.reasons, payload)
    const newState = ReasonList.update(state, {
      reasons: {
        [idx]: {
          $apply: updateReasonCount
        }
      }
    })

    saveState(newState)

    return newState
  },

  [types.FILTER]: (state, { payload }) => {
    const newState = ReasonList.update(state, {
      filter: {
        $set: payload
      }
    })

    saveState(newState)

    return newState
  }

}, mkReasonList())
