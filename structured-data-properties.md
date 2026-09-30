# Google Search — Structured Data Types & Properties

Compiled from the [Search Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
and each linked type's own documentation page on Google Search Central (fetched 2026-09-30).

Property names use dot notation for nested objects (e.g. `address.streetAddress`). "Required"
means Google requires the property for the rich result to be eligible; "Recommended" means it
adds/improves eligibility, richness, or ranking of the result, but omitting it does not cause an
error. Each type includes a minimal JSON-LD example using only its required properties, and a
fuller example that adds the recommended properties.

---

## 1. Article

Source: [article](https://developers.google.com/search/docs/appearance/structured-data/article)

Covers `Article`, `NewsArticle`, and `BlogPosting` — all three share the same property table.

### `Article` / `NewsArticle` / `BlogPosting`

#### Required properties

None. Google's guidance: "add the properties that apply to your content."

#### Recommended properties

| Property        | Type                        | Description                                                                                                                                                     |
| --------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `author`        | Person or Organization      | The author of the article.                                                                                                                                      |
| `author.name`   | Text                        | The name of the author.                                                                                                                                         |
| `author.url`    | URL                         | A link uniquely identifying the author (social profile, bio, or "about me" page). `sameAs` can be used as an alternative.                                       |
| `dateModified`  | DateTime (ISO 8601)         | Date/time most recently modified.                                                                                                                               |
| `datePublished` | DateTime (ISO 8601)         | Date/time first published.                                                                                                                                      |
| `headline`      | Text                        | The title of the article; keep concise, as long titles may be truncated.                                                                                        |
| `image`         | Repeated ImageObject or URL | Image(s) representative of the article; crawlable, relevant, supported format; multiple resolutions/aspect ratios (16x9, 4x3, 1x1) recommended; min 50K pixels. |

**Example — required properties only:**

_No required properties — see recommended example below._

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Solar Panels Are Made",
  "author": {
    "@type": "Person",
    "name": "Jamie Rivera",
    "url": "https://example.com/authors/jamie-rivera"
  },
  "datePublished": "2026-01-15T08:00:00-05:00",
  "dateModified": "2026-01-20T10:30:00-05:00",
  "image": [
    "https://example.com/images/solar-panels-16x9.jpg",
    "https://example.com/images/solar-panels-4x3.jpg",
    "https://example.com/images/solar-panels-1x1.jpg"
  ]
}
```

---

## 2. Breadcrumb

Source: [breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

Only required properties are documented for this feature.

### `BreadcrumbList`

#### Required properties

| Property          | Type                | Description                                      |
| ----------------- | ------------------- | ------------------------------------------------ |
| `itemListElement` | ListItem (repeated) | The breadcrumbs, in order, each as a `ListItem`. |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Electronics",
      "item": "https://example.com/electronics/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cameras"
    }
  ]
}
```

**Example — with recommended properties:**

_No recommended properties are documented for `BreadcrumbList` — the example below simply shows a fuller breadcrumb trail using the same required properties._

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Electronics",
      "item": "https://example.com/electronics/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cameras",
      "item": "https://example.com/electronics/cameras/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Mirrorless Cameras"
    }
  ]
}
```

### `ListItem`

#### Required properties

| Property   | Type         | Description                                                                                                        |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `position` | Integer      | Position of the breadcrumb in the trail (1 = start).                                                               |
| `name`     | Text         | Title of the breadcrumb shown to the user. Not required if `item` is a `Thing` with its own `name`.                |
| `item`     | URL or Thing | URL of the page the breadcrumb represents. Not required for the last item (defaults to the containing page's URL). |

**Example — required properties only:**

```json
{
  "@type": "ListItem",
  "position": 2,
  "name": "Electronics",
  "item": "https://example.com/electronics/"
}
```

**Example — with recommended properties:**

_No recommended properties are documented for `ListItem` — shown below as it would appear as the final item in a trail, where `item` is omitted because it defaults to the current page URL._

```json
{
  "@type": "ListItem",
  "position": 3,
  "name": "Cameras"
}
```

---

## 3. Carousel

Source: [carousel](https://developers.google.com/search/docs/appearance/structured-data/carousel)

Only required properties documented. Differs for **summary pages** vs. **all-in-one pages**.

### `ItemList`

#### Required properties

| Property          | Type          | Description                                                                           |
| ----------------- | ------------- | ------------------------------------------------------------------------------------- |
| `itemListElement` | ListItem (2+) | List of items, all of the same supported type (Course, Movie, Recipe, or Restaurant). |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Recipe",
        "name": "Classic Tomato Soup",
        "url": "https://example.com/recipes/tomato-soup"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Recipe",
        "name": "Grilled Cheese Sandwich",
        "url": "https://example.com/recipes/grilled-cheese"
      }
    }
  ]
}
```

**Example — with recommended properties:**

_No recommended properties are documented for `ItemList` in the Carousel feature — the example below simply includes a third item to illustrate a more typical carousel size._

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Recipe",
        "name": "Classic Tomato Soup",
        "url": "https://example.com/recipes/tomato-soup"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Recipe",
        "name": "Grilled Cheese Sandwich",
        "url": "https://example.com/recipes/grilled-cheese"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Recipe",
        "name": "Roasted Vegetable Medley",
        "url": "https://example.com/recipes/roasted-vegetables"
      }
    }
  ]
}
```

### `ListItem` — summary pages

#### Required properties

| Property   | Type    | Description                                                          |
| ---------- | ------- | -------------------------------------------------------------------- |
| `position` | Integer | Item's position in the carousel (1-based).                           |
| `url`      | URL     | Canonical URL of the item's own detail page (same domain/subdomain). |

**Example — required properties only:**

```json
{
  "@type": "ListItem",
  "position": 1,
  "url": "https://example.com/recipes/tomato-soup"
}
```

**Example — with recommended properties:**

_No recommended properties are documented for this `ListItem` variant — shown below with two entries to illustrate ordering._

```json
[
  {
    "@type": "ListItem",
    "position": 1,
    "url": "https://example.com/recipes/tomato-soup"
  },
  {
    "@type": "ListItem",
    "position": 2,
    "url": "https://example.com/recipes/grilled-cheese"
  }
]
```

### `ListItem` — all-in-one pages

#### Required properties

| Property    | Type    | Description                                                                                        |
| ----------- | ------- | -------------------------------------------------------------------------------------------------- |
| `position`  | Integer | Item's position in the carousel (1-based).                                                         |
| `item`      | Thing   | The item itself, populated with `name`, `url`, plus whatever properties its content type requires. |
| `item.name` | Text    | Displayed carousel title.                                                                          |
| `item.url`  | URL     | Fully-qualified URL + anchor pointing at this item on the page.                                    |

**Example — required properties only:**

```json
{
  "@type": "ListItem",
  "position": 1,
  "item": {
    "@type": "Recipe",
    "name": "Classic Tomato Soup",
    "url": "https://example.com/recipes#tomato-soup"
  }
}
```

**Example — with recommended properties:**

_No recommended properties are documented for this `ListItem` variant — the example below shows a second entry with additional descriptive fields on the nested item for realism._

```json
{
  "@type": "ListItem",
  "position": 2,
  "item": {
    "@type": "Recipe",
    "name": "Grilled Cheese Sandwich",
    "url": "https://example.com/recipes#grilled-cheese",
    "description": "A quick, crispy sandwich made with melted cheddar.",
    "image": "https://example.com/images/grilled-cheese.jpg"
  }
}
```

---

## 4. Course list

Source: [course](https://developers.google.com/search/docs/appearance/structured-data/course)

Covers `Course` and `ItemList` (course list).

### `Course`

#### Required properties

| Property      | Type | Description                                             |
| ------------- | ---- | ------------------------------------------------------- |
| `name`        | Text | Title of the course.                                    |
| `description` | Text | Description of the course (60-character display limit). |

#### Recommended properties

| Property   | Type         | Description                                     |
| ---------- | ------------ | ----------------------------------------------- |
| `provider` | Organization | The organization publishing the course content. |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Introduction to Data Science",
  "description": "Learn the fundamentals of data analysis, statistics, and machine learning."
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Introduction to Data Science",
  "description": "Learn the fundamentals of data analysis, statistics, and machine learning.",
  "provider": {
    "@type": "Organization",
    "name": "Example Online Academy",
    "sameAs": "https://example.com"
  }
}
```

### `ItemList` (course list)

Added alongside `Course` properties for a list of 3+ courses.

#### Required properties

| Property                   | Type     | Description                             |
| -------------------------- | -------- | --------------------------------------- |
| `itemListElement`          | ListItem | Annotation for a single item page.      |
| `itemListElement.position` | Integer  | Ordinal position in the list.           |
| `itemListElement.url`      | URL      | Canonical, unique URL of the item page. |

#### Recommended properties

None documented.

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://example.com/courses/data-science-intro"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://example.com/courses/machine-learning-basics"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": "https://example.com/courses/python-for-analytics"
    }
  ]
}
```

**Example — with recommended properties:**

_No recommended properties are documented for `ItemList` here — the example below reuses the same required fields with a fuller, four-course list._

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://example.com/courses/data-science-intro"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://example.com/courses/machine-learning-basics"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": "https://example.com/courses/python-for-analytics"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "url": "https://example.com/courses/statistics-for-data-science"
    }
  ]
}
```

---

## 5. Dataset

Source: [dataset](https://developers.google.com/search/docs/appearance/structured-data/dataset)

Covers `Dataset`, `DataCatalog`, and `DataDownload`.

### `Dataset`

#### Required properties

| Property      | Type | Description                                           |
| ------------- | ---- | ----------------------------------------------------- |
| `name`        | Text | Descriptive name of the dataset.                      |
| `description` | Text | Short summary (50–5000 characters); Markdown allowed. |

#### Recommended properties

| Property               | Type                        | Description                                                                          |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------ |
| `alternateName`        | Text                        | Alternative names/aliases/abbreviations.                                             |
| `citation`             | Text or CreativeWork        | Related academic articles recommended for citation alongside the dataset.            |
| `creator`              | Person or Organization      | The dataset's creator/author (ORCID for people, ROR for institutions, via `sameAs`). |
| `funder`               | Person or Organization      | Financial supporter of the dataset.                                                  |
| `hasPart` / `isPartOf` | URL or Dataset              | Relationship to component sub-datasets or a larger parent dataset.                   |
| `identifier`           | URL, Text, or PropertyValue | e.g. a DOI.                                                                          |
| `isAccessibleForFree`  | Boolean                     | Whether the dataset is free to access.                                               |
| `keywords`             | Text                        | Keywords summarizing the dataset.                                                    |
| `license`              | URL or CreativeWork         | Distribution license, ideally version-specific.                                      |
| `measurementTechnique` | Text or URL                 | Methodology used to gather `variableMeasured`.                                       |
| `sameAs`               | URL                         | Page unambiguously identifying the dataset.                                          |
| `spatialCoverage`      | Text or Place               | Geographic dimension of the dataset.                                                 |
| `temporalCoverage`     | Text (ISO 8601)             | Time interval covered.                                                               |
| `variableMeasured`     | Text or PropertyValue       | Variable(s) measured.                                                                |
| `version`              | Text or Number              | Dataset version.                                                                     |
| `url`                  | URL                         | Page describing the dataset.                                                         |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Global Surface Temperature Anomalies",
  "description": "A collection of monthly surface temperature anomaly measurements from weather stations worldwide, spanning 1950-2025."
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Global Surface Temperature Anomalies",
  "description": "A collection of monthly surface temperature anomaly measurements from weather stations worldwide, spanning 1950-2025.",
  "url": "https://example.com/datasets/global-temp-anomalies",
  "identifier": "https://doi.org/10.1234/example.dataset.001",
  "keywords": ["climate", "temperature", "weather stations", "anomaly"],
  "creator": {
    "@type": "Organization",
    "name": "Example Climate Research Institute",
    "sameAs": "https://ror.org/0123456789"
  },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "isAccessibleForFree": true,
  "temporalCoverage": "1950-01/2025-12",
  "spatialCoverage": "Earth",
  "variableMeasured": "Monthly mean surface temperature anomaly (°C)"
}
```

### `DataCatalog`

#### Required properties

None documented.

#### Recommended properties

| Property                | Type        | Description                         |
| ----------------------- | ----------- | ----------------------------------- |
| `includedInDataCatalog` | DataCatalog | The catalog the dataset belongs to. |

**Example — required properties only:**

_No required properties — see recommended example below._

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Global Surface Temperature Anomalies",
  "includedInDataCatalog": {
    "@type": "DataCatalog",
    "name": "Example Open Climate Data Catalog",
    "url": "https://example.com/catalog/climate-data"
  }
}
```

