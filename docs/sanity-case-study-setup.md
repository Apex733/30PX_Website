# Sanity Setup For Consistent Case Studies

This project already has the core idea you need:

- One shared case study renderer in [src/components/CaseStudyTemplate.tsx](../src/components/CaseStudyTemplate.tsx)
- One modal that loads the same page route with `?modal=true` in [src/components/ui/story-modal.tsx](../src/components/ui/story-modal.tsx)

That means the best Sanity setup for this repo is:

1. Store every case study in one Sanity document type.
2. Map that document into one frontend shape.
3. Render every case study with `CaseStudyTemplate`.
4. Let the modal keep using the same route, so page and modal always stay aligned.

## Why the current setup is inconsistent

The pages already using the shared template are consistent because they follow the same `CaseStudyData` shape.

Examples:

- [src/pages/MondlySaasProject.tsx](../src/pages/MondlySaasProject.tsx)
- [src/pages/DesoraPortfolio.tsx](../src/pages/DesoraPortfolio.tsx)

The pages that still bypass the shared template are the ones most likely to drift:

- [src/pages/FizzBlissProject.tsx](../src/pages/FizzBlissProject.tsx)
- [src/pages/GigiLaurentProject.tsx](../src/pages/GigiLaurentProject.tsx)

So the main rule is simple:

`Sanity document -> shared mapper -> CaseStudyTemplate -> page + modal`

## Recommended project structure

Keep the frontend and Studio separate inside the same repo:

```text
30PX/
  Website/          # current React/Vite site
  SanityStudio/     # new Sanity Studio project
```

Why this is cleaner:

- no route conflicts with your existing React app
- easier deployment
- easier environment management
- your website stays focused on rendering only

Use the official Sanity installer to create the Studio:

- `npm create sanity@latest`

Official docs:

- https://www.sanity.io/docs/studio/installation
- https://www.sanity.io/docs/apis-and-sdks/js-client-getting-started
- https://www.sanity.io/docs/schema-types

## The exact content model to use

Match Sanity to the shape already expected by `CaseStudyTemplate`.

### Case study document

Suggested fields:

- `title`
- `slug`
- `seoTitle`
- `seoDescription`
- `seoImage`
- `heroImage`
- `projectName`
- `description`
- `deliverables[]`
- `problem`
- `solution`
- `result`
- `stats[]`
- `visualsTitle`
- `visualsDescription`
- `theme`
- `gallery[]`
- `featured`
- `featuredRank`
- `relatedProjects[]`

### Gallery item object

Each gallery item should use one shared object shape:

- `type`: `image` or `video`
- `image`
- `video`
- `poster`
- `description`
- `aspectRatio`
- `objectFit`

Use these allowed aspect ratios so the frontend can keep layout rules stable:

- `21:9`
- `16:9`
- `4:3`
- `wide`
- `1:1`
- `4:5`
- `2:3`
- `9:16`
- `portrait`

## Very important rule for consistency

Do not store Tailwind classes in Sanity.

Right now the template accepts values like `accentClass`, `cardClass`, and `bgClass`, but CMS editors should not manage raw CSS classes. In Sanity, store only a semantic theme value such as:

- `violet`
- `rose`
- `teal`
- `cyan`
- `orange`

Then map that theme to your Tailwind classes in code.

That keeps:

- alignment consistent
- colors controlled
- editors away from design-breaking values

## Suggested Sanity schema

