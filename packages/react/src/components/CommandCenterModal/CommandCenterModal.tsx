import {
  FC,
  useEffect,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import * as Icons from 'react-icons/fi';
import { x } from '@xstyled/styled-components';
import Modal from '../Modal';
import PropertyDetailsView, { PropertyFormData } from './PropertyDetailView';
import { useProjectContext } from '@/contexts/Project/useProjectContext';
import { SearchBar } from './SearchBar';
import { KeyboardHintRow } from './KeyboardHintRow';
import { CommandOption } from './CommandOption';

const COMMAND_OPTIONS = [
  { label: 'Auto', icon: Icons.FiBox },
  { label: 'Text', icon: Icons.FiAlignLeft },
  { label: 'File', icon: Icons.FiFile },
  { label: 'Number', icon: Icons.FiHash },
  { label: 'Collection', icon: Icons.FiDatabase },
  { label: 'Single Select', icon: Icons.FiCheckCircle },
  { label: 'Multi Select', icon: Icons.FiCheckSquare },
  { label: 'URL', icon: Icons.FiLink2 },
  { label: 'Reference', icon: Icons.FiArrowUpRight },
  { label: 'JSON', icon: Icons.FiCode },
  { label: 'Page Splitter', icon: Icons.FiFileText },
];

const CommandCenterModal: FC<{ onPropertyAdded: () => void }> = ({
  onPropertyAdded,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isPropertyDetailsViewActive, setIsPropertyDetailsViewActive] =
    useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { callAddProperty } = useProjectContext();

  const isMac = navigator.platform.toUpperCase().includes('MAC');

  const filteredOptions = COMMAND_OPTIONS.filter(({ label }) =>
    label.toLowerCase().includes(query.toLowerCase())
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (formData: PropertyFormData) => {
    const result = await callAddProperty({ type: 'text', ...formData });
    if (result) {
      onPropertyAdded();
    }
    setIsPropertyDetailsViewActive(false);
    closeModal();
  };

  const handleSelectOption = () => {
    setIsPropertyDetailsViewActive(true);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const listSize = filteredOptions.length;
    if (!listSize) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % listSize);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + listSize) % listSize);
        break;
      case 'Enter':
        handleSelectOption();
        break;
    }
  };

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (
        (isMac && e.metaKey && e.key === 'k') ||
        (!isMac && e.ctrlKey && e.key === 'k')
      ) {
        e.preventDefault();
        openModal();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [isMac]);

  useEffect(() => setActiveIndex(0), [query]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {isPropertyDetailsViewActive ? (
        <PropertyDetailsView
          onSubmit={handleFormSubmit}
          onBackPress={() => setIsPropertyDetailsViewActive(false)}
        />
      ) : (
        <>
          <SearchBar
            query={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
            onKeyDown={handleKeyDown}
            activeOptionIndex={activeIndex}
          />

          <x.ul
            role="listbox"
            id="command-options-list"
            py="20px"
            px="0"
            display="flex"
            flexDirection="column"
            listStyleType="none"
          >
            {filteredOptions.map(({ label, icon }, i) => (
              <CommandOption
                key={label}
                label={label}
                Icon={icon}
                index={i}
                isActive={i === activeIndex}
                onClick={handleSelectOption}
              />
            ))}
            {filteredOptions.length === 0 && (
              <x.section
                row
                flexDirection="column"
                p="50px"
                justifyContent="center"
                alignItems="center"
              >
                <Icons.FiZap size={50} color="gray" strokeWidth={1} />
                <x.div h="20px" />
                <x.p color="gray">Yikes! No results found</x.p>
                <x.p fontSize="12px" color="gray">
                  Try a broad search text
                </x.p>
              </x.section>
            )}
          </x.ul>

          <KeyboardHintRow isMac={isMac} />
        </>
      )}
    </Modal>
  );
};

export default CommandCenterModal;
