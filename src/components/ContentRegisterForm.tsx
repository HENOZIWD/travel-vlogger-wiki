import { getVideoIdFromYoutubeURL } from '../utils/url';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { EmbedYoutubePlayer } from './EmbedYoutubePlayer';
import { useMutation } from '@tanstack/react-query';
import { registerContent } from '../apis/registerContent';
import { useContentRegisterFormState } from '../hooks/useContentRegisterFormState';
import { Drawer } from './Drawer';
import { useNavigate } from 'react-router';
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes';
import { css } from '@emotion/react';

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
      <Box p="4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">
            <Text
              as="div"
              size="2"
              mb="1"
            >
              Youtube 링크
            </Text>
            <TextField.Root
              placeholder="Youtube 링크를 입력해주세요."
              size="3"
              type="text"
              id="url"
              onChange={handleUrlChange}
              value={url}
              aria-invalid={errors.url ? 'true' : 'false'}
              color={errors.url ? 'red' : undefined}
              css={css`
                ${errors.url ? 'border: 1px solid red;' : ''}
              `}
            />
          </label>
          {errors.url
            ? (
              <Text
                as="div"
                my="1"
                color="red"
              >
                {errors.url}
              </Text>
            )
            : null}
          <Text
            as="div"
            my="2"
          >
            {position
              ? `위도: ${position.lat}, 경도: ${position.lng}`
              : '등록할 위치를 지도에서 선택해주세요.'}
          </Text>
          {mutation.isPending
            ? <Text>등록중...</Text>
            : (
              <Flex justify="end">
                <Button
                  type="submit"
                  disabled={!isValid}
                  variant="solid"
                  size="2"
                >
                  등록하기
                </Button>
                {mutation.isError
                  ? (
                    <div>
                      오류가 발생했습니다:
                      {' '}
                      {mutation.error.message}
                    </div>
                  )
                  : null}
                {mutation.isSuccess ? <Text>등록이 완료되었습니다.</Text> : null}
              </Flex>
            )}
        </form>
      </Box>
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
