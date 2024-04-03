import { ServerStyleSheets } from "@mui/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <meta name="google" content="notranslate" />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="wedding" />

          <link rel="apple-touch-icon" sizes="48x48" href="/logo/logo48.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/logo/logo72.png" />
          <link rel="apple-touch-icon" sizes="96x96" href="/logo/logo96.png" />
          <link rel="apple-touch-icon" sizes="128x128" href="/logo/logo128.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/logo/logo152.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="/logo/logo192.png" />
          <link rel="apple-touch-icon" sizes="384x384" href="/logo/logo384.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="/logo/logo512.png" />
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const materialSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => materialSheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>,
  };
};
