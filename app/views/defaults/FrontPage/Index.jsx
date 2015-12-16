
import React, { Component, PropTypes as PT } from 'react'
import { bindActionCreators } from 'redux'
import shouldPureComponentUpdate from 'react-pure-render'
import { connect } from 'react-redux'
import * as reasonActions from '../../../lib/actions/reasonActions'
import AddReasonField from './components/AddReasonField'
import SearchReasonField from './components/SearchReasonField'
import Tag from './components/Tag'

class FrontPage extends Component {

  static propTypes = {
    add: PT.func.isRequired,
    filter: PT.func.isRequired,
    increment: PT.func.isRequired,
    reasonList: PT.object.isRequired,
    remove: PT.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  renderReasons() {
    const { increment, remove, reasonList: { reasons, filter: visibilityFilter } } = this.props

    if (reasons.length)
      return reasons.map((reason, idx) => (
        <Tag
          idx={idx}
          increment={increment}
          key={reason.id}
          reason={reason}
          remove={remove}
          visibilityFilter={visibilityFilter}
          />
      ))

    return (<p style={styles.empty}>0 Anlässe</p>)
  }

  render() {
    const { add, filter, increment, reasonList } = this.props

    return (
      <div style={styles.base}>
        <h1>Anlässe</h1>
        <p>
          Anlässe helfen dir deine Fahrten zu Kategorisieren. Verwende kurze<br/>
          und prägnante Bezeichnungen für deine Anlässe.
        </p>
        <div style={styles.fields}>
          <AddReasonField
            add={add}
            increment={increment}
            reasons={reasonList.reasons}
            />
          <SearchReasonField
            filter={filter}
            value={reasonList.filter}
            />
        </div>
        <ul style={styles.ul}>
        {this.renderReasons()}
        </ul>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    reasonList: state.reasons
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(reasonActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)

const styles = {
  base: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    margin: '0 auto',
    maxWidth: 860
  },
  fields: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  ul: {
    width: '100%',
    liStyle: 'none',
    overflow: 'hidden'
  },
  empty: {
    color: '#ccc'
  }
}
