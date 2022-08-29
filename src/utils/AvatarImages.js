function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../assets/avatars", false, /\.(png|jpe?g|svg)$/)
);

export default images;
