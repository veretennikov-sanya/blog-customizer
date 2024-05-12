import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import { useRef, useState, CSSProperties } from 'react';
import { RadioGroup } from '..//radio-group/RadioGroup';
import {
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	ArticleParamsFormProps,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';
import { useClickOutsideAndEscClose } from './useClickOutsideAndEscClose';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setStyle,
}) => {
	const [open, setOpen] = useState<boolean>(false);

	const ref = useRef<HTMLElement>(null);
	useClickOutsideAndEscClose({
		isOpen: open,
		rootRef: ref,
		onChange: setOpen,
	});

	const articleParamsForm = clsx({
		[styles.container]: true,
		[styles.container_open]: open,
	});

	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);

	function handleFontFamilyChange(fontFamilyOptionValue: OptionType) {
		setFormData({
			...formData,
			fontFamilyOption: fontFamilyOptionValue,
		});
	}

	function handleFontSizeChange(fontSizeOptionValue: OptionType) {
		setFormData({
			...formData,
			fontSizeOption: fontSizeOptionValue,
		});
	}

	function handleFontColorChange(fontColorOptionValue: OptionType) {
		setFormData({
			...formData,
			fontColor: fontColorOptionValue,
		});
	}

	function handleBgColorChange(bgColorOptionValue: OptionType) {
		setFormData({
			...formData,
			backgroundColor: bgColorOptionValue,
		});
	}

	function handleContainerWidthChange(containerWidthOptionValue: OptionType) {
		setFormData({
			...formData,
			contentWidth: containerWidthOptionValue,
		});
	}

	function handleReset() {
		setFormData(defaultArticleState);
		setStyle(defaultArticleState);
		setOpen(false);
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStyle(formData);
		setOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={open} onClose={() => setOpen(!open)} />
			<aside className={articleParamsForm} ref={ref}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						selected={formData.fontFamilyOption}
						title={'Шрифт'}
					/>

					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
						selected={formData.fontSizeOption}
						title={'Размер шрифта'}
					/>

					<Select
						options={fontColors}
						onChange={handleFontColorChange}
						selected={formData.fontColor}
						title={'Цвет шрифта'}
					/>

					<Separator />

					<Select
						options={backgroundColors}
						onChange={handleBgColorChange}
						selected={formData.backgroundColor}
						title={'Цвет фона'}
					/>

					<Select
						options={contentWidthArr}
						onChange={handleContainerWidthChange}
						selected={formData.contentWidth}
						title={'Ширина контента'}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleReset}
							style={
								{
									'--button-background': '#fff',
									'--button-bg-hover': '#fff',
									'--color-font-mix': 'difference',
								} as CSSProperties
							}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
