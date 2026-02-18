import { css } from '@emotion/react';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react';
import { getAvailableTags } from '../apis/getAvailableTags';
import { debounce } from '../utils/debounce';
import type { Tag } from '../utils/type';
import { useNavigate } from 'react-router';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const tagQuery = useQuery({
    queryKey: ['availableTags'],
    queryFn: getAvailableTags,
  });
  const [searchedTags, setSearchedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
    const trimmedQuery = query.trim();
    if (!trimmedQuery && tags.length === 0) return;

    const searchParams = new URLSearchParams();
    if (trimmedQuery) searchParams.append('q', trimmedQuery);
    if (tags.length > 0) searchParams.append('tags', tags.map(({ id }) => id).join(','));

    setOpen(false);
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleDeleteTagByBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && query === '') {
      setTags((prev) => prev.slice(0, prev.length - 1));
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger>
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
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex
          direction="column"
          gap="2"
        >
          <Dialog.Title mb="0">콘텐츠 검색</Dialog.Title>
          <Dialog.Description
            mb="2"
            size="2"
          >
            검색어를 입력하거나 태그를 선택하세요.
          </Dialog.Description>
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
                css={css`
                  max-width: calc(100% - 40px);
                `}
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
            maxHeight="13rem"
            overflowY="auto"
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
          <Flex justify="end">
            <Dialog.Close>
              <Button
                type="button"
                color="gray"
              >
                닫기
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
