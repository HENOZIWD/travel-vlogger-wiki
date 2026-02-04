import { css } from '@emotion/react';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, IconButton, Popover } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react';
import { searchContents } from '../apis/searchContents';
import { SearchContentResult } from './SearchContentResult';
import { getAvailableTags } from '../apis/getAvailableTags';
import { debounce } from '../utils/debounce';
import type { Tag } from '../utils/type';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { data, refetch, isFetching, isError } = useQuery({
    queryKey: ['searchContent', query],
    queryFn: () => searchContents({
      query,
      tags,
    }),
    enabled: false,
    retry: false,
  });
  const tagQuery = useQuery({
    queryKey: ['availableTags'],
    queryFn: getAvailableTags,
  });
  const [searchedTags, setSearchedTags] = useState<Tag[]>([]);

  const debouncedUpdateSearchedTags = useMemo(() => debounce((curSearchStr: string, tagsData: Tag[]) => {
    setSearchedTags(() => {
      if (!tagsData) return [];
      if (curSearchStr === '') return tagsData;

      return tagsData.filter(({ name }) => name.includes(curSearchStr));
    });
  }, 300), []);

  useEffect(() => {
    if (tagQuery.data) {
      debouncedUpdateSearchedTags(query, tagQuery.data);
    }
  }, [tagQuery.data, query, debouncedUpdateSearchedTags]);

  const addTag = (tag: Tag) => {
    setTags((prev) => prev.some((t) => t.id === tag.id) ? prev : [...prev, tag]);
  };

  const deleteTag = (tag: Tag) => {
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
  };

  const handleSearchContent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim() && tags.length === 0) return;

    refetch();
    setShowResult(true);
  };

  const handleDeleteTagByBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && query === '') {
      setTags((prev) => prev.slice(0, prev.length - 1));
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton
          size="4"
          css={css`
            position: absolute;
            z-index: 9999;
            top: 1rem;
            left: 1rem;
          `}
        >
          <MagnifyingGlassIcon
            width="1.5rem"
            height="1.5rem"
          />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        side="right"
        css={css`
          display: block;
          height: fit-content;
        `}
      >
        {showResult
          ? (
            <Flex
              direction="column"
              gap="2"
            >
              <Button
                type="button"
                onClick={() => setShowResult(false)}
              >
                다시 검색하기
              </Button>
              <Box>
                {query ? `"${query}"` : ''}
                {' '}
                검색 결과
              </Box>
              <SearchContentResult
                data={data}
                isFetching={isFetching}
                isError={isError}
              />
            </Flex>
          )
          : (
            <Flex
              direction="column"
              gap="2"
            >
              <label htmlFor="search">콘텐츠 검색</label>
              <form onSubmit={handleSearchContent}>
                <Flex
                  align="center"
                  gap="2"
                  p="2"
                  justify="between"
                  css={css`
                  border: 1px solid var(--accent-10);
                  border-radius: var(--radius-2);
                `}
                >
                  <Flex
                    wrap="wrap"
                    gap="2"
                    flexGrow="1"
                  >
                    {tags.map((tag) => (
                      <Button
                        size="1"
                        key={tag.id}
                        type="button"
                        variant="surface"
                        onClick={() => deleteTag(tag)}
                      >
                        {tag.name}
                        <Cross2Icon />
                      </Button>
                    ))}
                    <input
                      id="search"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.currentTarget.value)}
                      onKeyDown={handleDeleteTagByBackspace}
                      css={css`
                        border: none;
                        outline: none;
                        flex-grow: 1;
                        font-size: 1rem;
                        color: var(--accent-10);
                      `}
                    />
                  </Flex>
                  <IconButton type="submit">
                    <MagnifyingGlassIcon />
                  </IconButton>
                </Flex>
              </form>
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
          )}
      </Popover.Content>
    </Popover.Root>
  );
};
