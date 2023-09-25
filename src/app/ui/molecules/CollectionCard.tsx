import Link from "next/link";
import { type Route } from "next";
import { CollectionCoverImage } from "@/app/ui/atoms/CollectionCoverImage";
import { type CollectionSingleFragment } from "@/gql/graphql";

type CollectionSingleFragmentProps = {
	collection: CollectionSingleFragment;
};

export const CollectionCard = ({
	collection,
}: CollectionSingleFragmentProps) => {
	return (
		<li>
			<Link href={`/collections/${collection.slug}` as Route}>
				<article>
					{collection.image.url && (
						<CollectionCoverImage
							src={`${collection.image.url}`}
							alt=""
						/>
					)}
					<h2 className="mt-3">{collection.name}</h2>
				</article>
			</Link>
		</li>
	);
};
