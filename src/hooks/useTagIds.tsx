import { atom, useAtom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

interface Tag {
  id: number;
  name: string;
  isSelected: boolean;
}

type TagAction = {
  type: 'init';
  payload: Tag[];
} | {
  type: 'toggle';
  payload: { id: number };
};

const tagReducer = (prev: Tag[], action: TagAction) => {
  if (action.type === 'init') {
    return action.payload;
  }

  if (action.type === 'toggle') {
    return prev.map((tag) => tag.id === action.payload.id
      ? {
        ...tag,
        isSelected: !tag.isSelected,
      }
      : tag);
  }

  return prev;
};

const tagAtom = atomWithReducer([], tagReducer);
const selectedTagIdsAtom = atom(
  (get) => get(tagAtom).filter((tag) => tag.isSelected).map((tag) => tag.id),
);
const selectTagsAtom = atom(
  (get) => get(tagAtom).filter((tag) => tag.isSelected),
);

export const useTag = () => {
  const [tags, dispatch] = useAtom(tagAtom);
  const [selectedTagIds] = useAtom(selectedTagIdsAtom);
  const [selectedTags] = useAtom(selectTagsAtom);

  return {
    tags,
    dispatch,
    selectedTagIds,
    selectedTags,
  };
};
