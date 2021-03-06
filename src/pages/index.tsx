import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from 'styles/Home.module.scss';
import OpenGraph from '@components/common/OpenGraph/OpenGraph';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OpenGraph
        title="Next.js + Playwrightで動的OpenGraph生成APIを作ってみた"
        body="SSGで公開しているブログサイトのデザインに飽きてきてしまったのでどうせならSSRに対応させようと思い立ちまずはOGP画像の生成APIを用意しました。モノリシックにAPIとブログを同じレポジトリに含ませてもよいですが、今回はまた別でAPIを使う可能性を加味して分けました。"
        color="#000000"
        tags={['Rust', 'WASM', 'Yew']}
      />
    </div>
  );
};

export default Home;
