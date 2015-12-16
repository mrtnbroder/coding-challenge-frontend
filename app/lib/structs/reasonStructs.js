
import { struct, Num, Str, list } from 'tcomb'

/*
 * Structs
 */

export const Reason = struct({
  id: Str,
  name: Str,
  count: Num,
  addedAt: Num,
  updatedAt: Num
}, 'Reason')

export const ReasonList = struct({
  aggregateId: Str,
  filter: Str,
  reasons: list(Reason)
}, 'ReasonList')
