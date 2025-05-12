import { FC } from 'react';
import { x } from '@xstyled/styled-components';

type CommandOptionProps = {
  label: string;
  Icon: FC<{
    color?: string;
  }>;
  isActive: boolean;
  onClick: () => void;
  index: number;
};

export const CommandOption: FC<CommandOptionProps> = ({
  label,
  Icon,
  isActive,
  onClick,
  index,
}) => (
  <x.li
    role="option"
    tabIndex={-1}
    aria-selected={isActive}
    id={`command-option-${index}`}
    row
    alignItems="center"
    gap="10px"
    fontSize="14px"
    px="20px"
    py="10px"
    bg={isActive ? '#424242' : 'transparent'}
    onClick={onClick}
    aria-label={label}
  >
    <Icon color="gray" />
    {label}
  </x.li>
);
