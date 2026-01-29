import { useQuery } from '@tanstack/react-query';
import { useTag } from '../hooks/useTagIds';
import { getAvailableTags } from '../apis/getAvailableTags';
import { Box, Button, Flex } from '@radix-ui/themes';
import { useEffect } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

export const TagSelector = () => {
  const { isPending, isError, data, isSuccess } = useQuery({
    queryKey: ['availableTags'],
    queryFn: getAvailableTags,
  });
  const { tags, dispatch, selectedTags } = useTag();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch({
        type: 'init',
        payload: data.map((tag) => ({
          ...tag,
          isSelected: false,
        })),
      });
    }
  }, [data, dispatch, isSuccess]);

  const handleToggleTag = (id: number) => {
    dispatch({
      type: 'toggle',
      payload: { id },
    });
  };

  if (isPending) return null;
  if (isError) return <div>태그 목록을 불러오지 못했습니다.</div>;

  return (
    <Flex
      direction="column"
      gap="2"
    >
      {selectedTags.length > 0
        ? (
          <>
            <Box>선택된 태그</Box>
            <Flex
              wrap="wrap"
              gap="2"
            >
              {selectedTags.map(({ id, name }) => (
                <Button
                  key={id}
                  type="button"
                  variant="soft"
                  onClick={() => handleToggleTag(id)}
                >
                  {name}
                  <Cross2Icon />
                </Button>
              ))}
            </Flex>
          </>
        )
        : <Box>태그를 선택해주세요.</Box>}
      <Box>태그 목록</Box>
      <Flex
        wrap="wrap"
        gap="2"
      >
        {tags.map(({ id, name, isSelected }) => (
          <Button
            type="button"
            key={id}
            variant="solid"
            disabled={isSelected}
            onClick={() => handleToggleTag(id)}
          >
            {name}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};
