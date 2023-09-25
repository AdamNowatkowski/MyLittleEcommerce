import NextImage from "next/image";

export const CollectionCoverImage = ({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) => {
	return (
		<div className="">
			<NextImage
				width={480}
				height={320}
				alt={alt}
				src={src}
				className="h-full w-full rounded-md hover:scale-110"
			/>
		</div>
	);
};
