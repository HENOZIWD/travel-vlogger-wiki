import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, RadioGroup, TextArea } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { report } from '../apis/report';
import { useState, type FormEvent } from 'react';

interface ReportProps {
  historyId: string;
  editorId: string;
}

const REPORT_MESSAGES: Record<string, string> = {
  1: '여행과 관련없는 영상',
  2: '표시한 위치가 실제 여행지와 다름',
  3: '태그가 내용과 일치하지 않음',
  etc: '기타',
};

export const Report = ({ historyId, editorId }: ReportProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: report,
    onSuccess: () => {
      setResult('신고가 접수되었습니다.');
    },
    onError: () => {
      setResult('신고 접수 중 오류가 발생했습니다.');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOption) return;

    const formData = new FormData(e.currentTarget);
    const etcReason = formData.get('etcReason');

    mutation.mutate({
      editLogId: historyId,
      ipId: editorId,
      detail: selectedOption === 'etc'
        ? '기타: ' + (typeof etcReason === 'string' ? etcReason : '')
        : REPORT_MESSAGES[selectedOption],
    });
  };

  const handleOpenChange = () => {
    setSelectedOption(null);
    setResult(null);
  };

  return (
    <Dialog.Root onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button
          type="button"
          color="red"
          size="1"
          variant="soft"
        >
          <ExclamationTriangleIcon />
          {' '}
          신고하기
        </Button>
      </Dialog.Trigger>

      <Dialog.Content width="fit-content">
        {result
          ? (
            <>
              <div>{result}</div>
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
                콘텐츠 신고하기
              </Dialog.Title>
              <Dialog.Description
                size="2"
                mb="4"
              >
                신고 사유를 선택해주세요.
              </Dialog.Description>
              <form onSubmit={handleSubmit}>
                <RadioGroup.Root
                  size="2"
                  name="reason"
                  onValueChange={setSelectedOption}
                >
                  {Object.entries(REPORT_MESSAGES).map(([key, value]) => (
                    <RadioGroup.Item
                      key={key}
                      value={key}
                      checked={selectedOption === key}
                    >
                      {value}
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
                {selectedOption === 'etc'
                  ? (
                    <TextArea
                      name="etcReason"
                      size="2"
                      mt="2"
                      placeholder="사유를 입력해주세요."
                    />
                  )
                  : null}
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
                    type="submit"
                    color="red"
                    disabled={!selectedOption || mutation.isPending}
                    loading={mutation.isPending}
                  >
                    제출
                  </Button>
                </Flex>
              </form>
            </>
          )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
