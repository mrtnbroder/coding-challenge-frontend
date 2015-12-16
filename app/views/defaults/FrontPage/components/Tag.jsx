
import React, { PropTypes as PT, Component } from 'react'
import { default as radium } from 'radium'
import shouldPureComponentUpdate from 'react-pure-render'

const isFiltered = (r, f) => ~r.name.toLowerCase().indexOf(f.toLowerCase())

class Tag extends Component {

  static propTypes = {
    idx: PT.number.isRequired,
    increment: PT.func.isRequired,
    reason: PT.shape({
      count: PT.number.isRequired,
      id: PT.string.isRequired,
      name: PT.string.isRequired
    }).isRequired,
    remove: PT.func.isRequired,
    visibilityFilter: PT.string.isRequired
  }

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  handleRemove = (id) => {
    const { remove } = this.props

    remove(id)
  }

  handleIncrement = (id) => {
    const { increment } = this.props

    increment(id)
  }

  render() {
    const { reason, visibilityFilter, idx } = this.props
    const liStyle = {
      ...styles.li,
      display: isFiltered(reason, visibilityFilter) ? 'block' : 'none'
    }

    return (
      <li onClick={this.handleIncrement.bind(null, reason.id)} style={liStyle}>
        <div key={idx} style={styles.tag}>
          <div style={styles.tagInner}>
            <span style={styles.count}>
              {reason.count}
            </span>
            <span style={styles.name}>
              {reason.name}
            </span>
            <span
              onClick={this.handleRemove.bind(null, reason.id)}
              style={styles.remove}
              >
              <i className='material-icons' style={styles.clear}>clear</i>
            </span>
          </div>
        </div>
      </li>
    )
  }
}

export default radium(Tag)

const styles = {
  li: {
    float: 'left'
  },
  tag: {
    backgroundColor: '#f3f3f3',
    display: 'inline-block',
    borderRadius: 3,
    height: 42,
    position: 'relative',
    margin: '0 10px 10px 0',
    padding: '0 10px 0 10px',
    verticalAlign: 'top',
    cursor: 'pointer',
    ':hover': {
      overflow: 'auto',
      height: 'auto'
    }
  },
  tagInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    maxWidth: 240,
    minWidth: 100
  },
  count: {
    display: 'inline-block',
    flex: '0 1 auto',
    paddingRight: 6,
    lineHeight: '42px',
    color: 'cadetblue',
    verticalAlign: 'top'
  },
  name: {
    display: 'inline-block',
    marginTop: 9,
    flex: '1 1 auto',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '24px',
    verticalAlign: 'top',
    paddingRight: 6,
    paddingBottom: 8,
    ':hover': {
      whiteSpace: 'normal',
      overflow: 'auto',
      textOverflow: 'inherit'
    }
  },
  remove: {
    display: 'inline-block',
    flex: '0 1 auto',
    lineHeight: '42px',
    color: '#555',
    verticalAlign: 'top'
  },
  clear: {
    display: 'inline-block',
    lineHeight: '42px',
    fontSize: 18,
    verticalAlign: 'top'
  }
}
