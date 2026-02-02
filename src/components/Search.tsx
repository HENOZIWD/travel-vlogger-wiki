import { css } from '@emotion/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, IconButton, Popover, TextField } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { searchContents } from '../apis/searchContents';
import { SearchContentResult } from './SearchContentResult';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { data, refetch, isFetching, isError } = useQuery({
    queryKey: ['searchContent', query],
    queryFn: () => searchContents(query),
    enabled: false,
    retry: false,
  });

  const handleSearchContent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    refetch();
    setShowResult(true);
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
      <Popover.Content css={css`
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
                {`"${query}" 검색 결과`}
              </Box>
              <SearchContentResult
                data={data}
                isFetching={isFetching}
                isError={isError}
              />
            </Flex>
          )
          : (
            <form onSubmit={handleSearchContent}>
              <TextField.Root
                size="3"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              >
                <TextField.Slot side="right">
                  <IconButton
                    type="submit"
                    variant="ghost"
                    size="3"
                  >
                    <MagnifyingGlassIcon />
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </form>
          )}
      </Popover.Content>
    </Popover.Root>
  );
};
