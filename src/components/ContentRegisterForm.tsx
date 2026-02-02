import { getVideoIdFromYoutubeURL } from '../utils/url';
import { useEffect, useState } from 'react';
import { EmbedYoutubePlayer } from './EmbedYoutubePlayer';
import { useMutation } from '@tanstack/react-query';
import { registerContent } from '../apis/registerContent';
import { Drawer } from './Drawer';
import { useNavigate } from 'react-router';
import { Box, Button, DataList, Flex, Text, TextField } from '@radix-ui/themes';
import { css } from '@emotion/react';
import { useForm, useWatch, type Control } from 'react-hook-form';
import { usePosition } from '../hooks/usePosition';
import { TagSelector } from './TagSelector';
import { useTag } from '../hooks/useTag';

interface ContentInputs { url: string }

export const ContentRegisterForm = () => {
  const { register, formState, handleSubmit, control } = useForm<ContentInputs>({
    defaultValues: { url: '' },
    mode: 'all',
  });
  const { position, resetPosition } = usePosition();
  const { tagIds } = useTag();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerContent,
    onSuccess: () => {
      closeForm();
    },
  });

  useEffect(() => {
    resetPosition();
  }, [resetPosition]);

  const onSubmit = (data: ContentInputs) => {
    if (!position || !getVideoIdFromYoutubeURL(data.url)) return;

    mutation.mutate({
      url: data.url,
      positions: [position],
      tagIds,
    });
  };

  const closeForm = () => {
    navigate('/');
  };

  return (
    <Drawer onClose={closeForm}>
      <VideoPreview control={control} />
      <Flex
        asChild
        direction="column"
        p="4"
        gap="4"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
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
                {...register('url', {
                  validate: (value) => {
                    const extractedId = getVideoIdFromYoutubeURL(value);
                    if (!extractedId) return 'Youtube 링크가 유효하지 않습니다.';
                    return true;
                  },
                })}
                aria-invalid={formState.errors.url ? 'true' : 'false'}
                color={formState.errors.url ? 'red' : undefined}
                css={css`
                ${formState.errors.url ? 'border: 1px solid red;' : ''}
              `}
              />
            </label>
            {formState.errors.url
              ? (
                <Text
                  as="div"
                  color="red"
                  role="alert"
                  mt="2"
                >
                  {formState.errors.url.message}
                </Text>
              )
              : null}
          </Box>
          {position
            ? (
              <DataList.Root>
                <DataList.Item align="center">
                  <DataList.Label minWidth="2.5rem">위도</DataList.Label>
                  <DataList.Value>{position.lat}</DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="2.5rem">경도</DataList.Label>
                  <DataList.Value>{position.lng}</DataList.Value>
                </DataList.Item>
              </DataList.Root>
            )
            : (
              <Text>지도를 클릭해 등록할 위치를 선택해주세요.</Text>
            )}
          <TagSelector />
          {mutation.isPending
            ? <Text>등록중...</Text>
            : (
              <Flex justify="end">
                <Button
                  type="submit"
                  disabled={!formState.isValid || !position}
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
      </Flex>
    </Drawer>
  );
};

const VideoPreview = ({ control }: { control: Control<ContentInputs> }) => {
  const url = useWatch({
    control,
    name: 'url',
  });
  const [id, setId] = useState<string>();

  const extractedId = getVideoIdFromYoutubeURL(url);

  if (extractedId && extractedId !== id) {
    setId(extractedId);
  }

  const videoId = extractedId || id;

  if (!videoId) return null;

  return <EmbedYoutubePlayer id={videoId} />;
};
