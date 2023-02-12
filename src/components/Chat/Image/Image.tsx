import { ImagesProps } from './Images.props';
import './images.scss';
import cn from 'classnames';
import { CSSProperties, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { OverlappingPopup } from '../../OverlappingPopup/OverlappingPopup';

export const Images = observer(({className, paths, ...props}: ImagesProps): JSX.Element => {

	const imgCount = paths.length;

	const [isActiveImgPopup, setActiveImgPopup] = useState<boolean>(false);
	const [activeImage, setActiveImage] = useState<string | null>(null);

	const size = (count: number, index: number): CSSProperties => {
		let height = null;
		let width = null;

		
		if (index === 0 && imgCount !== 2) {
			if (window.screen.width <= 1360) {
				width = 280;
				height = 158;
			} else {
				width = 410;
				height = 230;
			}
		} else {
			if (window.screen.width <= 1360) {
				height = imgCount === 2 ? (158 / 2) : (158 / (imgCount - 1));
				width = 280 / (count - 1);
			} else {
				height = imgCount === 2 ? (230 / 2) : (230 / (imgCount - 1));
				width = 410 / (count - 1);
			}
		}


		return {
			width,
			height
		}
	}

	const showOnClickHandler = (image: string) => {

		if (!isActiveImgPopup) {
			setActiveImage(null);
		}
		setActiveImage(image);
		setActiveImgPopup(true);
	}

	const showOffPopup = () => {
		setActiveImage(null);
		setActiveImgPopup(false);
	}

	const images = (): JSX.Element[] => paths.map((image, index) => {
			
			
			
			return (
				<img style={size(imgCount, index)}
				 key={image} src={image} alt={image} className={cn('images__image-item', 
					 { 'images__image-item--half': imgCount === 2 },
					 { 'images__image-item--rest': imgCount > 2 }
				)}
					onClick={() => showOnClickHandler(image)}
				/>
			)
	})


	return (
		<div>
			<div className={cn('images__image-container')}>
				{images()}
			</div>

			{activeImage && 

				<OverlappingPopup active={isActiveImgPopup} setActive={setActiveImgPopup}>
					<span className='images__close-button' onClick={showOffPopup} />
					<div className='images__full-image'>
						<div>
							<img src={activeImage} alt={activeImage}></img>
						</div>
					</div>
				</OverlappingPopup>
			
			}
			
		</div>
			
	
)})