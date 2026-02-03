import { useSearchParams } from 'react-router';
import { Button, DataList, Flex, Heading, Text } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { editContent } from '../apis/editContent';
import { useEffect, useState, type FormEvent } from 'react';
import { usePosition } from '../hooks/usePosition';
import { TagSelector } from './TagSelector';
import type { Tag } from '../utils/type';

interface ContentEditFormProps {
  id: string;
  prevPosition: google.maps.LatLngLiteral;
  prevTags: Tag[];
}

export const ContentEditForm = ({ id, prevPosition, prevTags }: ContentEditFormProps) => {
  const [_, setSearchParams] = useSearchParams();
  const { position, setPosition } = usePosition();
  const [tags, setTags] = useState<Tag[]>([...prevTags]);

  const mutation = useMutation({
    mutationFn: editContent,
    onSuccess: () => {
      closeForm();
    },
  });

  useEffect(() => {
    setPosition(prevPosition);
  }, [prevPosition, setPosition]);

  const handleCloseEdit = () => {
    closeForm();
  };

  const closeForm = () => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.delete('edit');
      return nextParams;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position) return;

    mutation.mutate({
      id,
      position,
      tagIds: tags.map((tag) => tag.id),
    });
  };

  return (
    <>
      <Heading
        as="h2"
        size="5"
        weight="bold"
        mt="4"
        mb="3"
      >
        콘텐츠 편집
      </Heading>
      <Flex
        asChild
        direction="column"
        gap="4"
      >
        <form onSubmit={handleSubmit}>
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
          <TagSelector
            tags={tags}
            setTags={setTags}
          />
          <Flex justify="between">
            <Button
              type="button"
              color="gray"
              onClick={handleCloseEdit}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!position}
            >
              완료
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};
