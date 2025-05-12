import {
  FC,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent,
  ChangeEvent,
  useRef,
} from 'react';
import * as Icons from 'react-icons/fi';
import { styled, x } from '@xstyled/styled-components';

const SearchInput = styled(x.input)`
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }
`;

type SearchBarProps = {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLDivElement>) => void;
  activeOptionIndex: number;
};

export const SearchBar: FC<SearchBarProps> = ({
  query,
  onChange,
  onClear,
  onKeyDown,
  activeOptionIndex,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <x.div
      row
      p="20px"
      gap="10px"
      alignItems="center"
      borderBottom="1px solid rgb(62, 62, 62)"
      onKeyDown={onKeyDown}
    >
      <Icons.FiSearch color="gray" size={25} />
      <SearchInput
        type="search"
        role="searchbox"
        placeholder="Type a command"
        border="none"
        bg="transparent"
        outline="none"
        ref={searchInputRef}
        flexGrow={1}
        value={query}
        onChange={onChange}
        aria-label="Search command input"
        aria-autocomplete="list"
        aria-controls="command-options-list"
        aria-activedescendant={
          query ? `command-option-${activeOptionIndex}` : undefined
        }
      />
      {query && (
        <x.button
          bg="transparent"
          p="0"
          aria-label="Clear search text"
          onClick={() => {
            onClear();
            searchInputRef.current?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.stopPropagation();
          }}
        >
          <Icons.FiX color="gray" size={25} />
        </x.button>
      )}
    </x.div>
  );
};
