export const ProductCoverImage = ({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border bg-white">
			<img
				width={320}
				height={320}
				alt={alt}
				src={src}
				className="h-full w-full object-scale-down p-4 transition-transform hover:scale-105 bg-inherit"
			/>
		</div>
	);
};
