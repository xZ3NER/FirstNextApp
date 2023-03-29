import utilStyles from "../../styles/utils.module.scss";
import { Layout, siteTitle, Date } from "@/components";
import Head from "next/head";
import { getSortedPostsData } from "../../../utils/posts";
import Link from "next/link";

interface Posts {
  id: string;
  date: Date;
  title: string;
}

interface Props {
  allPostsData: Posts[];
}

export async function getStaticProps() {
  const allPostsData: Posts[] = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Posts({ allPostsData }: Props) {
  return (
    <Layout home={false}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, eius,
          et omnis quam tempora dolor assumenda excepturi earum magni provident
          voluptatem iusto ipsa asperiores laborum temporibus numquam
          exercitationem odit odio?
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date.toString()} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
