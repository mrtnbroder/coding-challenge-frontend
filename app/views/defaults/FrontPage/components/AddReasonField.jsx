
import React, { PropTypes as PT, Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render'
import { equals, find, propEq } from 'ramda'

const isEnterKey = (key) => equals(13, key)
const findReason = (reasons, text) => find(propEq('name', text))(reasons)

class AddReasonField extends Component {

  static propTypes = {
    add: PT.func.isRequired,
    increment: PT.func.isRequired,
    reasons: PT.array.isRequired
  }

  state = {
    value: ''
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  handleChange = ({ target: { value } }) => {
    this.setState({ value })
  }

  handleOnKeyUp = ({ keyCode, target: { value } }) => {
    const { add, reasons, increment } = this.props

    if (isEnterKey(keyCode)) {
      const reason = findReason(reasons, value)

      this.setState({ value: '' })
      // reason already there, just increment it
      if (reason)
        increment(reason.id)
      // add new reason
      else
        add(value)
    }
  }

  render() {
    const { value } = this.state

    return (
      <div style={styles.base}>
        <div style={styles.inner}>
          <i className='material-icons' style={styles.add}>add</i>
          <input
            onChange={this.handleChange}
            onKeyUp={this.handleOnKeyUp}
            placeholder='Neuen Anlass hinzufügen'
            style={styles.input}
            type='text'
            value={value}
            />
        </div>
        {value && (
          <p style={styles.p}>
            Drücke <span style={styles.enter}>Enter</span> zum Hinzufügen
          </p>
        )}
      </div>
    )
  }
}

export default AddReasonField

const styles = {
  base: {
    overflow: 'hidden',
    lineHeight: '38px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    borderBottomStyle: 'solid',
    borderBottomColor: 'cadetblue',
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    lineHeight: '38px'
  },
  add: {
    color: 'cadetblue',
    lineHeight: '38px',
    fontSize: 20,
    paddingRight: 6
  },
  input: {
    border: 0,
    fontSize: 13,
    lineHeight: '38px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    outline: 'none',
    width: 180
  },
  p: {
    paddingBottom: 0,
    marginLeft: 8,
    fontSize: 13
  },
  enter: {
    color: 'cadetblue'
  }
}
