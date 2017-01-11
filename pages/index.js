import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import shuffle from 'lodash.shuffle'

function parseQuote (quote) {
  let pieces = quote.split('\n')
  let author = pieces[pieces.length - 1]
  quote = quote.replace(author, '').trim()
  let contents = quote.substr(1, quote.length - 2)
  return { author, contents }
}

export default class MyPage extends React.Component {
  static async getInitialProps () {
    let quotes = await fetch('https://raw.githubusercontent.com/dirceu/codex-vitae/master/CommonplaceBook.md')
    quotes = await quotes.text()
    quotes = quotes.split('\n\n')
    quotes = shuffle(quotes)
    quotes = quotes.map(parseQuote)
    return { quotes }
  }

  render () {
    return (
      <div style={{ textAlign: 'left', padding: '5%' }}>
        <Head>
          <title>Random quote from my Commonplace Book</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta charset='utf-8' />
          <style jsx>{`
            * {
              font-family: sans-serif;
              background-color: #373434;
              color: #FFFFFF;
            }
            .quote {
              margin-bottom: 45px;
            }
            blockquote {
              font-size: 2.6vw;
              padding: 0;
            }
            cite {
              font-size: 2.2vw;
              padding: 0;
              padding-left: 6%;
            }
            small {
              display: none;
            }
          `}</style>
        </Head>
        {this.props.quotes.map((quote) => (
        <div className='quote'>
          <blockquote>{quote.contents}<br/>{quote.author}</blockquote>
        </div>
        ))}
        <small>by <a href='https://twitter.com/dirceu' rel='me'>@dirceu</a></small>
      </div>
    )
  }
}
