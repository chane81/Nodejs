import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
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
      <Container>
        <Head>
          <title>테스트</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