### `DataDownload`

For datasets offering downloads, via `distribution`.

#### Required properties

| Property                  | Type | Description        |
| ------------------------- | ---- | ------------------ |
| `distribution.contentUrl` | URL  | The download link. |

#### Recommended properties

| Property                      | Type         | Description                                               |
| ----------------------------- | ------------ | --------------------------------------------------------- |
| `distribution`                | DataDownload | Location/format for downloading the dataset (repeatable). |
| `distribution.encodingFormat` | Text or URL  | File format of the distribution.                          |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Global Surface Temperature Anomalies",
  "distribution": {
    "@type": "DataDownload",
    "contentUrl": "https://example.com/datasets/global-temp-anomalies.csv"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Global Surface Temperature Anomalies",
  "distribution": [
    {
      "@type": "DataDownload",
      "contentUrl": "https://example.com/datasets/global-temp-anomalies.csv",
      "encodingFormat": "text/csv"
    },
    {
      "@type": "DataDownload",
      "contentUrl": "https://example.com/datasets/global-temp-anomalies.json",
      "encodingFormat": "application/json"
    }
  ]
}
```

---

## 6. Discussion forum

Source: [discussion-forum](https://developers.google.com/search/docs/appearance/structured-data/discussion-forum)

Covers `DiscussionForumPosting` (or equivalently `SocialMediaPosting`), nested `Comment`, and `InteractionCounter`.

### `DiscussionForumPosting` (or `SocialMediaPosting`)

#### Required properties

| Property                                            | Type                             | Description                                                                    |
| --------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `author`                                            | Person or Organization           | The post's author.                                                             |
| `author.name`                                       | Text                             | Name of the author.                                                            |
| `datePublished`                                     | DateTime (ISO 8601)              | Date/time the post was made.                                                   |
| `text` **or** `image` **or** `video` (at least one) | Text / ImageObject / VideoObject | Represents the post's content. Not required if the post lives on another page. |

#### Recommended properties

| Property               | Type                                                                   | Description                                                                                   |
| ---------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `author.url`           | URL                                                                    | Link uniquely identifying the author, typically a profile page.                               |
| `comment`              | Comment                                                                | A response to the post, in page order.                                                        |
| `commentCount`         | Integer                                                                | Number of comments, if not all are shown.                                                     |
| `creativeWorkStatus`   | Text                                                                   | Set to `"Deleted"` if the post was removed but kept for context.                              |
| `dateModified`         | DateTime (ISO 8601)                                                    | Edit date/time.                                                                               |
| `digitalSourceType`    | IPTCDigitalSourceEnumeration                                           | `TrainedAlgorithmicMediaDigitalSource` or `AlgorithmicMediaDigitalSource` for AI/bot content. |
| `headline`             | Text                                                                   | Title of the post; not recommended for `SocialMediaPosting`.                                  |
| `image`                | ImageObject or URL                                                     | Inline images (exclude icons/avatars).                                                        |
| `interactionStatistic` | InteractionCounter                                                     | Interaction stats on the post.                                                                |
| `isPartOf`             | CreativeWork or URL                                                    | The subforum/group the post belongs to.                                                       |
| `sharedContent`        | WebPage / ImageObject / VideoObject / DiscussionForumPosting / Comment | Primary content shared by the post.                                                           |
| `text`                 | Text                                                                   | Any text in the post.                                                                         |
| `url`                  | URL                                                                    | Canonical URL of the discussion (first page for multi-page threads).                          |
| `video`                | VideoObject                                                            | Inline videos.                                                                                |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "DiscussionForumPosting",
  "author": {
    "@type": "Person",
    "name": "Jane Doe"
  },
  "datePublished": "2024-05-01T10:15:00-07:00",
  "text": "Has anyone else run into this issue with the new firmware update?"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "DiscussionForumPosting",
  "headline": "Firmware update causing Wi-Fi drops?",
  "author": {
    "@type": "Person",
    "name": "Jane Doe",
    "url": "https://example.com/users/janedoe"
  },
  "datePublished": "2024-05-01T10:15:00-07:00",
  "dateModified": "2024-05-01T11:00:00-07:00",
  "text": "Has anyone else run into this issue with the new firmware update?",
  "url": "https://example.com/forum/thread/12345",
  "isPartOf": {
    "@type": "CreativeWork",
    "name": "Networking Support"
  },
  "commentCount": 2,
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/LikeAction",
    "userInteractionCount": 14
  },
  "comment": [
    {
      "@type": "Comment",
      "author": { "@type": "Person", "name": "John Smith" },
      "datePublished": "2024-05-01T12:00:00-07:00",
      "text": "Yes, rolling back fixed it for me."
    }
  ]
}
```

### `Comment`

#### Required properties

| Property                                            | Type                             | Description                       |
| --------------------------------------------------- | -------------------------------- | --------------------------------- |
| `author`                                            | Person or Organization           | The comment's author.             |
| `datePublished`                                     | DateTime (ISO 8601)              | Date/time the comment was made.   |
| `text` **or** `image` **or** `video` (at least one) | Text / ImageObject / VideoObject | Represents the comment's content. |

#### Recommended properties

| Property               | Type                         | Description                                    |
| ---------------------- | ---------------------------- | ---------------------------------------------- |
| `author.url`           | URL                          | Link to the author's identifying page.         |
| `comment`              | Comment                      | A nested reply, in page order.                 |
| `commentCount`         | Integer                      | Number of replies.                             |
| `creativeWorkStatus`   | Text                         | `"Deleted"` if removed but kept for threading. |
| `dateModified`         | DateTime (ISO 8601)          | Last edit date/time.                           |
| `digitalSourceType`    | IPTCDigitalSourceEnumeration | Same values as above.                          |
| `image`                | ImageObject or URL           | Inline images.                                 |
| `interactionStatistic` | InteractionCounter           | Interaction stats on the comment.              |
| `sharedContent`        | Same four types as above     | Primary content shared by the comment.         |
| `url`                  | URL                          | URL of this specific comment.                  |
| `video`                | VideoObject                  | Inline videos.                                 |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Comment",
  "author": {
    "@type": "Person",
    "name": "John Smith"
  },
  "datePublished": "2024-05-01T12:00:00-07:00",
  "text": "Yes, rolling back fixed it for me."
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Comment",
  "author": {
    "@type": "Person",
    "name": "John Smith",
    "url": "https://example.com/users/johnsmith"
  },
  "datePublished": "2024-05-01T12:00:00-07:00",
  "dateModified": "2024-05-01T12:05:00-07:00",
  "text": "Yes, rolling back fixed it for me.",
  "url": "https://example.com/forum/thread/12345#comment-1",
  "commentCount": 1,
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/LikeAction",
    "userInteractionCount": 3
  },
  "comment": {
    "@type": "Comment",
    "author": { "@type": "Person", "name": "Jane Doe" },
    "datePublished": "2024-05-01T12:30:00-07:00",
    "text": "Thanks, that worked!"
  }
}
```

### `InteractionCounter`

#### Required properties

| Property               | Type              | Description                                                                                   |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| `userInteractionCount` | Integer           | Number of times the interaction occurred.                                                     |
| `interactionType`      | Subtype of Action | `LikeAction`, `DislikeAction`, `ViewAction`, `CommentAction`/`ReplyAction`, or `ShareAction`. |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "InteractionCounter",
  "interactionType": "https://schema.org/CommentAction",
  "userInteractionCount": 8
}
```

**Example — with recommended properties:**

_No recommended properties documented for `InteractionCounter` — see required example above._

---

## 7. Education Q&A

Source: [education-qa](https://developers.google.com/search/docs/appearance/structured-data/education-qa)

Despite the URL, this page documents `Quiz` and a flashcard-specific `Question`/`Answer` — not the generic `QAPage` type.

### `Quiz`

#### Required properties

| Property  | Type                | Description                                   |
| --------- | ------------------- | --------------------------------------------- |
| `hasPart` | Question (repeated) | One nested flashcard question per repetition. |

#### Recommended properties

| Property                             | Type            | Description                                                     |
| ------------------------------------ | --------------- | --------------------------------------------------------------- |
| `about`                              | Thing           | The underlying concept behind the quiz.                         |
| `about.name`                         | Text            | Name of the concept (e.g. "Cell transport").                    |
| `educationalAlignment`               | AlignmentObject | Links the quiz to an educational framework.                     |
| `educationalAlignment.alignmentType` | Text            | `educationalSubject` or `educationalLevel`.                     |
| `educationalAlignment.targetName`    | Text            | Specific node in the framework, e.g. "Grade 7: Cell Structure". |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Quiz",
  "hasPart": [
    {
      "@type": "Question",
      "text": "What is the powerhouse of the cell?",
      "eduQuestionType": "Flashcard",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The mitochondrion."
      }
    }
  ]
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Quiz",
  "about": {
    "@type": "Thing",
    "name": "Cell transport"
  },
  "educationalAlignment": {
    "@type": "AlignmentObject",
    "alignmentType": "educationalLevel",
    "targetName": "Grade 7: Cell Structure"
  },
  "hasPart": [
    {
      "@type": "Question",
      "text": "What is the powerhouse of the cell?",
      "eduQuestionType": "Flashcard",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The mitochondrion."
      }
    },
    {
      "@type": "Question",
      "text": "What organelle controls the cell?",
      "eduQuestionType": "Flashcard",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The nucleus."
      }
    }
  ]
}
```

### `Question` (flashcard-specific)

#### Required properties

| Property          | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| `text`            | Text   | Full flashcard question text.         |
| `acceptedAnswer`  | Answer | The single answer (only one allowed). |
| `eduQuestionType` | Text   | Fixed value `"Flashcard"`.            |

#### Recommended properties

None documented.

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Question",
  "text": "What is the powerhouse of the cell?",
  "eduQuestionType": "Flashcard",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "The mitochondrion."
  }
}
```

**Example — with recommended properties:**

_No recommended properties documented — see required example above._

---

## 8. Employer aggregate rating

