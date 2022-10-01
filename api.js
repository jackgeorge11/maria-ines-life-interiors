class API {
  constructor(accessToken, spaceID) {
    this.accessToken = accessToken;
    this.spaceID = spaceID;
    this.environment_id = "master";
    // this.baseURI = "https://graphql.contentful.com/content/v1";
  }

  async getSignature(el) {
    console.log("signature");
  }

  async getAbout(el) {
    console.log("signature");
  }

  async getServices(el) {
    const query = `
      {
        servicesCollection {
          items {
            sys {
              firstPublishedAt
            }
            title
            description
          }
        }
      }
    `;

    const fetchOptions = {
      spaceID: this.spaceID,
      accessToken: this.accessToken,
      endpoint: `https://graphql.contentful.com/content/v1/spaces/${this.spaceID}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    fetch(fetchOptions.endpoint, fetchOptions)
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data?.servicesCollection?.items);
        if (data?.servicesCollection?.items) {
          data.servicesCollection.items.forEach((i) => {
            const title = document.createElement("h1");
            const textTitle = document.createTextNode(i.title);
            title.appendChild(textTitle);
            const description = document.createElement("h3");
            const textDescription = document.createTextNode(i.description);
            description.appendChild(textDescription);
            el.appendChild(title);
            el.appendChild(description);
          });
        }
      })
      .catch((err) => console.log(err));
  }
}

export const Contentful = new API(
  "i9vuBGpF6y635eTY4SVQn7tqkq2PKwV9wkpVyFmoEg0",
  "28m0og7kv90e"
);
