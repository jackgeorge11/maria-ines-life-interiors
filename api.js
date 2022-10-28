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

  async getBlurb(els) {
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
            els.forEach((e, j) => {
              const blurb = document.createElement("p");
              const blurbText = document.createTextNode(i.blurb);
              blurb.appendChild(blurbText);
              e.appendChild(blurb);
            });
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
            image {
              url
            }
          }
        }
      }
    `;
    fetch(this.endpoint, this.getFetchOptions(query))
      .then((res) => res.json())
      .then(({ data }) => {
        const items = data.aboutCollection.items;
        if (items) {
          const img = document.createElement("img");
          img.src = items[0].image.url;
          el.appendChild(img);
          items[0].description.split("\n").forEach((p, i) => {
            if (p) {
              const about = document.createElement("h3");
              const aboutText = document.createTextNode(p);
              about.appendChild(aboutText);
              el.appendChild(about);
            } else {
              el.appendChild(document.createElement("br"));
            }
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
            title
            cost
            description
            order
          }
        }
      }
    `;

    fetch(this.endpoint, this.getFetchOptions(query))
      .then((res) => res.json())
      .then(({ data }) => {
        if (data?.servicesCollection?.items) {
          const services = data.servicesCollection.items.sort(
            (a, b) => a.order - b.order
          );
          services.forEach((i) => {
            const title = document.createElement("h1");
            const titleText = document.createTextNode(i.title);
            title.appendChild(titleText);
            if (i.cost) {
              const cost = document.createElement("span");
              const costText = document.createTextNode(i.cost);
              cost.appendChild(costText);
              cost.className = "lora";
              title.appendChild(cost);
            }
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

  getAllData() {
    this.getBlurb([
      document.querySelector(".signature"),
      document.querySelector("article.about"),
    ]);
    this.getAbout(document.querySelector("article.about"));
    this.getServices(document.querySelector("article.services"));
  }
}

export const Contentful = new API(
  "i9vuBGpF6y635eTY4SVQn7tqkq2PKwV9wkpVyFmoEg0",
  "28m0og7kv90e"
);