Source: [employer-rating](https://developers.google.com/search/docs/appearance/structured-data/employer-rating)

### `EmployerAggregateRating`

#### Required properties

| Property                                          | Type           | Description                         |
| ------------------------------------------------- | -------------- | ----------------------------------- |
| `itemReviewed`                                    | Organization   | The company being rated.            |
| `ratingValue`                                     | Number or Text | Average rating (default scale 1–5). |
| `ratingCount` **or** `reviewCount` (at least one) | Number         | Total ratings and/or total reviews. |

#### Recommended properties

| Property      | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| `bestRating`  | Number | Top of the rating scale (default 5).    |
| `worstRating` | Number | Bottom of the rating scale (default 1). |

_Note: `itemReviewed.name` and `itemReviewed.sameAs` appear only in Google's example code, not in a formal property table._

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "EmployerAggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Example Corp"
  },
  "ratingValue": "4.2",
  "reviewCount": "150"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "EmployerAggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Example Corp",
    "sameAs": "https://www.example.com"
  },
  "ratingValue": "4.2",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "150",
  "reviewCount": "120"
}
```

---

## 9. Event

Source: [event](https://developers.google.com/search/docs/appearance/structured-data/event)

### `Event`

#### Required properties

| Property           | Type                | Description                                 |
| ------------------ | ------------------- | ------------------------------------------- |
| `name`             | Text                | Full title of the event.                    |
| `startDate`        | DateTime (ISO 8601) | Start date and time.                        |
| `location`         | Place               | The event's venue.                          |
| `location.address` | PostalAddress       | Full, detailed street address of the venue. |

#### Recommended properties

| Property               | Type                          | Description                                                                          |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `description`          | Text                          | Summary of the event.                                                                |
| `endDate`              | DateTime (ISO 8601)           | End date and time.                                                                   |
| `eventStatus`          | EventStatusType               | Scheduled, cancelled, postponed, or rescheduled.                                     |
| `image`                | ImageObject or URL (repeated) | Image(s) of the event; ≥720px wide, 1920px recommended.                              |
| `location.name`        | Text                          | Name of the venue.                                                                   |
| `offers`               | Offer                         | One per ticket type.                                                                 |
| `offers.price`         | Number                        | Lowest ticket price incl. fees.                                                      |
| `offers.priceCurrency` | Text (ISO 4217)               | Currency code.                                                                       |
| `offers.availability`  | Text                          | `InStock`, `SoldOut`, or `PreOrder`.                                                 |
| `offers.validFrom`     | DateTime (ISO 8601)           | When tickets go on sale.                                                             |
| `offers.url`           | URL                           | Purchase page.                                                                       |
| `organizer`            | Organization or Person        | Host of the event.                                                                   |
| `organizer.name`       | Text                          | Name of the host.                                                                    |
| `organizer.url`        | URL                           | Host's domain.                                                                       |
| `performer`            | Person                        | Performing artist/group.                                                             |
| `performer.name`       | Text                          | Name of the performer.                                                               |
| `previousStartDate`    | DateTime (ISO 8601)           | Prior start date; only when rescheduled (pair with `eventStatus: EventRescheduled`). |

_Note: this page does not document separate `AggregateOffer` or `VirtualLocation` tables._

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Annual Tech Conference 2024",
  "startDate": "2024-11-05T09:00:00-05:00",
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Springfield",
      "addressRegion": "IL",
      "postalCode": "62704",
      "addressCountry": "US"
    }
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Annual Tech Conference 2024",
  "description": "A gathering of developers and industry leaders to discuss the latest in technology.",
  "startDate": "2024-11-05T09:00:00-05:00",
  "endDate": "2024-11-06T17:00:00-05:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "image": [
    "https://example.com/events/tech-conf-2024-1x1.jpg",
    "https://example.com/events/tech-conf-2024-16x9.jpg"
  ],
  "location": {
    "@type": "Place",
    "name": "Springfield Convention Center",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Springfield",
      "addressRegion": "IL",
      "postalCode": "62704",
      "addressCountry": "US"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "199.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-08-01T00:00:00-05:00",
    "url": "https://example.com/events/tech-conf-2024/tickets"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Example Events Inc.",
    "url": "https://example.com"
  },
  "performer": {
    "@type": "Person",
    "name": "Alex Rivera"
  }
}
```

---

## 10. Image metadata

Source: [image-license-metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)

### `ImageObject`

#### Required properties

| Property                                                     | Type | Description                                                              |
| ------------------------------------------------------------ | ---- | ------------------------------------------------------------------------ |
| `contentUrl`                                                 | URL  | URL to the actual image content.                                         |
| One of `creator`, `creditText`, `copyrightNotice`, `license` | —    | At least one required; once present, the other three become Recommended. |

#### Recommended properties

| Property             | Type                   | Description                                              |
| -------------------- | ---------------------- | -------------------------------------------------------- |
| `creator`            | Organization or Person | Creator of the image (e.g. photographer).                |
| `creator.name`       | Text                   | Name of the creator.                                     |
| `creditText`         | Text                   | Credited person/organization on publication.             |
| `copyrightNotice`    | Text                   | Copyright owner claim.                                   |
| `license`            | URL                    | Usage-terms page; **required for the Licensable badge**. |
| `acquireLicensePage` | URL                    | Page describing how to license the image.                |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://example.com/images/photo-001.jpg",
  "license": "https://example.com/licenses/photo-usage-terms"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://example.com/images/photo-001.jpg",
  "creator": {
    "@type": "Person",
    "name": "Alex Rivera"
  },
  "creditText": "Alex Rivera / Example Media",
  "copyrightNotice": "© 2024 Example Media",
  "license": "https://example.com/licenses/photo-usage-terms",
  "acquireLicensePage": "https://example.com/licenses/how-to-license"
}
```

---

## 11. Job posting

Source: [job-posting](https://developers.google.com/search/docs/appearance/structured-data/job-posting)

### `JobPosting`

#### Required properties

| Property             | Type            | Description                                                                                                                               |
| -------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `title`              | Text            | Job title only — not codes/dates/salary/company.                                                                                          |
| `description`        | Text (HTML)     | Full job description; must not duplicate `title`. Supports `<p>`, `<ul>`, `<li>`.                                                         |
| `datePosted`         | Date (ISO 8601) | Date the employer posted the job.                                                                                                         |
| `hiringOrganization` | Organization    | The company offering the job; use `"confidential"` if anonymous.                                                                          |
| `jobLocation`        | Place           | Physical work location(s); requires `addressCountry`. Required unless fully remote with `applicantLocationRequirements` supplied instead. |

#### Recommended properties

| Property                        | Type                                       | Description                                                                                                                  |
| ------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `applicantLocationRequirements` | AdministrativeArea                         | Eligible locations for a work-from-home job; required in place of `jobLocation` for 100% remote jobs restricted by location. |
| `baseSalary`                    | MonetaryAmount                             | Actual (not estimated) base salary.                                                                                          |
| `directApply`                   | Boolean                                    | Whether the linked URL supports direct application.                                                                          |
| `educationRequirements` (beta)  | EducationalOccupationalCredential or Text  | Educational background needed.                                                                                               |
| `experienceRequirements` (beta) | OccupationalExperienceRequirements or Text | Experience required.                                                                                                         |
| `experienceInPlaceOfEducation`  | Boolean                                    | Whether experience can substitute for education; if `true`, both requirement properties must be set.                         |
| `employmentType`                | Text (enum, repeatable)                    | `FULL_TIME`, `PART_TIME`, `CONTRACTOR`, `TEMPORARY`, `INTERN`, `VOLUNTEER`, `PER_DIEM`, `OTHER`.                             |
| `identifier`                    | PropertyValue                              | Hiring organization's unique job identifier.                                                                                 |
| `jobLocationType`               | Text                                       | `TELECOMMUTE`; required for 100%-remote jobs.                                                                                |
| `validThrough`                  | DateTime (ISO 8601)                        | Job posting expiration date; required if one exists.                                                                         |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Software Engineer",
  "description": "<p>We are looking for a Software Engineer to join our growing engineering team.</p>",
  "datePosted": "2026-09-01",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Example Tech Inc."
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Software Engineer",
  "description": "<p>We are looking for a Software Engineer to join our growing engineering team. Responsibilities include:</p><ul><li>Building new features</li><li>Reviewing code</li></ul>",
  "datePosted": "2026-09-01",
  "validThrough": "2026-12-01T00:00:00Z",
  "employmentType": ["FULL_TIME"],
  "identifier": {
    "@type": "PropertyValue",
    "name": "Example Tech Inc.",
    "value": "JOB-1234"
  },
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Example Tech Inc.",
    "sameAs": "https://www.example.com",
    "logo": "https://www.example.com/logo.png"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St",
      "addressLocality": "Springfield",
      "addressRegion": "IL",
      "postalCode": "62701",
      "addressCountry": "US"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 90000,
      "maxValue": 120000,
      "unitText": "YEAR"
    }
  }
}
```

### `hiringOrganization` (nested Organization)

| Property                    | Req/Rec                 | Type | Description                                   |
| --------------------------- | ----------------------- | ---- | --------------------------------------------- |
| `hiringOrganization.name`   | Required                | Text | Company name (`"confidential"` if anonymous). |
| `hiringOrganization.sameAs` | Example only            | URL  | Organization's website.                       |
| `hiringOrganization.logo`   | For 3rd-party job sites | URL  | Logo; aspect ratio 0.75–2.5.                  |

### `jobLocation.address` (nested PostalAddress)

| Property                              | Req/Rec     | Type | Description   |
| ------------------------------------- | ----------- | ---- | ------------- |
| `jobLocation.address.addressCountry`  | Required    | Text | Country.      |
| `jobLocation.address.streetAddress`   | Recommended | Text | Street.       |
| `jobLocation.address.addressLocality` | Recommended | Text | City.         |
| `jobLocation.address.addressRegion`   | Recommended | Text | Region/state. |
| `jobLocation.address.postalCode`      | Recommended | Text | Postal code.  |

### `baseSalary` (nested MonetaryAmount)

| Property                                  | Req/Rec                      | Type              | Description                             |
| ----------------------------------------- | ---------------------------- | ----------------- | --------------------------------------- |
| `baseSalary.currency`                     | Required within `baseSalary` | Text              | e.g. `"USD"`.                           |
| `baseSalary.value`                        | Required within `baseSalary` | QuantitativeValue | Salary value(s) + unit.                 |
| `baseSalary.value.value`                  | —                            | Number            | Single figure.                          |
| `baseSalary.value.minValue` / `.maxValue` | —                            | Number            | Salary range.                           |
| `baseSalary.value.unitText`               | Required within `.value`     | Text (enum)       | `HOUR`, `DAY`, `WEEK`, `MONTH`, `YEAR`. |

### Other nested objects

| Object                          | Property                              | Type        | Description                                                                                              |
| ------------------------------- | ------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `identifier` (PropertyValue)    | `identifier.name`, `identifier.value` | Text        | Organization name + unique job ID.                                                                       |
| `applicantLocationRequirements` | `.name`                               | Text        | Country/state/region name, e.g. `"USA"`.                                                                 |
| `educationRequirements`         | `.credentialCategory`                 | Text (enum) | `high school`, `associate degree`, `bachelor degree`, `professional certificate`, `postgraduate degree`. |
| `experienceRequirements`        | `.monthsOfExperience`                 | Number      | Minimum months of experience.                                                                            |

---

## 12. Local business

Source: [local-business](https://developers.google.com/search/docs/appearance/structured-data/local-business)

### `LocalBusiness`

#### Required properties

| Property  | Type          | Description                                                |
| --------- | ------------- | ---------------------------------------------------------- |
| `name`    | Text          | Business name.                                             |
| `address` | PostalAddress | Physical location; include as many sub-fields as possible. |

#### Recommended properties

| Property                    | Type                      | Description                                            |
| --------------------------- | ------------------------- | ------------------------------------------------------ |
| `aggregateRating`           | AggregateRating           | Only for sites reviewing other local businesses.       |
| `department`                | LocalBusiness (nested)    | A single department, reusing this same property table. |
| `geo`                       | GeoCoordinates            | Business coordinates.                                  |
| `menu`                      | URL                       | Menu URL (food establishments).                        |
| `openingHoursSpecification` | OpeningHoursSpecification | Business hours.                                        |
| `priceRange`                | Text                      | e.g. `"$10-15"` or `"$$$"` (under 100 chars).          |
| `review`                    | Review                    | Only for sites reviewing other local businesses.       |
| `servesCuisine`             | Text                      | Cuisine type (restaurants).                            |
| `telephone`                 | Text                      | Primary contact number with country/area code.         |
| `url`                       | URL                       | Working location URL.                                  |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Example Hardware Store",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "456 Market St",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Example Hardware Store",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "456 Market St",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.78373,
    "longitude": -89.65039
  },
  "url": "https://www.example.com",
  "telephone": "+1-217-555-0100",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00:00",
      "closes": "18:00:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00:00",
      "closes": "14:00:00"
    }
  ]
}
```

### `geo` (nested GeoCoordinates)

| Property                         | Type   | Description                  |
| -------------------------------- | ------ | ---------------------------- |
| `geo.latitude` / `geo.longitude` | Number | ≥5 decimal places precision. |

### `openingHoursSpecification` (nested)

| Property                                                | Type      | Description                       |
| ------------------------------------------------------- | --------- | --------------------------------- |
| `openingHoursSpecification.dayOfWeek`                   | DayOfWeek | Full URL or short name.           |
| `openingHoursSpecification.opens` / `.closes`           | Time      | `hh:mm:ss`.                       |
| `openingHoursSpecification.validFrom` / `.validThrough` | Date      | `YYYY-MM-DD`, for seasonal hours. |

### Restaurant carousel (limited-access feature)

#### Required properties

| Property | Type                          | Description                                                        |
| -------- | ----------------------------- | ------------------------------------------------------------------ |
| `name`   | Text                          | Restaurant name.                                                   |
| `image`  | URL or ImageObject (repeated) | Restaurant image(s); crawlable, high-res 16x9/4x3/1x1 recommended. |

#### Recommended properties

| Property        | Type          | Description             |
| --------------- | ------------- | ----------------------- |
| `address`       | PostalAddress | Same guidance as above. |
| `servesCuisine` | Text          | Cuisine type.           |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Example Bistro",
  "image": "https://www.example.com/images/example-bistro.jpg"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Example Bistro",
  "image": "https://www.example.com/images/example-bistro.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "789 Elm St",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  },
  "servesCuisine": "Italian"
}
```

