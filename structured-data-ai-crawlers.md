# Do AI crawlers use schema.org structured data (FAQPage)?

Research done on 2026-10-07 to check the claim "FAQPage should be included, because AI
crawlers use it" for the prompts in
`src/Components/ScrivitoExtensions/SchemaOrgActions.tsx`.

## Verdict

The claim is not supported. No AI vendor officially confirms that it uses FAQPage (or
JSON-LD in general) for its AI answers, and controlled studies found no measurable
effect. At best, an LLM that fetches a page live reads the JSON-LD as plain text, which
adds nothing beyond the visible FAQ text.

FAQPage is still kept in the prompts as a fitting schema.org type for question-and-answer
pages, but without claiming any benefit for Google or AI crawlers.

## Google FAQ rich results

- 2023-09-14: FAQ rich results restricted to "well-known, authoritative government and
  health websites" (announced in the
  [August 2023 blog post](https://developers.google.com/search/blog/2023/08/howto-faq-changes)).
- 2026-05-08: deprecation notice, "This feature will no longer appear in Google Search
  starting May 7, 2026."
- 2026-06-15: the [FAQPage documentation](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
  was removed, because "The FAQ rich result feature is no longer shown in Google Search
  results."

Source: [Search documentation changelog](https://developers.google.com/search/updates).

## Official vendor statements

- **Google (AI Overviews, AI Mode):** structured data is not required for AI features.
  [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
  (updated 2025-12-10): "There's also no special schema.org structured data that you need
  to add." The [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
  (updated 2026-07-10) recommends structured data only because "it helps with being
  eligible for rich results". FAQ is no longer a rich result.
- **Microsoft (Bing, Copilot):** the only "schema helps our LLMs" claim. Fabrice Canel
  reportedly said it at SMX Munich (March 2025). It is known only as David Mihm's
  paraphrase on LinkedIn, reported by
  [Search Engine Roundtable](https://www.seroundtable.com/schema-llms-copilot-bing-microsoft-39093.html)
  (2025-03-20). There is no Bing documentation and nothing specific to FAQPage. Mark
  Williams-Cook argues the remark was about IndexNow and content freshness.
- **OpenAI** ([bots](https://developers.openai.com/api/docs/bots)), **Perplexity**
  ([bots](https://docs.perplexity.ai/guides/bots)), **Anthropic**
  ([web fetch tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)):
  no mention of schema.org or JSON-LD. Anthropic's web fetch returns "full text content"
  and does not render JavaScript.
- **Apple:** the only documented JSON-LD use is the `isAccessibleForFree` property for
  paywalled content ([Applebot](https://support.apple.com/en-us/119829)). Nothing on
  FAQPage.

## Empirical studies

- [searchVIU](https://www.searchviu.com/en/schema-markup-and-ai-in-2025-what-chatgpt-claude-perplexity-gemini-really-see/)
  (2025-12-02): none of five AI systems returned a price that existed only in the JSON-LD.
  "Current AI chatbots do NOT use JSON-LD Schema Markup during direct retrieval."
- Mark Williams-Cook (2026-02,
  [reported by Search Engine Roundtable](https://www.seroundtable.com/chatgpt-perplexity-structured-data-text-40862.html);
  [follow-up](https://markwilliamscook.substack.com/p/schema-llms-and-the-low-bar-for-evidence),
  2026-05-28): ChatGPT and Perplexity did pick up an address that existed only in
  (deliberately invalid) JSON-LD, but treated it as "simply more text on the page".
  Unlike searchVIU, the data was read, but in both cases there is no semantic parsing of
  schema.org.
- [Ahrefs](https://ahrefs.com/blog/schema-ai-citations/) (2026-05-11): about 1,900 pages
  that added JSON-LD, compared with about 4,000 control pages. "Adding schema produced no
  major uplift in citations on any platform."
- [The GEO Lab](https://thegeolab.net/faq-retrieval-experiment/) (2026-05-13): the only
  FAQPage-specific test found, 480 queries on one small, new site. "FAQ schema does not
  improve AI retrieval rate."
- [CTAIO](https://ctaio.dev/en/labs/agentic-search/schema-citation-test/) (2026-05-15):
  planned test with a FAQPage variant, no results published yet.
- Training data: common extraction pipelines (e.g. trafilatura, used for FineWeb) drop
  `<script>` tags, so JSON-LD probably does not reach LLM training data. This is an
  inference, not confirmed by any vendor.

## Marketing claims

Figures like "3.2x more likely in AI Overviews" or "28–40% higher citation rates" come
from vendor blogs without a controlled method and are not considered evidence here.

## Caveats

The pages were found through Brave Search and read with a fetch tool that summarizes
pages, so quotes may differ slightly from the originals. Check them before citing
externally. The Search Engine Land article on the Bing statement could not be read (HTTP
403).
