import { useSearchParams } from 'react-router';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useContentRegisterFormState } from '../hooks/useContentRegisterFormState';
import { useMutation } from '@tanstack/react-query';
import { editContent } from '../apis/editContent';
import type { FormEvent } from 'react';

interface ContentEditFormProps { id: string }

export const ContentEditForm = ({ id }: ContentEditFormProps) => {
  const [_, setSearchParams] = useSearchParams();
  const { position, resetFormState } = useContentRegisterFormState();

  const mutation = useMutation({
    mutationFn: editContent,
    onSuccess: () => {
      closeForm();
    },
  });

  const handleCloseEdit = () => {
    closeForm();
  };

  const closeForm = () => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.delete('edit');
      return nextParams;
    });
    resetFormState();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position) return;

    mutation.mutate({
      id,
      positions: [position!],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text
        as="div"
        my="2"
      >
        {position
          ? `위도: ${position.lat}, 경도: ${position.lng}`
          : '변경할 위치를 지도에서 선택해주세요.'}
      </Text>
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
  );
};
