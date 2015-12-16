
import * as types from '../constants/reasonTypes'
import { createAction } from 'redux-actions'

/*
 * Action Creators
 */

export const add = createAction(types.ADD)
export const remove = createAction(types.REMOVE)
export const increment = createAction(types.INCREMENT)
export const filter = createAction(types.FILTER)
