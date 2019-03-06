import App, {Container} from 'next/app';
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import { initializeStore } from '../stores/store';

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}
    const isServer = typeof window === 'undefined'
    const store = initializeStore(isServer)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps
    }
  }

  constructor (props) {
    super(props)
    this.store = initializeStore(props.isServer, props.initialState)
  }

  // IE10 대응
  static childContextTypes = {
    router: PropTypes.object,
  };

  // IE10 대응
  getChildContext() {
    const { router } = this.props;
    return { router };
  }

  render () {
    const {Component, pageProps} = this.props

    return (
      <Provider store={this.store}>
        <Container>
            <Head>
              <title></title>
            </Head>
            <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

