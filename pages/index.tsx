import ABIInterface from "components/AbiInterface";
import ContractFunctions from "components/ContractFunctions";
import ContractInterface from "components/ContractInterface";
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
      <ABIInterface />
      <ContractInterface />
      <ContractFunctions />
    </>
  );
};

export default IndexPage;
