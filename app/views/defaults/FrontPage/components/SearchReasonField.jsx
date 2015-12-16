
import React, { PropTypes as PT, Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render'

class SearchReasonField extends Component {

  static propTypes = {
    filter: PT.func.isRequired,
    value: PT.string.isRequired
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  handleChange = ({ target: { value } }) => {
    const { filter } = this.props

    filter(value)
  }

  render() {
    const { value } = this.props

    return (
      <div style={styles.base}>
        <i style={styles.search} className='material-icons'>search</i>
        <input
          onChange={this.handleChange}
          placeholder='Durchsuche deine Anlässe'
          style={styles.input}
          type='text'
          value={value}
          />
      </div>
    )
  }
}

export default SearchReasonField

const styles = {
  base: {
    borderBottomStyle: 'solid',
    borderBottomColor: 'cadetblue',
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    lineHeight: '38px'
  },
  search: {
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
  }
}
