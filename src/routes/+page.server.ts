import { generateMarkdownPost } from "$lib/markdown";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const landingFile = Object.entries(
		import.meta.glob<{ default: string }>('../../.config/landing.md', {
			query: '?raw'
		})
	)[0][1];
    const content = (await landingFile()).default;
    const markdownPostData = await generateMarkdownPost(content);

    return {
        landing: {
            content: markdownPostData.md.toString()
        }
    }
}