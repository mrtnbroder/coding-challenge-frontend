
import React, { Component, PropTypes as PT } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { default as radium, Style } from 'radium'

class IndexPage extends Component {

  static propTypes = {
    app: PT.string.isRequired,
    content: PT.string.isRequired
  }

  static getDoctype() {
    return '<!doctype html>'
  }

  static renderToStaticMarkup(props) {
    return IndexPage.getDoctype()
      + renderToStaticMarkup(<IndexPage {...props}/>)
  }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <html
        className='no-js'
        lang='en_US'
        >
        <head>
          <meta charSet='utf-8'/>
          <meta content='IE=edge,chrome=1' httpEquiv='X-UA-Compatible'/>

          <title>Isomorphic React Webpack Boilerplate</title>

          <meta content='' name='description'/>
          <meta content='' name='keywords'/>

          {/* Spiders must use meta description */}
          <meta content='noodp, noydir' name='robots'/>

          {/* No Google Translate toolbar */}
          <meta content='notranslate' name='google'/>

          {/* Viewport and mobile */}
          <meta content='width = device-width,
                         initial-scale = 1,
                         user-scalable = no,
                         maximum-scale = 1,
                         minimum-scale = 1'
            name='viewport'
            />
          <meta content='true' name='HandheldFriendly'/>
          <meta content='320' name='MobileOptimized'/>

          {/* Material Design Icons */}
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
          <Style rules={rules}/>

        </head>
        <body>
          <div id='app'>
            <div dangerouslySetInnerHTML={{ __html: this.props.content }}/>
          </div>

          <script src={this.props.app}></script>
        </body>
      </html>
    )
  }

}

export default radium(IndexPage)

const rules = {
  '*, *:before, *:after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    lineHeight: 1
  },
  'html, body, #app, #app': {
    height: '100%',
    width: '100%'
  },
  'body': {
    background: '#fff',
    color: '#555',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '16px'
  },
  'h1': {
    fontSize: '24px',
    paddingBottom: '12px'
  },
  'p': {
    lineHeight: 1.5,
    paddingBottom: '12px'
  },
  'img': {
    height: 'auto',
    display: 'inline-block',
    verticalAlign: 'middle',
    maxWidth: '100%'
  },
  'input, textarea': {
    'color': 'cadetblue',
    'textShadow': '0px 0px 0px #000',
    '-webkit-text-fill-color': 'transparent'
  },
  'input::-webkit-input-placeholder, textarea::-webkit-input-placeholder': {
    'textShadow': 'none',
    '-webkit-text-fill-color': 'initial'
  }
}
