import fs from "fs";
import sizeOf from "image-size";
import fetch from "node-fetch";

let memes = JSON.parse(fs.readFileSync("memes.json"));

async function getSize(url) {
  const arrayBuffer = await fetch(url).then(r => r.arrayBuffer());
  const buffer = Buffer.from(arrayBuffer);
  const { width, height } = sizeOf(buffer);
  return { width, height };
}

async function main() {
  const out = {};

  for (let url of memes) {
    try {
      out[url] = await getSize(url);
    } catch (e) {
      out[url] = { error: true };
    }
  }

  fs.writeFileSync("memes-metadata.json", JSON.stringify(out, null, 2));
}

main();
fetch("https://script.google.com/macros/s/AKfycbwR7OkyhCVETCsbuu92JMNmo_Le8u7i4Zgppis35vk6H9a-4GFH9m2UqQLaDJhDXMSeRg/exec", {
  method: "POST",
  body: JSON.stringify({ "url": "Update meme list and metadata cache.", "token": "r4kT8FzN9qWmYxE2C7LJpH0bV6sD5A_U" })
});