---

## 13. Math solver

Source: [math-solvers](https://developers.google.com/search/docs/appearance/structured-data/math-solvers)

### `MathSolver`

#### Required properties

| Property                               | Type            | Description                                                             |
| -------------------------------------- | --------------- | ----------------------------------------------------------------------- |
| `url`                                  | URL             | URL of the `MathSolver`.                                                |
| `usageInfo`                            | URL             | Privacy policy of the solver site.                                      |
| `potentialAction`                      | SolveMathAction | The solving/simplifying/graphing action.                                |
| `potentialAction.target`               | EntryPoint      | URL target entry point, accepting the expression.                       |
| `potentialAction.mathExpression-input` | Text            | Placeholder for the math expression (LaTeX/AsciiMath) sent to the site. |

#### Recommended properties

| Property                          | Type | Description                                |
| --------------------------------- | ---- | ------------------------------------------ |
| `inLanguage`                      | Text | Supported language(s).                     |
| `assesses`                        | Text | Problem type(s) solved via `HowTo` markup. |
| `potentialAction.eduQuestionType` | Text | Problem type(s) solvable by the target.    |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "MathSolver",
  "url": "https://www.example.com/math-solver",
  "usageInfo": "https://www.example.com/privacy",
  "potentialAction": {
    "@type": "SolveMathAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.example.com/solve?expression={math_expression}"
    },
    "mathExpression-input": "required name=math_expression"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "MathSolver",
  "url": "https://www.example.com/math-solver",
  "usageInfo": "https://www.example.com/privacy",
  "inLanguage": "en",
  "assesses": "Quadratic equations",
  "potentialAction": {
    "@type": "SolveMathAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.example.com/solve?expression={math_expression}"
    },
    "mathExpression-input": "required name=math_expression",
    "eduQuestionType": ["Quadratic equation", "Simplification"]
  }
}
```

### `LearningResource`

#### Required properties

| Property               | Type | Description                 |
| ---------------------- | ---- | --------------------------- |
| `learningResourceType` | Text | Fixed value: `Math Solver`. |

#### Recommended properties

None documented.

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "learningResourceType": "Math Solver"
}
```

**Example — with recommended properties:**

_No recommended properties documented — see required example above._

---

## 14. Movie

Source: [movie](https://developers.google.com/search/docs/appearance/structured-data/movie)

### `Movie`

#### Required properties

| Property | Type               | Description                                                             |
| -------- | ------------------ | ----------------------------------------------------------------------- |
| `name`   | Text               | Movie title.                                                            |
| `image`  | URL or ImageObject | Representative image; `.jpg`/`.png`/`.gif`, high-res, 6:9 aspect ratio. |

#### Recommended properties

| Property          | Type             | Description                             |
| ----------------- | ---------------- | --------------------------------------- |
| `dateCreated`     | Date or DateTime | Release date.                           |
| `director`        | Person           | The director.                           |
| `aggregateRating` | AggregateRating  | Follow Review snippet guidelines (§20). |
| `review`          | Review           | Follow Review snippet guidelines (§20). |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": "The Example Adventure",
  "image": "https://www.example.com/images/example-adventure.jpg"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": "The Example Adventure",
  "image": "https://www.example.com/images/example-adventure.jpg",
  "dateCreated": "2026-06-15",
  "director": {
    "@type": "Person",
    "name": "Jordan Example"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "128"
  },
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "Sam Reviewer"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5"
    }
  }
}
```

---

## 15. Organization

Source: [organization](https://developers.google.com/search/docs/appearance/structured-data/organization)

### `Organization`

#### Required properties

None — Google recommends adding as many relevant properties as possible.

#### Recommended properties

| Property                  | Type                            | Description                                             |
| ------------------------- | ------------------------------- | ------------------------------------------------------- |
| `name`                    | Text                            | Same as the site name.                                  |
| `alternateName`           | Text                            | Another common name.                                    |
| `legalName`               | Text                            | Registered legal name, if different from `name`.        |
| `url`                     | URL                             | Helps uniquely identify the organization.               |
| `logo`                    | URL or ImageObject              | ≥112×112px, crawlable, supported format.                |
| `address`                 | PostalAddress (repeatable)      | Physical/mailing address.                               |
| `contactPoint`            | ContactPoint                    | Best way to contact the business.                       |
| `description`             | Text                            | Detailed description.                                   |
| `email`                   | Text                            | Contact email.                                          |
| `telephone`               | Text                            | Primary contact number, with country code.              |
| `foundingDate`            | Date (ISO 8601)                 | Date founded.                                           |
| `sameAs`                  | URL (repeatable)                | Pages elsewhere confirming the organization's identity. |
| `numberOfEmployees`       | QuantitativeValue               | Employee count.                                         |
| `duns`                    | Text                            | DUNS number (prefer `iso6523Code`).                     |
| `globalLocationNumber`    | Text                            | GS1 GLN.                                                |
| `iso6523Code`             | Text                            | ICD + identifier.                                       |
| `leiCode`                 | Text                            | ISO 17442 identifier (prefer `iso6523Code`).            |
| `naics`                   | Text                            | NAICS code.                                             |
| `taxID`                   | Text                            | Must match the country in `address`.                    |
| `vatID`                   | Text                            | VAT identifier.                                         |
| `hasMerchantReturnPolicy` | MerchantReturnPolicy (repeated) | See §16.5.                                              |
| `hasMemberProgram`        | MemberProgram (repeated)        | See §16.4.                                              |
| `hasShippingService`      | ShippingService (repeated)      | See §16.6.                                              |

**Example — required properties only:**

_No required properties — see recommended example below._

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example Corp",
  "alternateName": "ExampleCo",
  "legalName": "Example Corporation Inc.",
  "url": "https://www.example.com",
  "logo": "https://www.example.com/logo.png",
  "description": "Example Corp provides example widgets and services.",
  "foundingDate": "2005-03-01",
  "email": "info@example.com",
  "telephone": "+1-217-555-0100",
  "sameAs": [
    "https://www.linkedin.com/company/example-corp",
    "https://www.twitter.com/examplecorp"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Corporate Way",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@example.com",
    "telephone": "+1-217-555-0199"
  }
}
```

### `address` (nested PostalAddress)

| Property                  | Type | Description              |
| ------------------------- | ---- | ------------------------ |
| `address.streetAddress`   | Text | Street.                  |
| `address.addressLocality` | Text | City.                    |
| `address.addressRegion`   | Text | Region/state.            |
| `address.postalCode`      | Text | Postal code.             |
| `address.addressCountry`  | Text | ISO 3166-1 alpha-2 code. |

### `contactPoint` (nested ContactPoint)

| Property                 | Type | Description                |
| ------------------------ | ---- | -------------------------- |
| `contactPoint.email`     | Text | Contact email.             |
| `contactPoint.telephone` | Text | Include country/area code. |

---

## 16. Product

Source: [product](https://developers.google.com/search/docs/appearance/structured-data/product) and sub-pages ([product-snippet](https://developers.google.com/search/docs/appearance/structured-data/product-snippet), [merchant-listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), [product-variants](https://developers.google.com/search/docs/appearance/structured-data/product-variants), [loyalty-program](https://developers.google.com/search/docs/appearance/structured-data/loyalty-program), [return-policy](https://developers.google.com/search/docs/appearance/structured-data/return-policy), [shipping-policy](https://developers.google.com/search/docs/appearance/structured-data/shipping-policy))

### 16.1 Product snippet

#### `Product`

##### Required properties

| Property                                              | Type | Description                       |
| ----------------------------------------------------- | ---- | --------------------------------- |
| `name`                                                | Text | Product name.                     |
| At least one of `review`, `aggregateRating`, `offers` | —    | Required for snippet eligibility. |

##### Recommended properties

| Property          | Type                    | Description                                                    |
| ----------------- | ----------------------- | -------------------------------------------------------------- |
| `aggregateRating` | AggregateRating         | Follow §16.7 (Review snippet, §20).                            |
| `offers`          | Offer or AggregateOffer | Use `Offer` (not `AggregateOffer`) for price-drop eligibility. |
| `review`          | Review                  | Reviewer name must be a valid Person/Team name.                |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Alpine Trail Running Shoe",
  "offers": {
    "@type": "Offer",
    "price": 129.99,
    "priceCurrency": "USD"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Alpine Trail Running Shoe",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "89"
  },
  "offers": {
    "@type": "Offer",
    "price": 129.99,
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31"
  },
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "Jamie Rivera"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    }
  }
}
```

#### `Review` pros/cons additions

##### Required properties

| Property                               | Type     | Description                                            |
| -------------------------------------- | -------- | ------------------------------------------------------ |
| `positiveNotes` and/or `negativeNotes` | ItemList | ≥2 statements combined across both, to show pros/cons. |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "positiveNotes": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "name": "Excellent grip on wet trails" },
      { "@type": "ListItem", "name": "Very lightweight" }
    ]
  },
  "negativeNotes": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "name": "Runs half a size small" }
    ]
  }
}
```

_No recommended properties documented separately for this addition; see `ItemList` below for adding ordering via `position`._

#### `ItemList` (for pros/cons)

##### Required properties

| Property               | Type     | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| `itemListElement`      | ListItem | Statements about the product, in order. |
| `itemListElement.name` | Text     | The key statement.                      |

##### Recommended properties

| Property                   | Type    | Description           |
| -------------------------- | ------- | --------------------- |
| `itemListElement.position` | Integer | Position (1 = first). |

**Example — required properties only:**

```json
{
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "name": "Excellent grip on wet trails" },
    { "@type": "ListItem", "name": "Very lightweight" }
  ]
}
```

**Example — with recommended properties:**

```json
{
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Excellent grip on wet trails"
    },
    { "@type": "ListItem", "position": 2, "name": "Very lightweight" }
  ]
}
```

#### `Offer`

##### Required properties

| Property                              | Type   | Description  |
| ------------------------------------- | ------ | ------------ |
| `price` or `priceSpecification.price` | Number | Offer price. |

##### Recommended properties

| Property                                              | Type             | Description                                             |
| ----------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| `priceCurrency` or `priceSpecification.priceCurrency` | Text (ISO 4217)  | Required for merchant listing, recommended for snippet. |
| `availability`                                        | ItemAvailability | InStock, OutOfStock, PreOrder, Discontinued, etc.       |
| `priceValidUntil`                                     | Date (ISO 8601)  | Expiry of the price; expired dates may block display.   |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "price": 129.99
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "price": 129.99,
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "priceValidUntil": "2026-12-31"
}
```

#### `AggregateOffer`

##### Required properties

| Property        | Type            | Description                |
| --------------- | --------------- | -------------------------- |
| `lowPrice`      | Number          | Lowest price among offers. |
| `priceCurrency` | Text (ISO 4217) | Currency code.             |

##### Recommended properties

| Property     | Type   | Description                 |
| ------------ | ------ | --------------------------- |
| `highPrice`  | Number | Highest price among offers. |
| `offerCount` | Number | Number of offers.           |

_Do not use `AggregateOffer` to represent product variants — see §16.3._

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  "lowPrice": 99.99,
  "priceCurrency": "USD"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  "lowPrice": 99.99,
  "highPrice": 149.99,
  "priceCurrency": "USD",
  "offerCount": 5
}
```

