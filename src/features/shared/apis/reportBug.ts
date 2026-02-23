import { fetchInstance } from './instance';

interface ReportBugParams {
  id: string;
  info: string;
  explanation?: string;
}

export async function reportBug({ id, info, explanation }: ReportBugParams) {
  return fetchInstance.post('bug', {
    json: {
      id,
      info,
      explanation,
    },
  });
}
