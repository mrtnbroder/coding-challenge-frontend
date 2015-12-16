
import uuid from 'uuid'
import { Reason, ReasonList } from '../structs/reasonStructs'
import { add, evolve, propEq, findIndex } from 'ramda'

/**
 *  State
 */

const initalState = {
  aggregateId: uuid.v4(),
  filter: '',
  reasons: []
}

/**
 *  Private API
 */

const incrementCount = { count: add(1), updatedAt: Date.now }

/**
 *  Public API
 */

export const mkReason = (text) => new Reason({
  id: uuid.v4(),
  name: text,
  count: 1,
  addedAt: Date.now(),
  updatedAt: Date.now()
})

export const mkReasonList = () => new ReasonList(
  __BROWSER__
    ? JSON.parse(localStorage.getItem('state') || JSON.stringify(initalState))
    : initalState
)
export const updateReasonCount = (reason) => evolve(incrementCount, reason)
export const findReasonIndex = (reasons, id) => findIndex(propEq('id', id))(reasons)
export const saveState = (state) => {
  localStorage.setItem('state', JSON.stringify(state))
}
