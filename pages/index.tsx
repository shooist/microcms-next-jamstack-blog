import Link from "next/link";
import Date from "../components/date";
import Layout from "../components/layout";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    title: string;
    body: string;
    publishedAt: string;
  }[];
}) {
  return (
    <Layout>
      <div className="bg-white max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <main>
          <div className="divide-y divide-gray-200">
            <div className="pt-6 pb-8 space-y-2 md:space-y-5">
              <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Latest
              </h1>
              <p className="text-lg leading-7 text-gray-500">
                ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
              </p>
              <ul className="divide-y divide-gray-200">
                {allPostsData.map(({ id, title, body, publishedAt }) => (
                  <li className="py-12" key={id}>
                    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500">
                          <Date dateString={publishedAt} />
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link href={`/blog/${id}`}>
                              <a>{title}</a>
                            </Link>
                          </h2>
                          <div
                            className="max-w-none text-gray-500"
                            dangerouslySetInnerHTML={{ __html: body }}
                          />
                        </div>
                        <div className="text-base leading-6 font-medium">
                          <Link href={`/blog/${id}`}>
                            <a className="text-teal-500 hover:text-teal-600">
                              Read more →
                            </a>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch("https://blog-next-app.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      allPostsData: data.contents,
    },
  };
};
