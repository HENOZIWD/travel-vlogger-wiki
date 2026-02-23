import { fetchInstance } from '../../shared/apis/instance';

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
