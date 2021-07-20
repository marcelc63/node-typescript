import Cabin from "cabin";
const logger = new Cabin();

const job = async () => {
  logger.info("test complete", { response: "hi" });
};

job();
