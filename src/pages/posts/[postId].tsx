import { Layout, Date } from "@/components";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../../utils/posts";
import utilStyles from "../../styles/utils.module.scss";
import { InferGetStaticPropsType } from 'next'

interface PostDataProp {
  postData: {
    id: string;
    title: string;
    date: Date;
    contentHtml: string;
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.postId as string);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData } : InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date.toString()} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
