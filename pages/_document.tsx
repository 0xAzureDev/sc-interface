import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  override render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
