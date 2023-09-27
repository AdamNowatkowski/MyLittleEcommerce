import NextImage from "next/image";

export const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="overflow-hidden rounded-md border bg-white">
			<NextImage
				width={320}
				height={320}
				alt={alt}
				src={src}
				className="h-full w-full object-contain object-center p-4 hover:scale-105"
			/>
		</div>
	);
};
