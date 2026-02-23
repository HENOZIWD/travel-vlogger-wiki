import ky from 'ky';

export const fetchInstance = ky.create({
  prefixUrl: import.meta.env.VITE_BACKEND_URL,
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;

        if (!response) {
          error.message = '서버와 연결할 수 없습니다.';
          return error;
        }

        if (!response.body) {
          error.message = `오류가 발생했습니다. 오류 코드: ${response.status}`;
          return error;
        }

        try {
          const data = await response.json() as { error: string };
          error.message = data.error || '알 수 없는 오류가 발생했습니다.';
        }
        catch (_e) {
          error.message = `서버 응답 처리 중 오류가 발생했습니다. 오류 코드: ${response.status}`;
        }

        return error;
      },
    ],
  },
});
