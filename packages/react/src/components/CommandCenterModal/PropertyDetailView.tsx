import React, { useEffect, useRef, useState } from 'react';
import { FiArrowLeft as LeftIcon } from 'react-icons/fi';
import { x } from '@xstyled/styled-components';

export type PropertyFormData = {
  name: string;
  description: string;
};

type PropertyDetailsViewProps = {
  onSubmit: (formData: PropertyFormData) => void;
  onBackPress: () => void;
};

export const PropertyDetailsView: React.FC<PropertyDetailsViewProps> = ({
  onSubmit,
  onBackPress,
}) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <x.div row flexDirection="column" p="30px" gap="20px">
      <x.div row justifyContent="flex-start" alignItems="center">
        <x.button
          onClick={onBackPress}
          background="transparent"
          p="0"
          w="max-content"
          aria-label="Go back to command center"
        >
          <LeftIcon size={25} color="gray" />
        </x.button>
        <x.h2
          fontWeight="normal"
          fontSize="22px"
          flexGrow={1}
          textAlign="center"
        >
          Add Property Details
        </x.h2>
      </x.div>
      <x.form
        onSubmit={handleSubmit}
        row
        flexDirection="column"
        gap="30px"
        mt="30px"
      >
        <x.div row flexDirection="column" gap="3px">
          <x.label fontSize="14px" color="lightgray" htmlFor="name">
            Name
          </x.label>
          <x.input
            id="name"
            name="name"
            type="text"
            ref={inputRef}
            value={formData.name}
            onChange={handleChange}
            border="none"
            borderBottom="1px solid white"
            background="transparent"
            required
          />
        </x.div>
        <x.div row flexDirection="column" gap="3px">
          <x.label fontSize="14px" color="lightgray" htmlFor="description">
            Description
          </x.label>
          <x.textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            border="none"
            borderBottom="1px solid white"
            background="transparent"
            resize="vertical"
            required
          />
        </x.div>
        <x.button>Add Property</x.button>
      </x.form>
    </x.div>
  );
};

export default PropertyDetailsView;