### 16.2 Merchant listing

#### `Product`

##### Required properties

| Property | Type                          | Description                                              |
| -------- | ----------------------------- | -------------------------------------------------------- |
| `name`   | Text                          | Product name.                                            |
| `image`  | ImageObject or URL (repeated) | Product photo(s).                                        |
| `offers` | Offer                         | Merchant listings require `Offer`, not `AggregateOffer`. |

##### Recommended properties

| Property                                                   | Type                      | Description                             |
| ---------------------------------------------------------- | ------------------------- | --------------------------------------- |
| `description`                                              | Text                      | Product description.                    |
| `aggregateRating`                                          | AggregateRating           | Follow §20.                             |
| `review`                                                   | Review                    | Reviewer name must be valid.            |
| `brand.name`                                               | Text                      | Brand name (at most one).               |
| `category`                                                 | Text or CategoryCode      | Product type / Google Product Category. |
| `color` / `material` / `pattern`                           | Text                      | Descriptive attributes.                 |
| `gtin` / `gtin8` / `gtin12` / `gtin13` / `gtin14` / `isbn` | Text                      | Global identifiers (most specific one). |
| `mpn`                                                      | Text                      | Manufacturer part number.               |
| `sku`                                                      | Text                      | Merchant-specific ID, no whitespace.    |
| `size`                                                     | Text or SizeSpecification | At most one.                            |
| `audience`                                                 | PeopleAudience            | Suggested gender/age group.             |
| `hasAdultConsideration`                                    | AdultOrientedEnumeration  | `SexualContentConsideration` only.      |
| `hasCertification`                                         | Certification             | Up to 10.                               |
| `inProductGroupWithID` / `isVariantOf`                     | Text / ProductGroup       | Variant linkage — see §16.3.            |
| `subjectOf`                                                | 3DModel                   | At most one 3D model.                   |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Alpine Trail Running Shoe",
  "image": "https://example.com/images/alpine-trail-shoe.jpg",
  "offers": {
    "@type": "Offer",
    "price": 129.99,
    "priceCurrency": "USD"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Alpine Trail Running Shoe",
  "image": [
    "https://example.com/images/alpine-trail-shoe-1.jpg",
    "https://example.com/images/alpine-trail-shoe-2.jpg"
  ],
  "description": "A lightweight trail running shoe with aggressive lug soles.",
  "brand": { "@type": "Brand", "name": "Summit Gear" },
  "category": "Footwear > Athletic Shoes",
  "color": "Slate Gray",
  "sku": "ATR-2026-42",
  "gtin13": "0123456789012",
  "mpn": "ATR2026",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "89"
  },
  "offers": {
    "@type": "Offer",
    "price": 129.99,
    "priceCurrency": "USD"
  }
}
```

#### `3DModel`

##### Required properties

| Property              | Type | Description               |
| --------------------- | ---- | ------------------------- |
| `encoding.contentUrl` | URL  | `.gltf`/`.glb` file link. |

**Example — required properties only:**

```json
{
  "@type": "3DModel",
  "encoding": {
    "@type": "MediaObject",
    "contentUrl": "https://example.com/models/alpine-trail-shoe.glb"
  }
}
```

_No recommended properties documented for `3DModel`._

#### `Offer`

##### Required properties

| Property                                              | Type            | Description                                         |
| ----------------------------------------------------- | --------------- | --------------------------------------------------- |
| `price` or `priceSpecification.price`                 | Number          | Price greater than 0 required for merchant listing. |
| `priceCurrency` or `priceSpecification.priceCurrency` | Text (ISO 4217) | Currency code.                                      |

##### Recommended properties

| Property                     | Type                 | Description                                                                                                             |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `availability`               | ItemAvailability     | BackOrder, Discontinued, InStock, InStoreOnly, LimitedAvailability, OnlineOnly, OutOfStock, PreOrder, PreSale, SoldOut. |
| `itemCondition`              | OfferItemCondition   | NewCondition, RefurbishedCondition, UsedCondition.                                                                      |
| `priceValidUntil`            | Date (ISO 8601)      | Price expiry.                                                                                                           |
| `url`                        | URL                  | Purchase page (one value).                                                                                              |
| `validFrom` / `validThrough` | Date/DateTime        | Price validity window.                                                                                                  |
| `hasMerchantReturnPolicy`    | MerchantReturnPolicy | See §16.5.                                                                                                              |
| `shippingDetails`            | OfferShippingDetails | See §16.6.                                                                                                              |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "price": 129.99,
  "priceCurrency": "USD"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "price": 129.99,
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "priceValidUntil": "2026-12-31",
  "url": "https://example.com/products/alpine-trail-shoe",
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "US",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 30
  },
  "shippingDetails": {
    "@type": "OfferShippingDetails",
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": 4.99,
      "currency": "USD"
    },
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": "US"
    }
  }
}
```

#### `UnitPriceSpecification`

##### Required properties

| Property        | Type            | Description    |
| --------------- | --------------- | -------------- |
| `price`         | Number          | Offer price.   |
| `priceCurrency` | Text (ISO 4217) | Currency code. |

##### Recommended properties

| Property                     | Type                 | Description                 |
| ---------------------------- | -------------------- | --------------------------- |
| `priceType`                  | PriceTypeEnumeration | `StrikethroughPrice` only.  |
| `referenceQuantity`          | QuantitativeValue    | For unit pricing.           |
| `validForMemberTier`         | MemberProgramTier    | Member-tier-specific price. |
| `membershipPointsEarned`     | Number               | Beta loyalty points.        |
| `validFrom` / `validThrough` | Date/DateTime        | Validity window.            |

**Example — required properties only:**

```json
{
  "@type": "UnitPriceSpecification",
  "price": 12.99,
  "priceCurrency": "USD"
}
```

**Example — with recommended properties:**

```json
{
  "@type": "UnitPriceSpecification",
  "price": 12.99,
  "priceCurrency": "USD",
  "priceType": "https://schema.org/StrikethroughPrice",
  "referenceQuantity": {
    "@type": "QuantitativeValue",
    "value": 100,
    "unitCode": "GRM"
  },
  "validFrom": "2026-10-01",
  "validThrough": "2026-10-31"
}
```

### 16.3 Product variants

#### `ProductGroup`

##### Required properties

| Property | Type | Description                                            |
| -------- | ---- | ------------------------------------------------------ |
| `name`   | Text | General group name (variants should be more specific). |

##### Recommended properties

| Property                | Type                     | Description                                                    |
| ----------------------- | ------------------------ | -------------------------------------------------------------- |
| `productGroupID`        | Text                     | "Parent SKU"; must match `inProductGroupWithID` on variants.   |
| `variesBy`              | DefinedTerm              | color, size, suggestedAge, suggestedGender, material, pattern. |
| `hasVariant`            | Product (repeated)       | Variant products in the group.                                 |
| `brand` / `brand.name`  | Brand / Text             | Shared brand info.                                             |
| `description`           | Text or TextObject       | General description.                                           |
| `aggregateRating`       | AggregateRating          | Across all variants.                                           |
| `review`                | Review                   | For the group as a whole.                                      |
| `url`                   | URL                      | Base URL (single-page sites only).                             |
| `hasAdultConsideration` | AdultOrientedEnumeration | `SexualContentConsideration` only.                             |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "name": "Alpine Trail Running Shoe"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "name": "Alpine Trail Running Shoe",
  "productGroupID": "ATR-2026",
  "description": "A lightweight trail running shoe available in multiple colors and sizes.",
  "brand": { "@type": "Brand", "name": "Summit Gear" },
  "variesBy": ["color", "size"],
  "hasVariant": [
    {
      "@type": "Product",
      "name": "Alpine Trail Running Shoe - Slate Gray, Size 9",
      "color": "Slate Gray",
      "size": "9",
      "inProductGroupWithID": "ATR-2026",
      "offers": { "@type": "Offer", "price": 129.99, "priceCurrency": "USD" }
    },
    {
      "@type": "Product",
      "name": "Alpine Trail Running Shoe - Forest Green, Size 10",
      "color": "Forest Green",
      "size": "10",
      "inProductGroupWithID": "ATR-2026",
      "offers": { "@type": "Offer", "price": 129.99, "priceCurrency": "USD" }
    }
  ]
}
```

### 16.4 Loyalty program

#### `MemberProgram` (nested under `Organization`)

##### Required properties

| Property      | Type                         | Description                   |
| ------------- | ---------------------------- | ----------------------------- |
| `name`        | Text                         | Program name.                 |
| `description` | Text                         | Primary benefits for members. |
| `hasTiers`    | MemberProgramTier (repeated) | At least one tier required.   |

##### Recommended properties

| Property | Type | Description   |
| -------- | ---- | ------------- |
| `url`    | URL  | Sign-up page. |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Summit Gear",
  "memberProgram": {
    "@type": "MemberProgram",
    "name": "Summit Rewards",
    "description": "Earn points on every purchase and unlock member-only pricing.",
    "hasTiers": {
      "@type": "MemberProgramTier",
      "name": "Silver",
      "hasTierBenefit": "https://schema.org/TierBenefitLoyaltyPoints"
    }
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Summit Gear",
  "memberProgram": {
    "@type": "MemberProgram",
    "name": "Summit Rewards",
    "description": "Earn points on every purchase and unlock member-only pricing.",
    "url": "https://example.com/rewards/join",
    "hasTiers": [
      {
        "@type": "MemberProgramTier",
        "name": "Silver",
        "hasTierBenefit": "https://schema.org/TierBenefitLoyaltyPoints",
        "membershipPointsEarned": { "@type": "QuantitativeValue", "value": 1 },
        "url": "https://example.com/rewards/silver"
      },
      {
        "@type": "MemberProgramTier",
        "name": "Gold",
        "hasTierBenefit": [
          "https://schema.org/TierBenefitLoyaltyPoints",
          "https://schema.org/TierBenefitLoyaltyPrice"
        ],
        "hasTierRequirement": {
          "@type": "MonetaryAmount",
          "value": 500,
          "currency": "USD"
        },
        "url": "https://example.com/rewards/gold"
      }
    ]
  }
}
```

#### `MemberProgramTier`

##### Required properties

| Property         | Type                              | Description                                              |
| ---------------- | --------------------------------- | -------------------------------------------------------- |
| `name`           | Text                              | Tier name.                                               |
| `hasTierBenefit` | TierBenefitEnumeration (repeated) | `TierBenefitLoyaltyPoints` or `TierBenefitLoyaltyPrice`. |

##### Recommended properties

| Property                 | Type                                                        | Description                           |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------- |
| `hasTierRequirement`     | CreditCard, MonetaryAmount, UnitPriceSpecification, or Text | Requirement to join; free if omitted. |
| `membershipPointsEarned` | QuantitativeValue                                           | Points per currency unit spent.       |
| `url`                    | URL                                                         | Tier-specific sign-up URL.            |

**Example — required properties only:**

```json
{
  "@type": "MemberProgramTier",
  "name": "Gold",
  "hasTierBenefit": "https://schema.org/TierBenefitLoyaltyPrice"
}
```

**Example — with recommended properties:**

```json
{
  "@type": "MemberProgramTier",
  "name": "Gold",
  "hasTierBenefit": [
    "https://schema.org/TierBenefitLoyaltyPoints",
    "https://schema.org/TierBenefitLoyaltyPrice"
  ],
  "hasTierRequirement": {
    "@type": "MonetaryAmount",
    "value": 500,
    "currency": "USD"
  },
  "membershipPointsEarned": { "@type": "QuantitativeValue", "value": 2 },
  "url": "https://example.com/rewards/gold"
}
```

### 16.5 Return policy

#### `MerchantReturnPolicy` (nested under `Organization` via `hasMerchantReturnPolicy`)

##### Required properties (Option A or B)

