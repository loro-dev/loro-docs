import classes from "./Features.module.css";
import FollowOnGitHub from "./FollowOnGitHub";

export default function Features() {
  return (
    <section className="w-full px-5 md:px-15 pt-4 pb-20 md:pt-15 md:pb-15 relative z-10">
      <FollowOnGitHub className="visible md:hidden mb-10 mt-8" />
      <main className="flex flex-col space-y-5 gap-0 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-5 xl:grid-cols-4 xl:grid-rows-1">
        <article className={classes.Card}>
          <h3 className="text-base md:text-xl font-extrabold bg-blue-green bg-clip-text text-fill text-fill-transparent md:w-auto">
            High Performance
          </h3>
          <p className="h-auto md:min-h-18 text-white/60 text-base font-medium leading-normal">
            Optimized for memory, CPU, and loading speed with advanced
            performance primitives.
          </p>
        </article>
        <article className={classes.Card}>
          <h3 className="text-base md:text-xl font-extrabold bg-blue-green bg-clip-text text-fill text-fill-transparent md:w-auto">
            Rich CRDT Types Support
          </h3>
          <p className="h-auto md:min-h-18 text-white/60 text-base font-medium leading-normal">
            Turn JSON-like data into collaborative types effortlessly
          </p>
        </article>
        <article className={classes.Card}>
          <h3 className="text-base md:text-xl font-extrabold bg-blue-green bg-clip-text text-fill text-fill-transparent d:w-auto">
            Real-Time Collaboration with Version Control
          </h3>
          <p className="h-auto md:min-h-18 text-white/60 text-base font-medium leading-normal">
            Preserve full version history like Git, even during real-time
            collaboration
          </p>
        </article>
        <article className={classes.Card}>
          <h3 className="text-base md:text-xl font-extrabold bg-blue-green bg-clip-text text-fill text-fill-transparent md:w-auto">
            Simple and Intuitive API
          </h3>
          <p className="h-auto md:min-h-18 text-white/60 text-base font-medium leading-normal">
            Designed with developer experience in mind
          </p>
        </article>
      </main>
    </section>
  );
}
