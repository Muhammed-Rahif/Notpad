import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

export default function AppHead() {
  return (
    <>
      <Head>
        <title>
          Notepad — Windows notepad in web with additional features!
        </title>
        <meta
          name="description"
          content="Windows notepad in web with additional features. Create, Edit and Save text files in web. Built with React and typescript. Maintained by open source community. Creator - Muhammed Rahif"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />

        <meta
          name="title"
          content="Notepad — Windows notepad in web with additional features!"
        />
        <meta
          name="description"
          content="Windows notepad in web with additional features. Create, Edit and Save text files in web. Built with React and typescript. Maintained by open source community. Creator - Muhammed Rahif"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notepad.rahif.me" />
        <meta
          property="og:title"
          content="Notepad — Windows notepad in web with additional features!"
        />
        <meta
          property="og:description"
          content="Windows notepad in web with additional features. Create, Edit and Save text files in web. Built with React and typescript. Maintained by open source community. Creator - Muhammed Rahif"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Muhammed-Rahif/Notepad/master/public/assets/images/notepad-shot.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://notepad.rahif.me" />
        <meta
          property="twitter:title"
          content="Notepad — Windows notepad in web with additional features!"
        />
        <meta
          property="twitter:description"
          content="Windows notepad in web with additional features. Create, Edit and Save text files in web. Built with React and typescript. Maintained by open source community. Creator - Muhammed Rahif"
        />
        <meta
          property="twitter:image"
          content="https://raw.githubusercontent.com/Muhammed-Rahif/Notepad/master/public/assets/images/notepad-shot.png"
        />
      </Head>
    </>
  );
}
