import { httpService } from "../api/httpService";
import { DOCUMENT_URI } from "../api/uriConfig";

const analyzeDocument = (id) => {
  return httpService.post(DOCUMENT_URI.ANALYZE(id));
};

const askAboutDocument = (id, question) => {
  return httpService.post(DOCUMENT_URI.ASK(id), { question });
};

export { analyzeDocument, askAboutDocument };
