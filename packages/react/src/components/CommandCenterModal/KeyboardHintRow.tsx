import { FC, PropsWithChildren } from 'react';
import * as Icons from 'react-icons/fi';
import { x } from '@xstyled/styled-components';

const LabelIcon: FC<PropsWithChildren<{ label?: string }>> = ({
  label,
  children,
}) => (
  <x.div row alignItems="center" gap="10px">
    <x.p border="1px solid gray" borderRadius="8px" p="3px" bg="transparent">
      {children}
    </x.p>
    {label && <x.p color="gray">{label}</x.p>}
  </x.div>
);

type KeyboardHintRowProps = {
  isMac: boolean;
};

export const KeyboardHintRow: FC<KeyboardHintRowProps> = ({ isMac }) => (
  <x.div
    row
    p="20px"
    gap="10px"
    alignItems="center"
    fontSize="12px"
    borderTop="1px solid rgb(62, 62, 62)"
  >
    <LabelIcon label="Select">
      <Icons.FiCornerDownLeft size={15} color="gray" />
    </LabelIcon>
    <x.div row>
      <LabelIcon>
        <Icons.FiArrowUp size={15} color="gray" />
      </LabelIcon>
      <LabelIcon label="Navigate">
        <Icons.FiArrowDown size={15} color="gray" />
      </LabelIcon>
    </x.div>
    <LabelIcon label="Toggle Menu">
      <x.span row alignItems="center" px="3px" color="gray">
        {isMac ? (
          <Icons.FiCommand size={11} color="gray" />
        ) : (
          <span>Ctrl+</span>
        )}
        K
      </x.span>
    </LabelIcon>
    <LabelIcon label="Close">
      <x.span px="3px" color="gray">
        esc
      </x.span>
    </LabelIcon>
  </x.div>
);