| Property                                    | Type                      | Description                                                                                                                        |
| ------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `applicableCountry`                         | Text (ISO 3166-1 alpha-2) | Countries the policy applies to (up to 50).                                                                                        |
| `returnPolicyCategory`                      | MerchantReturnEnumeration | `MerchantReturnFiniteReturnWindow` (needs `merchantReturnDays`), `MerchantReturnNotPermitted`, or `MerchantReturnUnlimitedWindow`. |
| `merchantReturnLink` (alternative to above) | URL                       | Link to a return-policy page.                                                                                                      |

##### Recommended properties

| Property                                                                         | Type                         | Description                                                       |
| -------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `merchantReturnDays`                                                             | Integer                      | Days from delivery to return (required if finite window).         |
| `returnFees`                                                                     | ReturnFeesEnumeration        | FreeReturn, ReturnFeesCustomerResponsibility, ReturnShippingFees. |
| `returnMethod`                                                                   | ReturnMethodEnumeration      | ReturnAtKiosk, ReturnByMail, ReturnInStore.                       |
| `returnShippingFeesAmount`                                                       | MonetaryAmount               | Used with `ReturnShippingFees`.                                   |
| `itemCondition`                                                                  | OfferItemCondition           | Accepted return conditions.                                       |
| `refundType`                                                                     | RefundTypeEnumeration        | ExchangeRefund, FullRefund, StoreCreditRefund.                    |
| `restockingFee`                                                                  | MonetaryAmount or Number     | Fixed or % fee.                                                   |
| `returnLabelSource`                                                              | ReturnLabelSourceEnumeration | Customer, download/print, or in-box.                              |
| `returnPolicyCountry`                                                            | Text (ISO 3166-1 alpha-2)    | Where to send returns.                                            |
| `customerRemorseReturnFees` / `itemDefectReturnFees`                             | ReturnFeesEnumeration        | Scenario-specific fee types.                                      |
| `customerRemorseReturnLabelSource` / `itemDefectReturnLabelSource`               | ReturnLabelSourceEnumeration | Scenario-specific label source.                                   |
| `customerRemorseReturnShippingFeesAmount` / `itemDefectReturnShippingFeesAmount` | MonetaryAmount               | Scenario-specific shipping cost.                                  |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Summit Gear",
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "US",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 30
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Summit Gear",
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": ["US", "CA"],
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 30,
    "returnFees": "https://schema.org/FreeReturn",
    "returnMethod": "https://schema.org/ReturnByMail",
    "itemCondition": "https://schema.org/NewCondition",
    "refundType": "https://schema.org/FullRefund",
    "returnPolicyCountry": "US"
  }
}
```

#### `MerchantReturnPolicySeasonalOverride`

##### Required properties

| Property                                            | Type                      | Description         |
| --------------------------------------------------- | ------------------------- | ------------------- |
| `returnPolicySeasonalOverride.returnPolicyCategory` | MerchantReturnEnumeration | Same enum as above. |

##### Recommended properties

| Property                                              | Type                  | Description                |
| ----------------------------------------------------- | --------------------- | -------------------------- |
| `returnPolicySeasonalOverride.startDate` / `.endDate` | Date/DateTime         | Override window.           |
| `returnPolicySeasonalOverride.merchantReturnDays`     | Integer/Date/DateTime | Required if finite window. |

**Example — required properties only:**

```json
{
  "@type": "MerchantReturnPolicySeasonalOverride",
  "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
}
```

**Example — with recommended properties:**

```json
{
  "@type": "MerchantReturnPolicySeasonalOverride",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "startDate": "2026-11-15",
  "endDate": "2027-01-05",
  "merchantReturnDays": 60
}
```

### 16.6 Shipping policy

#### `ShippingService` (nested under `Organization` via `hasShippingService`)

##### Required properties

| Property             | Type               | Description                                          |
| -------------------- | ------------------ | ---------------------------------------------------- |
| `shippingConditions` | ShippingConditions | Cost/delivery conditions; lowest cost wins on match. |

##### Recommended properties

| Property             | Type                       | Description                             |
| -------------------- | -------------------------- | --------------------------------------- |
| `name`               | Text                       | e.g. "Standard Shipping".               |
| `description`        | Text                       | Longer description.                     |
| `fulfillmentType`    | FulfillmentTypeEnumeration | Delivery (default) or collection point. |
| `handlingTime`       | ServicePeriod              | Processing time before shipment.        |
| `validForMemberTier` | MemberProgramTier          | Loyalty tiers this applies to.          |

**Example — required properties only:**

```json
{
  "@type": "ShippingService",
  "shippingConditions": {
    "@type": "ShippingConditions",
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": 4.99,
      "currency": "USD"
    }
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Summit Gear",
  "hasShippingService": {
    "@type": "ShippingService",
    "name": "Standard Shipping",
    "description": "Delivered within 3-5 business days.",
    "fulfillmentType": "https://schema.org/ShippingDelivery",
    "handlingTime": {
      "@type": "ServicePeriod",
      "duration": "P1D"
    },
    "shippingConditions": {
      "@type": "ShippingConditions",
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "US"
      },
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": 4.99,
        "currency": "USD"
      },
      "transitTime": {
        "@type": "ServicePeriod",
        "duration": "P3D/P5D"
      }
    }
  }
}
```

#### `ShippingConditions`

##### Recommended properties (no required properties)

| Property                                 | Type                                   | Description                                    |
| ---------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| `doesNotShip`                            | Boolean                                | True if unavailable for the given combination. |
| `shippingDestination` / `shippingOrigin` | DefinedRegion                          | Region(s).                                     |
| `numItems` / `orderValue` / `weight`     | QuantitativeValue / MonetaryAmount     | Applicability ranges.                          |
| `shippingRate`                           | ShippingRateSettings or MonetaryAmount | Cost (if `doesNotShip` is false).              |
| `transitTime`                            | ServicePeriod                          | Transit duration (if `doesNotShip` is false).  |
| `seasonalOverride`                       | OpeningHoursSpecification              | Limited validity window.                       |

_No required properties — see recommended example below._

**Example — with recommended properties:**

```json
{
  "@type": "ShippingConditions",
  "doesNotShip": false,
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "US",
    "addressRegion": "CA"
  },
  "orderValue": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "minValue": 0
  },
  "shippingRate": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": 4.99
  },
  "transitTime": {
    "@type": "ServicePeriod",
    "duration": "P3D/P5D"
  }
}
```

#### `DefinedRegion`

##### Required properties

| Property         | Type                      | Description   |
| ---------------- | ------------------------- | ------------- |
| `addressCountry` | Text (ISO 3166-1 alpha-2) | Country code. |

##### Recommended properties

| Property        | Type              | Description                                     |
| --------------- | ----------------- | ----------------------------------------------- |
| `addressRegion` | Text (ISO 3166-2) | US/AU/JP only; don't combine with `postalCode`. |
| `postalCode`    | Text              | AU/CA/US only.                                  |

**Example — required properties only:**

```json
{
  "@type": "DefinedRegion",
  "addressCountry": "US"
}
```

**Example — with recommended properties:**

```json
{
  "@type": "DefinedRegion",
  "addressCountry": "US",
  "addressRegion": "CA"
}
```

#### `MonetaryAmount` (order value / shipping rate)

##### Required properties

| Property                         | Type            | Description                             |
| -------------------------------- | --------------- | --------------------------------------- |
| `currency`                       | Text (ISO 4217) | Currency code.                          |
| `value` or `maxValue`/`minValue` | Number          | Amount or bounds (`0` = free shipping). |

**Example — required properties only:**

```json
{
  "@type": "MonetaryAmount",
  "currency": "USD",
  "value": 0
}
```

_No recommended properties documented separately for `MonetaryAmount`._

---

## 17. Profile page

Source: [profile-page](https://developers.google.com/search/docs/appearance/structured-data/profile-page)

### `ProfilePage`

#### Required properties

| Property     | Type                   | Description                                                |
| ------------ | ---------------------- | ---------------------------------------------------------- |
| `mainEntity` | Person or Organization | The subject of the profile (default to Person if unknown). |

#### Recommended properties

| Property       | Type                | Description                      |
| -------------- | ------------------- | -------------------------------- |
| `dateCreated`  | DateTime (ISO 8601) | Profile creation date/time.      |
| `dateModified` | DateTime (ISO 8601) | Profile last-modified date/time. |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Jamie Rivera"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateCreated": "2022-03-14T09:00:00-05:00",
  "dateModified": "2026-09-01T12:30:00-05:00",
  "mainEntity": {
    "@type": "Person",
    "name": "Jamie Rivera"
  }
}
```

### `Person` / `Organization` (as `mainEntity`)

#### Required properties

| Property | Type | Description                                                    |
| -------- | ---- | -------------------------------------------------------------- |
| `name`   | Text | Primary identifier (or `alternateName` if `name` unavailable). |

#### Recommended properties

| Property                    | Type               | Description                                                    |
| --------------------------- | ------------------ | -------------------------------------------------------------- |
| `alternateName`             | Text               | Handle or alternate public identifier.                         |
| `description`               | Text               | Byline or credential.                                          |
| `identifier`                | Text               | Site-specific unique ID.                                       |
| `image`                     | URL or ImageObject | Non-placeholder profile image.                                 |
| `sameAs`                    | URL                | Links to other profiles/homepages.                             |
| `interactionStatistic`      | InteractionCounter | Followers/likes/friend counts (platform-wide).                 |
| `agentInteractionStatistic` | InteractionCounter | The entity's own actions (follows/likes/posts/reshares given). |

**Example — required properties only:**

```json
{
  "@type": "Person",
  "name": "Jamie Rivera"
}
```

**Example — with recommended properties:**

```json
{
  "@type": "Person",
  "name": "Jamie Rivera",
  "alternateName": "jamie.rivera",
  "description": "Outdoor gear reviewer and trail running enthusiast.",
  "identifier": "user-48213",
  "image": "https://example.com/images/jamie-rivera.jpg",
  "sameAs": [
    "https://www.example-social.com/jamie.rivera",
    "https://example.com/blog/authors/jamie-rivera"
  ],
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/FollowAction",
    "userInteractionCount": 1520
  }
}
```

---

## 18. Q&A