```ts
// schemas/caseStudy.ts
import {defineArrayMember, defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero'},
    {name: 'content', title: 'Content'},
    {name: 'gallery', title: 'Gallery'},
    {name: 'related', title: 'Related'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      options: {hotspot: true},
      group: 'seo',
    }),
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      group: 'hero',
      description: 'Use only landscape/wide media here.',
    }),
    defineField({
      name: 'description',
      title: 'Intro Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(3).max(8),
      group: 'content',
    }),
    defineField({
      name: 'problem',
      title: 'The Problem',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'result',
      title: 'The Result',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      validation: (rule) => rule.required().length(3),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'visualsTitle',
      title: 'Visuals Title',
      type: 'string',
      initialValue: 'Project Visuals',
      group: 'gallery',
    }),
    defineField({
      name: 'visualsDescription',
      title: 'Visuals Description',
      type: 'text',
      rows: 2,
      initialValue: 'A closer look at the work delivered.',
      group: 'gallery',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      group: 'gallery',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.type !== 'image',
            }),
            defineField({
              name: 'video',
              title: 'Video File',
              type: 'file',
              hidden: ({parent}) => parent?.type !== 'video',
            }),
            defineField({
              name: 'poster',
              title: 'Video Poster',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.type !== 'video',
            }),
            defineField({
              name: 'description',
              title: 'Caption',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: ['21:9', '16:9', '4:3', 'wide', '1:1', '4:5', '2:3', '9:16', 'portrait'],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'objectFit',
              title: 'Object Fit',
              type: 'string',
              options: {
                list: ['cover', 'contain'],
                layout: 'radio',
              },
              initialValue: 'cover',
            }),
          ],
          preview: {
            select: {
              title: 'description',
              media: 'image',
              type: 'type',
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.type,
                media: selection.media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'settings',
      options: {
        list: ['violet', 'rose', 'teal', 'cyan', 'orange'],
        layout: 'radio',
      },
      initialValue: 'violet',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Show in listings',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'featuredRank',
      title: 'Featured order',
      type: 'number',
      group: 'settings',
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      group: 'related',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'caseStudy'}],
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
  ],
})
```

## Frontend data contract

Keep one frontend type only.

Your existing source of truth is [src/components/CaseStudyTemplate.tsx](../src/components/CaseStudyTemplate.tsx).

That means the mapper should return this shape:

```ts
type CaseStudyData = {
  seoTitle: string
  seoDescription: string
  seoImage: string
  heroImage: string
  projectName: string
  description: string
  deliverables: string[]
  theProblem: string
  ourSolution: string
  clientGain: string
  stats: Array<{ value: string; label: string }>
  images: Array<{
    type?: 'image' | 'video'
    src: string
    poster?: string
    description: string
    aspectRatio?: '21:9' | '16:9' | '4:3' | 'wide' | '1:1' | '4:5' | '2:3' | '9:16' | 'portrait'
    objectFit?: 'cover' | 'contain'
  }>
  moreProjects: Array<{
    name: string
    description: string
    image: string
    href: string
    bgClass: string
  }>
  visualsTitle?: string
  visualsDescription?: string
  accent?: string
  accentClass?: string
  cardClass?: string
  statShadowClass?: string
}
```

## Theme mapping in code

Use a fixed map in the website, not in the CMS:

```ts
const CASE_STUDY_THEMES = {
  violet: {
    accent: '#7C3AED',
    accentClass: 'border-violet-500/30',
    cardClass: 'bg-violet-500/10 border-violet-500/20',
    statShadowClass: 'shadow-violet-500/20',
    bgClass: 'bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-950 dark:to-violet-900',
  },
  rose: {
    accent: '#E11D48',
    accentClass: 'border-rose-500/30',
    cardClass: 'bg-rose-500/10 border-rose-500/20',
    statShadowClass: 'shadow-rose-500/20',
    bgClass: 'bg-gradient-to-br from-rose-100 to-cyan-100 dark:from-rose-950 dark:to-cyan-950',
  },
  teal: {
    accent: '#0F766E',
    accentClass: 'border-teal-700/30',
    cardClass: 'bg-teal-700/10 border-teal-700/20',
    statShadowClass: 'shadow-teal-700/20',
    bgClass: 'bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-950 dark:to-emerald-950',
  },
} as const
```

## Suggested website integration

Install the website-side packages in `Website`:

