class API {
  constructor(accessToken, spaceID) {
    this.accessToken = accessToken;
    this.spaceID = spaceID;
    this.environment_id = "master";
    this.endpoint = `https://graphql.contentful.com/content/v1/spaces/${this.spaceID}`;
  }

  getFetchOptions(query) {
    return {
      spaceID: this.spaceID,
      accessToken: this.accessToken,
      endpoint: this.endpoint,
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };
  }

  async getBlurb(el) {
    const query = `
      {
        blurbCollection {
          items {
            sys {
              firstPublishedAt
            }
            blurb
          }
        }
      }
    `;

    fetch(this.endpoint, this.getFetchOptions(query))
      .then((res) => res.json())
      .then(({ data }) => {
        if (data?.blurbCollection?.items) {
          data.blurbCollection.items.forEach((i) => {
            const blurb = document.createElement("p");
            const blurbText = document.createTextNode(i.blurb);
            blurb.appendChild(blurbText);
            el.appendChild(blurb);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  async getAbout(el) {
    const query = `
      {
        aboutCollection {
          items {
            sys {
              firstPublishedAt
            }
            description
          }
        }
      }
    `;

    fetch(this.endpoint, this.getFetchOptions(query))
      .then((res) => res.json())
      .then(({ data }) => {
        if (data?.aboutCollection?.items) {
          data.aboutCollection.items.forEach((i) => {
            const about = document.createElement("h1");
            const aboutText = document.createTextNode(i.description);
            about.appendChild(aboutText);
            el.appendChild(about);
          });
        }
      })
      .catch((err) => console.log(err));
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

    fetch(this.endpoint, this.getFetchOptions(query))
      .then((res) => res.json())
      .then(({ data }) => {
        if (data?.servicesCollection?.items) {
          data.servicesCollection.items.forEach((i) => {
            const title = document.createElement("h1");
            const titleText = document.createTextNode(i.title);
            title.appendChild(titleText);
            const description = document.createElement("h3");
            const descriptionText = document.createTextNode(i.description);
            description.appendChild(descriptionText);
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