Source: [qapage](https://developers.google.com/search/docs/appearance/structured-data/qapage)

### `QAPage`

#### Required properties

| Property     | Type     | Description                                          |
| ------------ | -------- | ---------------------------------------------------- |
| `mainEntity` | Question | One question per page (only one `Question` allowed). |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": {
    "@type": "Question",
    "name": "How do I clean trail running shoes?",
    "answerCount": 1,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Rinse with cold water and air dry away from direct heat."
    }
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": {
    "@type": "Question",
    "name": "How do I clean trail running shoes?",
    "text": "What is the best way to clean mud off trail running shoes without damaging them?",
    "answerCount": 2,
    "upvoteCount": 34,
    "datePublished": "2026-05-10T08:00:00-05:00",
    "author": {
      "@type": "Person",
      "name": "Jamie Rivera",
      "url": "https://example.com/users/jamie-rivera"
    },
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Rinse with cold water and a soft brush, then air dry away from direct heat.",
      "upvoteCount": 21,
      "url": "https://example.com/questions/1234#answer-1",
      "author": {
        "@type": "Person",
        "name": "Morgan Lee",
        "url": "https://example.com/users/morgan-lee"
      },
      "datePublished": "2026-05-10T10:00:00-05:00"
    },
    "suggestedAnswer": [
      {
        "@type": "Answer",
        "text": "A mild soap solution also works well for stubborn stains.",
        "upvoteCount": 5
      }
    ]
  }
}
```

### `Question`

#### Required properties

| Property                                             | Type    | Description                         |
| ---------------------------------------------------- | ------- | ----------------------------------- |
| `name`                                               | Text    | Short-form question text.           |
| `answerCount`                                        | Integer | Total number of answers (can be 0). |
| `acceptedAnswer` or `suggestedAnswer` (at least one) | Answer  | Answer(s) to the question.          |

#### Recommended properties

| Property                         | Type                         | Description                      |
| -------------------------------- | ---------------------------- | -------------------------------- |
| `text`                           | Text                         | Full long-form question text.    |
| `author`                         | Person or Organization       | Question author.                 |
| `author.url`                     | URL                          | Author's identifying link.       |
| `datePublished` / `dateModified` | DateTime (ISO 8601)          | Post/edit date.                  |
| `upvoteCount`                    | Integer                      | Aggregate votes.                 |
| `commentCount`                   | Integer                      | Number of comments.              |
| `comment`                        | Comment                      | A clarification comment.         |
| `image` / `video`                | ImageObject/URL, VideoObject | Inline media.                    |
| `digitalSourceType`              | IPTCDigitalSourceEnumeration | AI/algorithmic origin indicator. |

**Example — required properties only:**

```json
{
  "@type": "Question",
  "name": "How do I clean trail running shoes?",
  "answerCount": 1,
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Rinse with cold water and air dry away from direct heat."
  }
}
```

**Example — with recommended properties:**

```json
{
  "@type": "Question",
  "name": "How do I clean trail running shoes?",
  "text": "What is the best way to clean mud off trail running shoes without damaging them?",
  "answerCount": 1,
  "upvoteCount": 34,
  "commentCount": 1,
  "datePublished": "2026-05-10T08:00:00-05:00",
  "author": {
    "@type": "Person",
    "name": "Jamie Rivera",
    "url": "https://example.com/users/jamie-rivera"
  },
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Rinse with cold water and a soft brush, then air dry away from direct heat."
  },
  "comment": {
    "@type": "Comment",
    "text": "Does this work on suede uppers too?"
  }
}
```

### `Answer`

#### Required properties

| Property | Type | Description       |
| -------- | ---- | ----------------- |
| `text`   | Text | Full answer text. |

#### Recommended properties

| Property                         | Type                             | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- |
| `url`                            | URL                              | Direct link to the answer.       |
| `author`                         | Person or Organization           | Answer author.                   |
| `author.url`                     | URL                              | Author's identifying link.       |
| `datePublished` / `dateModified` | DateTime (ISO 8601)              | Post/edit date.                  |
| `upvoteCount`                    | Integer                          | Aggregate votes.                 |
| `commentCount` / `comment`       | Integer / Comment                | Comments.                        |
| `image` / `video`                | ImageObject/URL, VideoObject/URL | Inline media.                    |
| `digitalSourceType`              | IPTCDigitalSourceEnumeration     | AI/algorithmic origin indicator. |

**Example — required properties only:**

```json
{
  "@type": "Answer",
  "text": "Rinse with cold water and air dry away from direct heat."
}
```

**Example — with recommended properties:**

```json
{
  "@type": "Answer",
  "text": "Rinse with cold water and a soft brush, then air dry away from direct heat.",
  "url": "https://example.com/questions/1234#answer-1",
  "author": {
    "@type": "Person",
    "name": "Morgan Lee",
    "url": "https://example.com/users/morgan-lee"
  },
  "datePublished": "2026-05-10T10:00:00-05:00",
  "upvoteCount": 21,
  "commentCount": 1
}
```

### `Comment`

#### Required properties

| Property | Type | Description        |
| -------- | ---- | ------------------ |
| `text`   | Text | Full comment text. |

#### Recommended properties

| Property                         | Type                             | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- |
| `author` / `author.url`          | Person or Organization / URL     | Comment author.                  |
| `datePublished` / `dateModified` | DateTime (ISO 8601)              | Post/edit date.                  |
| `commentCount` / `comment`       | Integer / Comment                | Threaded replies.                |
| `image` / `video`                | ImageObject/URL, VideoObject/URL | Inline media.                    |
| `digitalSourceType`              | IPTCDigitalSourceEnumeration     | AI/algorithmic origin indicator. |

**Example — required properties only:**

```json
{
  "@type": "Comment",
  "text": "Does this work on suede uppers too?"
}
```

**Example — with recommended properties:**

```json
{
  "@type": "Comment",
  "text": "Does this work on suede uppers too?",
  "author": {
    "@type": "Person",
    "name": "Taylor Kim",
    "url": "https://example.com/users/taylor-kim"
  },
  "datePublished": "2026-05-11T09:00:00-05:00",
  "commentCount": 0
}
```

---

## 19. Recipe

Source: [recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe)

### `Recipe`

#### Required properties

| Property | Type               | Description                                                                  |
| -------- | ------------------ | ---------------------------------------------------------------------------- |
| `name`   | Text               | Name of the dish.                                                            |
| `image`  | URL or ImageObject | Image of the completed dish; multiple resolutions/aspect ratios recommended. |

#### Recommended properties

| Property                              | Type                             | Description                                                 |
| ------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| `author`                              | Person or Organization           | Recipe author.                                              |
| `datePublished`                       | Date (ISO 8601)                  | Publish date.                                               |
| `description`                         | Text                             | Short summary.                                              |
| `prepTime` / `cookTime` / `totalTime` | Duration (ISO 8601)              | Timing; use `prepTime` with `cookTime` together.            |
| `keywords`                            | Text                             | Comma-separated descriptive terms.                          |
| `recipeYield`                         | Text or Integer                  | Quantity produced; required if per-serving nutrition given. |
| `recipeCategory`                      | Text                             | Meal/course type.                                           |
| `recipeCuisine`                       | Text                             | Regional cuisine.                                           |
| `recipeIngredient`                    | Text (repeated)                  | An ingredient.                                              |
| `recipeInstructions`                  | HowToStep, HowToSection, or Text | Steps to make the dish.                                     |
| `nutrition.calories`                  | Energy                           | Calories per serving (needs `recipeYield`).                 |
| `aggregateRating`                     | AggregateRating                  | Follow §20.                                                 |
| `video`                               | VideoObject                      | Video of the steps.                                         |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Grandma's Blueberry Pancakes",
  "image": "https://example.com/images/blueberry-pancakes.jpg"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Grandma's Blueberry Pancakes",
  "image": [
    "https://example.com/images/blueberry-pancakes-1x1.jpg",
    "https://example.com/images/blueberry-pancakes-4x3.jpg",
    "https://example.com/images/blueberry-pancakes-16x9.jpg"
  ],
  "author": {
    "@type": "Person",
    "name": "Jamie Rivera"
  },
  "datePublished": "2026-02-14",
  "description": "Fluffy pancakes packed with fresh blueberries, ready in 20 minutes.",
  "prepTime": "PT10M",
  "cookTime": "PT10M",
  "totalTime": "PT20M",
  "keywords": "pancakes, breakfast, blueberry",
  "recipeYield": "4 servings",
  "recipeCategory": "Breakfast",
  "recipeCuisine": "American",
  "recipeIngredient": [
    "2 cups flour",
    "1 cup fresh blueberries",
    "2 eggs",
    "1.5 cups milk"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "name": "Mix batter",
      "text": "Whisk flour, eggs, and milk together until smooth."
    },
    {
      "@type": "HowToStep",
      "name": "Cook pancakes",
      "text": "Pour batter onto a hot griddle, sprinkle blueberries, and flip once bubbles form."
    }
  ],
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "320 calories"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "212"
  }
}
```

### `HowToSection`

#### Required properties

| Property          | Type      | Description           |
| ----------------- | --------- | --------------------- |
| `name`            | Text      | Section name.         |
| `itemListElement` | HowToStep | Steps in the section. |

**Example — required properties only:**

```json
{
  "@type": "HowToSection",
  "name": "Make the batter",
  "itemListElement": [
    {
      "@type": "HowToStep",
      "text": "Whisk flour, eggs, and milk together until smooth."
    },
    {
      "@type": "HowToStep",
      "text": "Fold in fresh blueberries."
    }
  ]
}
```

_No recommended properties documented separately for `HowToSection`; see `HowToStep` below._

### `HowToStep`

#### Required properties

| Property                      | Type                              | Description                              |
| ----------------------------- | --------------------------------- | ---------------------------------------- |
| `text` (or `itemListElement`) | Text (or HowToDirection/HowToTip) | Step instructions, one of the two forms. |

#### Recommended properties

| Property | Type                | Description                              |
| -------- | ------------------- | ---------------------------------------- |
| `name`   | Text                | Short step summary (avoid step numbers). |
| `image`  | ImageObject or URL  | Step image.                              |
| `url`    | URL                 | Direct link to the step.                 |
| `video`  | VideoObject or Clip | Step video.                              |

**Example — required properties only:**

```json
{
  "@type": "HowToStep",
  "text": "Whisk flour, eggs, and milk together until smooth."
}
```

**Example — with recommended properties:**

```json
{
  "@type": "HowToStep",
  "name": "Mix the batter",
  "text": "Whisk flour, eggs, and milk together until smooth.",
  "image": "https://example.com/images/mix-batter.jpg",
  "url": "https://example.com/recipes/blueberry-pancakes#step-1",
  "video": {
    "@type": "VideoObject",
    "name": "Mixing the batter",
    "contentUrl": "https://example.com/videos/mix-batter.mp4"
  }
}
```

### `HowToDirection` / `HowToTip`

#### Required properties

| Property | Type | Description            |
| -------- | ---- | ---------------------- |
| `text`   | Text | Direction or tip text. |

**Example — required properties only:**

```json
{
  "@type": "HowToDirection",
  "text": "Let the batter rest for five minutes before cooking for fluffier pancakes."
}
```

_No recommended properties documented separately for `HowToDirection` / `HowToTip`._

---

## 20. Review snippet

Source: [review-snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)

### `Review`

#### Required properties

| Property                                         | Type                                                                           | Description                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------- |
| `author`                                         | Person or Organization                                                         | Reviewer's name (valid name, under 100 chars). |
| `itemReviewed` (omit if nested)                  | Book, Course, Event, LocalBusiness, Product, Recipe, SoftwareApplication, etc. | The item reviewed.                             |
| `itemReviewed.name` (or parent `name` if nested) | Text                                                                           | Name of the item.                              |
| `reviewRating`                                   | Rating                                                                         | The rating given.                              |
| `reviewRating.ratingValue`                       | Number or Text                                                                 | Rating value (default scale 1–5).              |

#### Recommended properties

| Property                                   | Type            | Description                          |
| ------------------------------------------ | --------------- | ------------------------------------ |
| `datePublished`                            | Date (ISO 8601) | Review publish date.                 |
| `reviewRating.bestRating` / `.worstRating` | Number          | Rating scale bounds (default 5 / 1). |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Jamie Rivera"
  },
  "itemReviewed": {
    "@type": "Product",
    "name": "Alpine Trail Running Shoe"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Jamie Rivera"
  },
  "itemReviewed": {
    "@type": "Product",
    "name": "Alpine Trail Running Shoe"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "datePublished": "2026-06-01"
}
```

### `AggregateRating`

#### Required properties

| Property                                         | Type                  | Description                         |
| ------------------------------------------------ | --------------------- | ----------------------------------- |
| `itemReviewed` (omit if nested)                  | Same list as `Review` | The item rated.                     |
| `itemReviewed.name` (or parent `name` if nested) | Text                  | Name of the item.                   |
| `ratingValue`                                    | Number or Text        | Average rating (default scale 1–5). |
| `ratingCount` or `reviewCount` (at least one)    | Number                | Total ratings/reviews.              |

#### Recommended properties

| Property                     | Type   | Description                          |
| ---------------------------- | ------ | ------------------------------------ |
| `bestRating` / `worstRating` | Number | Rating scale bounds (default 5 / 1). |

Valid `itemReviewed` types: Book, Course, CreativeWorkSeason, CreativeWorkSeries, Episode, Event, Game, HowTo, LocalBusiness, MediaObject, Movie, MusicPlaylist, MusicRecording, Organization, Product, Recipe, SoftwareApplication.

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Product",
    "name": "Alpine Trail Running Shoe"
  },
  "ratingValue": "4.6",
  "reviewCount": "89"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Product",
    "name": "Alpine Trail Running Shoe"
  },
  "ratingValue": "4.6",
  "ratingCount": "102",
  "reviewCount": "89",
  "bestRating": "5",
  "worstRating": "1"
}
```

---

## 21. Software app

