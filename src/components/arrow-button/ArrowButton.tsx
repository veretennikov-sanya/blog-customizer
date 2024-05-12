import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	onClose: () => void;
	isOpen: boolean;
};

export const ArrowButton = (props: TArrowButtonProps) => {
	const arrowButtonStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: props.isOpen,
	});

	const arrowStyle = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: props.isOpen,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */

		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			onClick={props.onClose}
			tabIndex={0}
			className={arrowButtonStyle}>
			<img src={arrow} alt='иконка стрелочки' className={arrowStyle} />
		</div>
	);
};
