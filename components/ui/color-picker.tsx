'use client';

import { useMemo, useState, forwardRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = ({
  disabled,
  value,
  onChange,
  onBlur,
  name,
  className,
  ...props
}: Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps) => {
  const [open, setOpen] = useState(false);

  const parsedValue = useMemo(() => value || '#FFFFFF', [value]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          {...props}
          className={cn('block', className)}
          name={name}
          onClick={() => setOpen(true)}
          size='icon'
          style={{ backgroundColor: parsedValue }}
          variant='outline'
          disabled={disabled}
          onBlur={onBlur}
        >
          <div />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full'>
        <HexColorPicker color={parsedValue} onChange={onChange} />
        <Input
          maxLength={7}
          onChange={(e) => onChange(e.currentTarget.value)}
          value={parsedValue}
        />
      </PopoverContent>
    </Popover>
  );
};

export { ColorPicker };
