// export default (timestamp, locale = null) =>
//   new Date(timestamp * 1000).toLocaleString(
//     locale ?? navigator.language ?? "ru-RU"
//   );
export default (timestamp, locale = null) =>
  new Date(timestamp * 1000).toLocaleString(locale ?? "ru-RU");
