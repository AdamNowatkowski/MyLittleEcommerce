import { type MetadataRoute } from "next";

export default function Sitemap(): MetadataRoute.Sitemap {
    // const baseUrl = "http://localhost:3000";
    // const pagesDirectory = path.join(process.cwd(), "src", "app");
    // const pages = fs.readdirSync(pagesDirectory);
  
    // const websites = pages.map((page) => {
    //     const pagePath = path.join(pagesDirectory, page);
    //     const stats = fs.statSync(pagePath);
    //     const lastModified = stats.mtime.toISOString();
    //     const url = `${baseUrl}/${page.replace(/\.tsx?$/, "")}`;
    //     return { url, lastModified };
    //   });
    
    //   return websites;
    // }
    // dodać robot.txt
    // powinno się też tutaj dodać wszystkie podstrony bloga i wszystkie produkty które mają być indexowane przez SEO


	return [
		{
			url: "/",
			lastModified: new Date().toISOString(),
		},
	];
}