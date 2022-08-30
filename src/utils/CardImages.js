function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "").replace(".jpg", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../assets/card-images", false, /\.(png|jpe?g|svg)$/)
);

export default images;
