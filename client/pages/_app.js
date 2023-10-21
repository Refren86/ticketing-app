import "bootstrap/dist/css/bootstrap.css";

import Head from "next/head";

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>My page title</title>  
      </Head>
      <Component {...pageProps} />
    </>
  );
};
