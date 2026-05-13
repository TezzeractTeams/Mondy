import { Fragment } from "react";
import type { StrapiArticleSection } from "@/lib/strapi/types";
import { ArticleMarkdown } from "./ArticleMarkdown";
import { ArticleProse } from "./ArticleProse";

type StrapiArticleBodyProps = {
  introMarkdown?: string | null;
  sections: StrapiArticleSection[];
};

/** Renders intro + structured h2 / h3 sections from Strapi (`BlogArticlePageData`). */
export function StrapiArticleBody({ introMarkdown, sections }: StrapiArticleBodyProps) {
  return (
    <ArticleProse>
      {introMarkdown ? <ArticleMarkdown markdown={introMarkdown} /> : null}
      {sections.map((sec) => (
        <Fragment key={sec.h2Id}>
          <h2 id={sec.h2Id}>{sec.h2Title}</h2>
          {sec.h2IntroMarkdown ? <ArticleMarkdown markdown={sec.h2IntroMarkdown} /> : null}
          {sec.subsections.map((sub, i) => (
            <Fragment key={`${sec.h2Id}-${i}`}>
              {sub.h3Title ? <h3>{sub.h3Title}</h3> : null}
              <ArticleMarkdown markdown={sub.bodyMarkdown} />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </ArticleProse>
  );
}