Source: [software-app](https://developers.google.com/search/docs/appearance/structured-data/software-app)

### `SoftwareApplication`

#### Required properties

| Property                                         | Type                     | Description                                                 |
| ------------------------------------------------ | ------------------------ | ----------------------------------------------------------- |
| `name`                                           | Text                     | App name.                                                   |
| `offers.price`                                   | Number                   | `0` if free; `priceCurrency` recommended if greater than 0. |
| `aggregateRating` **or** `review` (at least one) | AggregateRating / Review | Follow §20's property lists.                                |

#### Recommended properties

| Property               | Type | Description                                                      |
| ---------------------- | ---- | ---------------------------------------------------------------- |
| `applicationCategory`  | Text | e.g. `BusinessApplication`, `GameApplication` (fixed value set). |
| `operatingSystem`      | Text | e.g. "Windows 7", "Android 1.6".                                 |
| `offers.priceCurrency` | Text | Recommended when price is greater than 0.                        |

_Extended subtypes `MobileApplication`/`WebApplication` are supported; `VideoGame` alone is not eligible — co-type it, e.g. `["VideoGame", "MobileApplication"]`._

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PhotoEdit Pro",
  "offers": {
    "@type": "Offer",
    "price": "0"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "ratingCount": "8942"
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "MobileApplication"],
  "name": "PhotoEdit Pro",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Android 8.0",
  "offers": {
    "@type": "Offer",
    "price": "4.99",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "ratingCount": "8942"
  }
}
```

---

## 22. Speakable

Source: [speakable](https://developers.google.com/search/docs/appearance/structured-data/speakable)

`speakable` is a property on `Article` or `WebPage`, whose value is a `SpeakableSpecification`.

### `SpeakableSpecification`

#### Required properties (use one, not both)

| Property      | Type | Description                    |
| ------------- | ---- | ------------------------------ |
| `cssSelector` | Text | Selects content via CSS class. |
| `xPath`       | Text | Selects content via XPath.     |

#### Recommended properties

None documented.

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Brew Pour-Over Coffee",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".headline", ".summary"]
  }
}
```

**Example — with recommended properties:**

_No recommended properties documented — see required example above._

---

## 23. Subscription and paywalled content

Source: [paywalled-content](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content)

Applies to `CreativeWork` or subtypes (`Article`, `NewsArticle`, `Blog`, `Comment`, `Course`, `HowTo`, `Message`, `Review`, `WebPage`).

### `CreativeWork` (or subtype)

#### Required properties

| Property              | Type    | Description                          |
| --------------------- | ------- | ------------------------------------ |
| `isAccessibleForFree` | Boolean | `false` if the content is paywalled. |

#### Recommended properties

| Property                      | Type            | Description                                          |
| ----------------------------- | --------------- | ---------------------------------------------------- |
| `hasPart.@type`               | Text            | `WebPageElement`, identifying the paywalled section. |
| `hasPart.cssSelector`         | CssSelectorType | `.class` selector for the paywalled section only.    |
| `hasPart.isAccessibleForFree` | Boolean         | `false` for that specific section.                   |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "isAccessibleForFree": false
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "isAccessibleForFree": false,
  "hasPart": {
    "@type": "WebPageElement",
    "isAccessibleForFree": false,
    "cssSelector": ".paywalled-content"
  }
}
```

---

## 24. Vacation rental

Source: [vacation-rental](https://developers.google.com/search/docs/appearance/structured-data/vacation-rental)

### `VacationRental`

#### Required properties

| Property                                                  | Type           | Description                                  |
| --------------------------------------------------------- | -------------- | -------------------------------------------- |
| `name`                                                    | Text           | Listing name.                                |
| `identifier`                                              | Text           | Unique, language-independent property ID.    |
| `image`                                                   | URL (repeated) | ≥8 photos (bedroom, bathroom, common areas). |
| `latitude` / `longitude` (`geo.latitude`/`geo.longitude`) | Number         | ≥5 decimal places precision.                 |
| `containsPlace`                                           | Accommodation  | Beds, occupancy, room counts, amenities.     |
| `containsPlace.occupancy.value`                           | Integer        | Max guests allowed.                          |

#### Recommended properties

| Property                                                                        | Type                    | Description                                           |
| ------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------- |
| `additionalType`                                                                | Text                    | e.g. Apartment, Cabin, Villa.                         |
| `address`                                                                       | PostalAddress           | Full physical location (no P.O. boxes).               |
| `aggregateRating`                                                               | AggregateRating         | Follow §20.                                           |
| `brand`                                                                         | Brand                   | Hotel Center brand ID.                                |
| `checkinTime` / `checkoutTime`                                                  | Time (ISO 8601)         | Check-in/out times.                                   |
| `description`                                                                   | Text                    | Property description.                                 |
| `knowsLanguage`                                                                 | Text (repeated, BCP 47) | Host's spoken languages.                              |
| `review`                                                                        | Review (repeated)       | User reviews; `datePublished` required.               |
| `containsPlace.additionalType`                                                  | Text                    | `EntirePlace`, `PrivateRoom`, `SharedRoom`.           |
| `containsPlace.amenityFeature`                                                  | Repeated                | Boolean/non-boolean amenities (wifi, pool, ac, etc.). |
| `containsPlace.bed`                                                             | BedDetails (repeated)   | Bed type/count.                                       |
| `containsPlace.floorSize`                                                       | QuantitativeValue       | Size (MTK/SQM or FTK/SQFT).                           |
| `containsPlace.numberOfBathroomsTotal` / `.numberOfBedrooms` / `.numberOfRooms` | Integer                 | Room counts.                                          |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "name": "Seaside Cottage Retreat",
  "identifier": "VR-10234",
  "image": [
    "https://example.com/photos/bedroom.jpg",
    "https://example.com/photos/bathroom.jpg",
    "https://example.com/photos/living-room.jpg"
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.81023,
    "longitude": -122.47853
  },
  "containsPlace": {
    "@type": "Accommodation",
    "occupancy": {
      "@type": "QuantitativeValue",
      "value": 6
    }
  }
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "name": "Seaside Cottage Retreat",
  "identifier": "VR-10234",
  "additionalType": "https://schema.org/House",
  "description": "A cozy two-bedroom cottage steps from the beach, with a private deck and full kitchen.",
  "image": [
    "https://example.com/photos/bedroom.jpg",
    "https://example.com/photos/bathroom.jpg",
    "https://example.com/photos/living-room.jpg",
    "https://example.com/photos/exterior.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "42 Shoreline Drive",
    "addressLocality": "Half Moon Bay",
    "addressRegion": "CA",
    "postalCode": "94019",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.81023,
    "longitude": -122.47853
  },
  "brand": { "@type": "Brand", "name": "Coastal Stays" },
  "checkinTime": "15:00:00",
  "checkoutTime": "11:00:00",
  "knowsLanguage": ["en", "es"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "112"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Jamie Lee" },
      "datePublished": "2025-06-12"
    }
  ],
  "containsPlace": {
    "@type": "Accommodation",
    "additionalType": "EntirePlace",
    "occupancy": { "@type": "QuantitativeValue", "value": 6 },
    "numberOfBedrooms": 2,
    "numberOfBathroomsTotal": 1,
    "numberOfRooms": 4,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": 85,
      "unitCode": "MTK"
    },
    "bed": [{ "@type": "BedDetails", "typeOfBed": "Queen", "numberOfBeds": 1 }],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Wifi", "value": true }
    ]
  }
}
```

---

## 25. Video

Source: [video](https://developers.google.com/search/docs/appearance/structured-data/video)

### `VideoObject`

#### Required properties

| Property       | Type                | Description                    |
| -------------- | ------------------- | ------------------------------ |
| `name`         | Text                | Video title (unique per site). |
| `thumbnailUrl` | URL (repeated)      | Unique thumbnail image.        |
| `uploadDate`   | DateTime (ISO 8601) | Publish date/time.             |

#### Recommended properties

| Property                              | Type                   | Description                                                            |
| ------------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| `description`                         | Text                   | Unique description per page.                                           |
| `duration`                            | Duration (ISO 8601)    | e.g. `PT00H30M5S`.                                                     |
| `contentUrl`                          | URL                    | Direct link to the video file bytes.                                   |
| `embedUrl`                            | URL                    | URL of the video player.                                               |
| `expires`                             | DateTime (ISO 8601)    | When the video becomes unavailable.                                    |
| `creator` / `author`                  | Person or Organization | Video creator/publisher.                                               |
| `interactionStatistic`                | InteractionCounter     | `WatchAction`, `LikeAction`, `CommentAction`, or `ShareAction` counts. |
| `regionsAllowed` / `ineligibleRegion` | Place (ISO 3166-1)     | Allowed vs. disallowed regions (use one).                              |
| `hasPart`                             | Clip                   | Key-moment segments — see below.                                       |
| `publication`                         | BroadcastEvent         | Livestream info — see below (required for the LIVE badge).             |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How to Repot a Succulent",
  "thumbnailUrl": ["https://example.com/videos/succulent-thumb.jpg"],
  "uploadDate": "2025-03-10T09:00:00-08:00"
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How to Repot a Succulent",
  "description": "A step-by-step guide to repotting a succulent without damaging its roots.",
  "thumbnailUrl": ["https://example.com/videos/succulent-thumb.jpg"],
  "uploadDate": "2025-03-10T09:00:00-08:00",
  "duration": "PT00H04M32S",
  "contentUrl": "https://example.com/videos/succulent-repot.mp4",
  "embedUrl": "https://example.com/embed/succulent-repot",
  "expires": "2027-03-10T09:00:00-08:00",
  "creator": {
    "@type": "Organization",
    "name": "Garden Basics"
  },
  "interactionStatistic": [
    {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 54210
    }
  ],
  "regionsAllowed": [
    { "@type": "Country", "name": "US" },
    { "@type": "Country", "name": "CA" }
  ]
}
```

### `BroadcastEvent` (nested in `publication`; required only for the LIVE badge)

#### Required properties

| Property          | Type                | Description                                               |
| ----------------- | ------------------- | --------------------------------------------------------- |
| `isLiveBroadcast` | Boolean             | Whether the video is/was/will be live.                    |
| `startDate`       | DateTime (ISO 8601) | Stream start (past/present = actual, future = scheduled). |
| `endDate`         | DateTime (ISO 8601) | Required once ended (approximate if needed).              |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "BroadcastEvent",
  "isLiveBroadcast": true,
  "startDate": "2026-01-15T18:00:00-05:00",
  "endDate": "2026-01-15T19:30:00-05:00"
}
```

**Example — with recommended properties:**

_No recommended properties documented — see required example above._

### `Clip` (nested in `hasPart`; required only for custom key moments)

#### Required properties

| Property      | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| `name`        | Text   | Clip title.                          |
| `url`         | URL    | Clip start-time URL (e.g. `?t=120`). |
| `startOffset` | Number | Start time in seconds.               |

#### Recommended properties

| Property    | Type   | Description          |
| ----------- | ------ | -------------------- |
| `endOffset` | Number | End time in seconds. |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "Clip",
  "name": "Adding the Soil",
  "url": "https://example.com/videos/succulent-repot?t=120",
  "startOffset": 120
}
```

**Example — with recommended properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Clip",
  "name": "Adding the Soil",
  "url": "https://example.com/videos/succulent-repot?t=120",
  "startOffset": 120,
  "endOffset": 180
}
```

### `SeekToAction` (nested in `potentialAction`; required only for automatic key-moment linking)

#### Required properties

| Property            | Type       | Description                                                  |
| ------------------- | ---------- | ------------------------------------------------------------ |
| `target`            | EntryPoint | Watch-page URL with a `{seek_to_second_number}` placeholder. |
| `startOffset-input` | Text       | Fixed value: `required name=seek_to_second_number`.          |

**Example — required properties only:**

```json
{
  "@context": "https://schema.org",
  "@type": "SeekToAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://example.com/videos/succulent-repot?t={seek_to_second_number}"
  },
  "startOffset-input": "required name=seek_to_second_number"
}
```

**Example — with recommended properties:**

_No recommended properties documented — see required example above._
