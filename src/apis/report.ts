import { fetchInstance } from './instance';

interface ReportParams {
  editLogId: string;
  ipId: string;
  detail: string;
}

export async function report({
  editLogId,
  ipId,
  detail,
}: ReportParams) {
  return fetchInstance.post('report', {
    json: {
      editLogId,
      ipId,
      detail,
    },
  });
}
