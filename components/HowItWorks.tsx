import { MessageSquareText, Send, UserRoundCheck } from "lucide-react";

const steps = [
  {
    title: "Tell us what legal help you need",
    text: "Share a few details about your enquiry and preferred contact method.",
    icon: MessageSquareText,
  },
  {
    title: "We review your enquiry",
    text: "We assess the details and may match your enquiry with a suitable solicitor partner.",
    icon: Send,
  },
  {
    title: "A solicitor may contact you",
    text: "A solicitor firm or legal service provider may contact you directly. You are under no obligation to instruct them.",
    icon: UserRoundCheck,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[var(--cream)] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase text-[var(--mid-blue)]">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--navy)]">
            A clear quote process, without pressure.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="rounded-[1.6rem] border border-[var(--line)] bg-white p-7 shadow-[0_18px_55px_rgba(7,24,39,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(7,24,39,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[var(--pale-blue)] px-3 py-1 text-sm font-extrabold text-[var(--mid-blue)]">
                    0{index + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--navy)] text-[var(--gold)] shadow-[0_12px_26px_rgba(7,24,39,0.18)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-extrabold text-[var(--navy)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {step.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
