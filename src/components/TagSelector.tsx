import { useQuery } from '@tanstack/react-query';
import { useTag, type Tag } from '../hooks/useTag';
import { getAvailableTags } from '../apis/getAvailableTags';
import { Box, Button, Flex, IconButton, TextField } from '@radix-ui/themes';
import { useEffect, useMemo, useState } from 'react';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { debounce } from '../utils/debounce';

interface TagSelectorProps { initialSelectedValues?: Tag[] }

export const TagSelector = ({ initialSelectedValues }: TagSelectorProps) => {
  const { isPending, isError, data, isSuccess } = useQuery({
    queryKey: ['availableTags'],
    queryFn: getAvailableTags,
  });
  const { tags, addTag, deleteTag, tagIds } = useTag();
  const [searchString, setSearchString] = useState('');
  const [searchedTags, setSearchedTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (isSuccess && data && initialSelectedValues) {
      initialSelectedValues.forEach((tag) => addTag(tag));
    }
  }, [data, addTag, isSuccess, initialSelectedValues]);

  const debouncedUpdateSearchedTags = useMemo(() => debounce((curSearchStr: string, tagsData: Tag[]) => {
    setSearchedTags(() => {
      if (!tagsData) return [];
      if (curSearchStr === '') return tagsData;

      return tagsData.filter(({ name }) => name.includes(curSearchStr));
    });
  }, 300), []);

  useEffect(() => {
    if (data) {
      debouncedUpdateSearchedTags(searchString, data);
    }
  }, [data, searchString, debouncedUpdateSearchedTags]);

  if (isPending) return null;
  if (isError) return <div>태그 목록을 불러오지 못했습니다.</div>;

  return (
    <Flex
      direction="column"
      gap="2"
    >
      {tags.length > 0
        ? (
          <>
            <Box>선택된 태그</Box>
            <Flex
              wrap="wrap"
              gap="2"
            >
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant="soft"
                  onClick={() => deleteTag(tag)}
                >
                  {tag.name}
                  <Cross2Icon />
                </Button>
              ))}
            </Flex>
          </>
        )
        : <Box>태그를 선택해주세요.</Box>}
      <Box>태그 목록</Box>
      <TextField.Root
        value={searchString}
        onChange={(e) => setSearchString(e.currentTarget.value)}
        placeholder="태그를 검색하세요."
      >
        <TextField.Slot side="left">
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Slot side="right">
          <IconButton
            variant="ghost"
            type="button"
            onClick={() => setSearchString('')}
          >
            <Cross2Icon />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      <Flex
        wrap="wrap"
        gap="2"
      >
        {searchedTags.map((tag) => (
          <Button
            type="button"
            key={tag.id}
            variant="solid"
            onClick={() => addTag(tag)}
            disabled={tagIds.includes(tag.id)}
          >
            {tag.name}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};
