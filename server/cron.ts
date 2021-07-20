import Bree from "bree";
import Cabin from "cabin";

import jobs from "~/jobs";

export const initCron = async () => {
  const bree = new Bree({
    logger: new Cabin(),
    jobs,
  });

  bree.start();
};
