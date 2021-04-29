import Layout from "../../components/layout";
import Date from "../../components/date";

export default function BlogId({ blog }) {
  return (
    <Layout>
      <div className="bg-white max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <main>
          <article className="xl:divide-y xl:divide-gray-200">
            <header className="pt-6 xl:pb-10">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Publish on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500">
                      <Date dateString={blog.publishedAt} />
                    </dd>
                  </div>
                </dl>
                <div>
                  <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                    {blog.title}
                  </h1>
                </div>
              </div>
            </header>
            <div className="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-4 xl:col-gap-6 pb-16 xl:pb-20">
              <div className="divide-y divide-gray-200 xl:pb-0 xl:col-span-3 xl:row-span-2">
                <div
                  className="prose max-w-none pt-10 pb-8"
                  dangerouslySetInnerHTML={{ __html: blog.body }}
                />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch("https://blog-next-app.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch(
    "https://blog-next-app.microcms.io/api/v1/blog/" + id,
    key
  )
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
  };
};
