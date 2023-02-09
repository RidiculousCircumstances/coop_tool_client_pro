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

	const size = (count: number): CSSProperties => {
		let height = imgCount === 2 ? (248 / 2) : (248 / (imgCount - 1));

		return {
			width: (442 / (count - 1)),
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
			
			let firstImgSize: CSSProperties | null = null;
			if (index === 0 && imgCount > 2) {
				firstImgSize = {
					width: '100%',
					height: '100%'
				}
			}
			
			return (
				<img style={index === 0 && firstImgSize ? firstImgSize : size(imgCount)}
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