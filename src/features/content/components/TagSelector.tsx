import { useSuspenseQuery } from '@tanstack/react-query';
import { getAvailableTags } from '../../shared/apis/getAvailableTags';
import { Box, Button, Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import { memo, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { debounce } from '../../shared/utils/debounce';
import type { Tag } from '../../shared/utils/type';

interface TagSelectorProps {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
}

export const TagSelector = memo(({ tags, setTags }: TagSelectorProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ['availableTags'],
    queryFn: getAvailableTags,
  });
  const [searchString, setSearchString] = useState('');
  const [searchedTags, setSearchedTags] = useState<Tag[]>([]);

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

  const addTag = (tag: Tag) => {
    setTags((prev) => prev.some((t) => t.id === tag.id) ? prev : [...prev, tag]);
  };

  const deleteTag = (tag: Tag) => {
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
  };

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
                  variant="surface"
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
      <Text
        as="label"
        htmlFor="searchTag"
        size="2"
      >
        태그 검색
      </Text>
      <TextField.Root
        id="searchTag"
        value={searchString}
        onChange={(e) => setSearchString(e.currentTarget.value)}
      >
        <TextField.Slot side="left">
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Slot side="right">
          <IconButton
            variant="ghost"
            type="button"
            onClick={() => setSearchString('')}
            aria-label="입력 초기화"
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
            disabled={tags.some((t) => t.id === tag.id)}
          >
            {tag.name}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
});