- `@sanity/client`
- `@sanity/image-url`

Create:

- `src/lib/sanity.ts`
- `src/lib/sanity-image.ts`
- `src/lib/case-study-theme.ts`
- `src/lib/map-case-study.ts`

Environment variables:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-04-19
```

Example client:

```ts
import {createClient} from '@sanity/client'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
})
```

## Suggested GROQ query

```ts
export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    "seoImage": seoImage.asset->url,
    "heroImage": heroImage.asset->url,
    projectName,
    description,
    deliverables,
    "theProblem": problem,
    "ourSolution": solution,
    "clientGain": result,
    stats[]{
      value,
      label
    },
    visualsTitle,
    visualsDescription,
    theme,
    gallery[]{
      type,
      description,
      aspectRatio,
      objectFit,
      "src": select(type == "video" => video.asset->url, image.asset->url),
      "poster": poster.asset->url
    },
    relatedProjects[]->{
      title,
      description,
      "slug": slug.current,
      theme,
      "image": heroImage.asset->url
    }
  }
`
```

## The mapper layer

This is the key step.

Do not pass raw Sanity data directly into the page.

Always map it:

`Sanity document -> mapCaseStudy() -> CaseStudyTemplate`

That mapper should:

- rename `problem` to `theProblem`
- rename `solution` to `ourSolution`
- rename `result` to `clientGain`
- convert `theme` into frontend classes
- convert `relatedProjects` into `moreProjects`
- normalize image/video URLs

## How the modal stays aligned automatically

Your modal in [src/components/ui/story-modal.tsx](../src/components/ui/story-modal.tsx) loads the same route inside an iframe.

Your cards in [src/sections/LatestWork.tsx](../src/sections/LatestWork.tsx) open:

- full page: `/portfolio/my-slug`
- modal: `/portfolio/my-slug?modal=true`

So if both page and modal use the same route component and that route renders `CaseStudyTemplate`, the modal cannot drift from the page layout.

That is the biggest advantage of this setup.

## Best route strategy

Move toward one dynamic route instead of one file per case study.

Ideal end state:

- `/portfolio/:slug`

That route:

1. reads the slug from the URL
2. fetches the Sanity document
3. maps it into `CaseStudyData`
4. renders `CaseStudyTemplate`

This removes page duplication completely.

## What to do with Fizz Bliss and GIGI Laurent

To make every case study look the same, migrate these first:

- [src/pages/FizzBlissProject.tsx](../src/pages/FizzBlissProject.tsx)
- [src/pages/GigiLaurentProject.tsx](../src/pages/GigiLaurentProject.tsx)

Right now they each define their own shape and markup.

For full consistency, they should also end up as:

- one Sanity document
- one mapped `CaseStudyData`
- one `CaseStudyTemplate`

If you want every case study identical, avoid custom page sections per project.

## If you need more flexibility later

If eventually you want projects like GIGI Laurent to have multiple visual sections while still staying consistent, upgrade the template once, not per page.

Example future shape:

```ts
sections: Array<{
  title: string
  description?: string
  items: MediaItem[]
}>
```

Then every case study still uses one renderer, but with repeatable sections.

That is better than custom React files for each project.

## Recommended migration order

1. Create the Sanity Studio.
2. Add one `caseStudy` schema.
3. Add website-side Sanity client files.
4. Build one mapper from Sanity data to `CaseStudyData`.
5. Make one dynamic route for `/portfolio/:slug`.
6. Migrate one simple project first, like Fizz Bliss.
7. Then migrate the rest.
8. Replace hardcoded arrays in listing sections with Sanity queries.

## Final rule

If content consistency is the goal, never let editors choose layout.

Editors should only choose:

- text
- images
- videos
- aspect ratio
- theme
- order
- related projects

The website should choose:

- spacing
- alignment
- grid logic
- card styles
- modal behavior
- responsive layout

That separation is what keeps every case study looking the same.
