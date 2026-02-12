import { Button, Dialog, Flex, TextArea } from '@radix-ui/themes';
import { ErrorMessage } from './ErrorMessage';
import { useState } from 'react';
import { isHTTPError } from 'ky';
import { useMutation } from '@tanstack/react-query';
import { reportBug } from '../apis/reportBug';

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
  errorId: string;
}

export const ErrorFallback = ({ error, reset, errorId }: ErrorFallbackProps) => {
  const [isReportCompleted, setIsReportCompleted] = useState(false);
  const [text, setText] = useState('');

  const mutation = useMutation({
    mutationFn: reportBug,
    onSettled: () => {
      setIsReportCompleted(true);
    },
  });

  const handleBugReport = () => {
    if (text === '') return;

    mutation.mutate({
      id: errorId,
      info: '-',
      explanation: text,
    });
  };

  const handleOpenChange = () => {
    setText('');
  };

  return (
    <Flex
      align="center"
      direction="column"
    >
      <ErrorMessage message={error.message ?? String(error)} />
      <Flex gap="4">
        <Button
          type="button"
          onClick={reset}
        >
          다시 시도
        </Button>
        {isHTTPError(error)
          ? null
          : (
            <Dialog.Root onOpenChange={handleOpenChange}>
              <Dialog.Trigger>
                <Button
                  type="button"
                  color="red"
                  disabled={isReportCompleted}
                >
                  버그 신고하기
                </Button>
              </Dialog.Trigger>

              <Dialog.Content>
                {isReportCompleted
                  ? (
                    <>
                      <div>
                        {mutation.isSuccess
                          ? '버그 신고가 완료되었습니다.'
                          : '버그 신고 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
                      </div>
                      <Flex
                        justify="end"
                        mt="4"
                      >
                        <Dialog.Close>
                          <Button type="button">
                            닫기
                          </Button>
                        </Dialog.Close>
                      </Flex>
                    </>
                  )
                  : (
                    <>
                      <Dialog.Title>
                        버그 신고하기
                      </Dialog.Title>
                      <Dialog.Description
                        size="2"
                        mb="4"
                      >
                        버그가 발생했을 때의 상황을 설명해주세요. 버그 수정에 많은 도움이 됩니다.
                      </Dialog.Description>
                      <TextArea
                        value={text}
                        onChange={(e) => setText(e.currentTarget.value)}
                      />
                      <Flex
                        mt="4"
                        justify="between"
                      >
                        <Dialog.Close>
                          <Button
                            type="button"
                            color="gray"
                          >
                            취소
                          </Button>
                        </Dialog.Close>
                        <Button
                          type="button"
                          color="red"
                          onClick={handleBugReport}
                          disabled={text === '' || mutation.isPending}
                          loading={mutation.isPending}
                        >
                          제출
                        </Button>
                      </Flex>
                    </>
                  )}
              </Dialog.Content>
            </Dialog.Root>
          )}
      </Flex>
    </Flex>
  );
};
