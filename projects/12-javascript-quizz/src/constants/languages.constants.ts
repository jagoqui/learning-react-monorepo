import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';
import { JavaScriptLogo } from '../components/logos/JavaScritLogo';
import { HtmlLogo } from '../components/logos/HtmlLogo';
import { CssLogo } from '../components/logos/CssLogo';
import { ReactLogo } from '../components/logos/ReactLogo';
import { AngularLogo } from '../components/logos/AngularLogo';
import { VueLogo } from '../components/logos/VueLogo';
import { TypeScriptLogo } from '../components/logos/TypeScriptLogo';
import { SvelteLogo } from '../components/logos/SvelteLogo';
import { AstroLogo } from '../components/logos/AstroLogo';
import { SolidLogo } from '../components/logos/SolidLogo';
import { QwikLogo } from '../components/logos/QwikLogo';
import { NextjsLogo } from '../components/logos/NextjsLogo';

type Language = {
  id: number;
  name: string;
  fileName: string;
  language: typeof language;
  svg: () => JSX.Element;
};

export const LANGUAGES: Language[] = [
  {
    id: 1,
    name: 'JavaScript',
    language: 'javascript',
    fileName: 'javascript',
    svg: JavaScriptLogo,
  },
  {
    id: 2,
    name: 'HTML',
    language: 'html',
    fileName: 'html',
    svg: HtmlLogo,
  },
  {
    id: 3,
    name: 'CSS',
    language: 'css',
    fileName: 'css',
    svg: CssLogo,
  },
  {
    id: 4,
    name: 'React',
    language: 'jsx',
    fileName: 'react',
    svg: ReactLogo,
  },
  {
    id: 5,
    name: 'TypeScript',
    language: 'typescript',
    fileName: 'typescript',
    svg: TypeScriptLogo,
  },
  {
    id: 6,
    name: 'Angular',
    language: 'typescript',
    fileName: 'angular',
    svg: AngularLogo,
  },
  {
    id: 7,
    name: 'Vue',
    language: 'vue',
    fileName: 'vue',
    svg: VueLogo,
  },
  {
    id: 8,
    name: 'Svelte',
    language: 'javascript',
    fileName: 'svelte',
    svg: SvelteLogo,
  },
  {
    id: 9,
    name: 'Solid',
    language: 'javascript',
    fileName: 'solid',
    svg: SolidLogo,
  },
  {
    id: 10,
    name: 'Astro',
    language: 'javascript',
    fileName: 'astro',
    svg: AstroLogo,
  },
  {
    id: 11,
    name: 'Qwik',
    language: 'javascript',
    fileName: 'qwik',
    svg: QwikLogo,
  },
  {
    id: 12,
    name: 'Nextjs',
    language: 'javascript',
    fileName: 'nextjs',
    svg: NextjsLogo,
  },
];
