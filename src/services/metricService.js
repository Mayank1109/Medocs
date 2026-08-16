import { httpService } from "../api/httpService";
import { DOCUMENT_URI } from "../api/uriConfig";

const getMetricTrends = (test) => {
  return httpService.get(DOCUMENT_URI.METRIC_TRENDS, { params: { test } });
};

export { getMetricTrends };
