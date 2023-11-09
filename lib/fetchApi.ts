const API_URL = <string>process.env.WORDPRESS_API_ENDPOINT;

async function fetchAPI(
  query = "",
  { variables }: Record<string, any> = {}
) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    next: { revalidate: 1 }, // Revalidate every 60 seconds
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function querySite() {
  const data = await fetchAPI(`
  query SiteQuery {
    pages {
      nodes {
        title
        slug
        uri
        contentTypeName
      }
    }
    posts {
      nodes {
        title
        slug
        uri
        contentTypeName
      }
    }
  }
  `,
    {
      variables: {
        
      },
    }
  );
  return data?.pages.nodes.concat(data?.posts.nodes);
}

export async function getCategories(first = 10) {
  const data = await fetchAPI(`
  query SiteQuery {
    categories(first: 10) {
      nodes {
        slug
      }
    }
  }
  `,
    {
      variables: {
        first
      },
    }
  );
  return data?.categories.nodes;
}

export async function getPage(slug: string) {
  const data = await fetchAPI(
    `query PageQuery($id: ID = "") {
            page(id: $id, idType: URI) {
              authorId
              title
              id
              contentTypeName
              editorBlocks {
                ... on CoreParagraph {
                  name
                  attributes {
                    content
                  }
                }
              }
            }
          }`,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.page;
}

export async function getPost(slug: string) {
  const data = await fetchAPI(
    `query PostQuery($id: ID = "") {
            post(id: $id, idType: SLUG) {
              title
              contentTypeName
              editorBlocks {
                ... on CoreParagraph {
                  attributes {
                    content
                  }
                }
              }
            }
          }`,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.post;
}

export async function getPosts(first = 10) {
  const data = await fetchAPI(
    `query NewQuery {
        posts(first: 10) {
          nodes {
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            editorBlocks(flat: true) {
              ... on CoreParagraph {
                name
                clientId
                attributes {
                  content
                }
              }
              ... on CoreList {
                innerBlocks {
                  ... on CoreListItem {
                    name
                    attributes {
                      content
                    }
                  }
                }
              }
            }
            
          }
        }
      }`,
    {
      variables: {
        first,
      },
    }
  );

  return data?.posts?.nodes;
}