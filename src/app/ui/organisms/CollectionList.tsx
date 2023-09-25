import { CollectionCard } from "@/app/ui/molecules/CollectionCard";
import { type CollectionSingleFragment } from "@/gql/graphql";

export const CollectionList = ({
	collections,
}: {
	collections: CollectionSingleFragment[];
}) => {
	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<ul
				className="grid grid-cols-1 items-stretch gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
				data-testid="collections-list"
			>
				{collections.map((collection) => {
					return (
						<CollectionCard key={collection.id} collection={collection} />
					);
				})}
			</ul>
		</section>
	);
};
