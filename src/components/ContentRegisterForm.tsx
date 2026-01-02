import { getVideoIdFromYoutubeURL } from '../utils/url';
import { css } from '@emotion/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { formErrorStyle, inputTextStyle, labelStyle } from '../styles';
import { EmbedYoutubePlayer } from './EmbedYoutubePlayer';
import { useMutation } from '@tanstack/react-query';
import { registerContent } from '../apis/registerContent';
import { useContentRegisterFormState } from '../hooks/useContentRegisterFormState';
import { Drawer } from './Drawer';
import { useNavigate } from 'react-router';

export const ContentRegisterForm = () => {
  const {
    url,
    setUrl,
    position,
    resetFormState,
    errors,
    isValid,
  } = useContentRegisterFormState();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerContent,
    onSuccess: () => {
      closeForm();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    mutation.mutate({
      url,
      positions: [position!],
    });
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const closeForm = () => {
    navigate('/');
    resetFormState();
  };

  return (
    <Drawer onClose={closeForm}>
      <VideoPreview />
      <div css={css`
          padding: 1rem;
        `}
      >
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="url"
            css={labelStyle}
          >
            Youtube 링크
            <input
              type="text"
              id="url"
              onChange={handleUrlChange}
              value={url}
              aria-invalid={errors.url ? 'true' : 'false'}
              css={inputTextStyle}
            />
          </label>
          {errors.url
            ? <div css={formErrorStyle}>{errors.url}</div>
            : null}
          <div css={css`
            margin: 0.5rem 0;
          `}
          >
            {position
              ? `위도: ${position.lat}, 경도: ${position.lng}`
              : '등록할 위치를 지도에서 선택해주세요.'}
          </div>
          {mutation.isPending
            ? <div>등록중...</div>
            : (
              <>
                <button
                  type="submit"
                  disabled={!isValid}
                >
                  등록하기
                </button>
                {mutation.isError
                  ? (
                    <div>
                      오류가 발생했습니다:
                      {' '}
                      {mutation.error.message}
                    </div>
                  )
                  : null}
                {mutation.isSuccess ? <div>등록이 완료되었습니다.</div> : null}
              </>
            )}
        </form>
      </div>
    </Drawer>
  );
};

const VideoPreview = () => {
  const { url } = useContentRegisterFormState();
  const [id, setId] = useState<string>();

  const extractedId = getVideoIdFromYoutubeURL(url);

  if (extractedId && extractedId !== id) {
    setId(extractedId);
  }

  const videoId = extractedId || id;

  if (!videoId) return null;

  return <EmbedYoutubePlayer id={videoId} />;
};
