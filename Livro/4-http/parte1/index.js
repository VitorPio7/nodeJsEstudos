import { getList } from "./list.js";
import data from "./data.js";
import { readFileSync, readFile } from "fs";
import { constants, createSecureServer } from "http2";
import cheerio from "cheerio";

const { HTTP2_HEADER_PATH, HTTP2_HEADER_STATUS, HTTP2_HEADER_METHOD } =
  constants;

/*Cliente */
const client = connect("https://localhost:8080", {
  ca: readFileSync("./localhost.cert"),
});
client.on("error", (err) => console.error(err));
const req = client.request({ [constants.HTTP2_HEADER_PATH]: "/" });
req.setEncoding("uf8");
let body = "";
req.on("data", (chunk) => {
  body += chunk;
});
req.on("end", () => {
  const addresses = [];
  const $ = cheerio.load(body);
  const tr = $("tr");
  tr.each((index, element) => {
    if (index === 0) return;
    addresses.push({
      id: element.children[3].children[0].data,
      firstname: element.children[5].children[0].data,
      lastname: element.children[7].children[0].data,
    });
  });

  console.log(addresses);
});
req.end();

/*SERVER */

const options = {
  key: readFileSync("./localhost.key"),
  cert: readFileSync("./localhost.cert"),
};

const server = createSecureServer(options);

server
  .on("stream", (stream, headers) => {
    const parts = headers[HTTP2_HEADER_PATH].split("/");
    if (headers[HTTP2_HEADER_PATH] === "/style.css") {
      readFile("public/style.css", "utf8", (err, data) => {
        if (err) {
          stream.respond({
            "content-type": "text/plain",
            [HTTP2_HEADER_STATUS]: 404,
          });
          stream.end();
        } else {
          stream.end(data);
        }
      });
    } else if (parts.includes("assets")) {
      readFile(
        `public${headers[HTTP2_HEADER_PATH].replaceAll("%20", " ")}`,
        (err, data) => {
          if (err) {
            console.log(err);
            stream.respond({
              [HTTP2_HEADER_STATUS]: 404,
            });
            stream.end();
          } else {
            stream.end(data);
          }
        }
      );
    } else {
      send(stream, getList(data.addresses));
    }
  })
  .listen(8080, () =>
    console.log("Address book reachable at https://localhost:8080")
  );

function send(stream, responseBody) {
  stream.respond({
    "content-type": "text/html",
    [HTTP2_HEADER_STATUS]: 200,
  });
  stream.end(responseBody);
}
