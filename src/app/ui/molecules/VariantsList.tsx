import {getVariants} from "@/api/products";
import {Variants} from "@/app/ui/atoms/Variants";

export const VariantsList = async ({
	id,
}: {
	id: string;
}) => {
    const variants = await getVariants(id);
    return <Variants variants={variants} />
}

