import Paragraph from "@/components/typography/paragraph";
import { Link2Icon } from "@radix-ui/react-icons";
export default function Page() {
  return (
    <div className="flex items-left mt-16 justify-start">
      <div className="p-4 rounded-lg gap-4">
        <h1 className='text-4xl font-extralight mb-4 max-w-[50ch]'>Hi, I&apos;m Driek</h1>

        <Paragraph ctaText="Find me on the socials" ctaLink="/about/get-in-touch"
          hoverContents={[
            <>
              <a href="https://thirty-five.com" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-black-1000 dark:text-brand-white-100 flex items-center">
                <Link2Icon className='w-4 h-4 mr-1' /> thirty-five.com
              </a>
            </>,
            <>
              <a href="https://www.zuyd.nl/opleidingen/communication-and-multimedia-design" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-black-1000 dark:text-brand-white-100 flex items-center">
                <Link2Icon className='w-4 h-4 mr-1' /> zuyd.nl
              </a>
            </>,
            <>
              <p className="text-sm text-brand-black-1000 dark:text-brand-white-100">
                Wow, isn&apos;t that this website?
              </p>
            </>,
            <>
              <p className="text-sm text-brand-black-1000 dark:text-brand-white-100">
                My total end goal in life.
              </p>
            </>,
          ]}
        >
          Let me introduce myself before you click away.
          I&apos;m Driek van der Meuen, a 22-year-old software engineer at @35 and a @CMD student at Zuyd Hogeschool.
          On top of that, I also run @driekdev, where I juggle being the CEO, Senior Developer, and—most importantly—the coffee intern.
          At Driek.dev, I turn passion projects into reality, hoping that maybe, just maybe, someone downloads my app and gets me one step closer to buying a #LegoDeathStar.
        </Paragraph>
        <h2 className="text-2xl font-extralight mb-4 max-w-[50ch]">
          Some things about me
        </h2>
        <Paragraph
          ctaText="Read more about me"
          ctaLink="/about/who-am-i"
          hoverContents={[
            <>
              <p className="text-sm text-brand-black-1000 dark:text-brand-white-100">
                9.84%
              </p>
            </>,
          ]}
        >
          So you want to know more about me, Well I&apos;d love to share more about myself here, but then my About page would be kind of pointless.
          If you&apos;re curious about me, definitely check out what its all about, it&apos;s a thrilling read (I promise!).
          Also, fun challenge: guess how many times I used the word &quot;about&quot; in this paragraph. #SEOspecialist
        </Paragraph>

        <Paragraph
          ctaText="Read more about what I do"
          ctaLink="/about/what-do-i-do"
          hoverContents={[
            <>
              <p className="text-sm text-brand-black-1000 dark:text-brand-white-100">
                #usecache
              </p>
            </>,
          ]}
        >
          So, what does a software engineer actually do?
          Well, it&apos;s a fancy way of saying I build websites and apps.
          Programmers love flexing, so instead of saying we just write code, we prefer &quot;software engineer.&quot;
          My weapon of choice? TypeScript, React, and, 99% of the time, #NextJS.
          I build software to make my life easier—because why spend 10 minutes doing something manually when I can spend 10 hours failing to automate it?
        </Paragraph>
        <h2 className="text-2xl font-extralight mb-4 max-w-[50ch]">
          My portfolio
        </h2>
        <Paragraph ctaText="Check out my portfolio" ctaLink="/about/portfolio"
          hoverContents={[
            <>
              <p className="text-sm text-brand-black-1000 dark:text-brand-white-100">
                Sign up now at driek academy for just 39.99 per month
              </p>
            </>,
            <>
              <a href="https://thirty-five.com" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-black-1000 dark:text-brand-white-100 flex items-center">
                <Link2Icon className='w-4 h-4 mr-1' /> thirty-five.com
              </a>
            </>,
            <>
              <a href="https://www.zuyd.nl/opleidingen/communication-and-multimedia-design" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-black-1000 dark:text-brand-white-100 flex items-center">
                <Link2Icon className='w-4 h-4 mr-1' /> zuyd.nl
              </a>
            </>,
            <>
              <p className="text-sm text-brand-black-1000 dark:text-brand-white-100">
                #driexperience for the win
              </p>
            </>,
          ]}>
          So, Mister &quot;Software Engineer,&quot; what have you actually built?
          Glad you asked! My portfolio is filled with projects—some great, some experimental, and some... let&apos;s just say they had their moment. #WinningMindset
          My projects fall into three categories: @35 related, @CMD related, and my own creations.
          If you want the full #DriekExperience, check out at least one from each category.
        </Paragraph>
        <h2 className="text-2xl font-extralight mb-4 max-w-[50ch]">
          My lab
        </h2>
        <Paragraph ctaText="Open Pandora&apos;s Box" ctaLink="/lab"
          hoverContents={[
            <>
              <p className="text-sm text-brand-black-1000 dark:text-brand-white-100">
                Channel yout inner Kisuke Urahara
              </p>
            </>,
          ]}>
          Ever wondered what happens when I experiment with wild ideas? Enter my #Lab.
          Here, I play around with new concepts, and while the final product isn&apos;t always the focus, the journey sure is.
          Think of it like a road trip—it&apos;s not about the destination but the friends (or bugs) we discover along the way.
          Are you ready to step into the lab?
        </Paragraph>
      </div>
    </div>
  )
}