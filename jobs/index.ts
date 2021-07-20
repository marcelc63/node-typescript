import path from "path";

export default [
  {
    name: "track",
    path: path.join(`${__dirname}`, "test.js"),
    cron: "0 0 * * *",
  },
];
