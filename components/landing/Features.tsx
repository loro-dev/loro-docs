import classes from "./Features.module.css";
import FollowOnGitHub from "./FollowOnGitHub";
import { useHomeTranslations } from "@/lib/useHomeTranslations";

export default function Features() {
  const { features } = useHomeTranslations();

  return (
    <section className="w-full px-5 md:px-15 pt-4 pb-20 md:pt-15 md:pb-15 relative z-10">
      <FollowOnGitHub className="visible md:hidden mb-10 mt-8" />
      <p className="text-center text-neutral-400 mb-8">{features.intro}</p>
      <main className="flex flex-col space-y-5 gap-0 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-5 xl:grid-cols-4 xl:grid-rows-1">
        {features.items.map((item) => (
          <article key={item.title} className={classes.Card}>
            <h3 className="text-base md:text-xl font-extrabold bg-blue-green bg-clip-text text-fill text-fill-transparent md:w-auto">
              {item.title}
            </h3>
            <p className="h-auto md:min-h-18 text-white/60 text-base font-medium leading-normal">
              {item.description}
            </p>
          </article>
        ))}
      </main>
    </section>
  );
}
