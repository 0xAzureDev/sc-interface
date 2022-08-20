import AbiDialog from "components/Abi";
import ContractDialog from "components/Contract";
import FunctionsDialog from "components/Functions";
import Header from "components/Header";

import { NextPage } from "next";
import Head from "next/head";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>SC Interface</title>
      </Head>
      <Header />
      <AbiDialog />
      <ContractDialog />
      <FunctionsDialog />
    </>
  );
};

export default IndexPage;
