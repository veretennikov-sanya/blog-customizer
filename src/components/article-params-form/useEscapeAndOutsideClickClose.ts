import { useEffect } from 'react';

type UseEscapeAndOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useEscapeAndOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseEscapeAndOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose, onChange, isOpen]);
};
