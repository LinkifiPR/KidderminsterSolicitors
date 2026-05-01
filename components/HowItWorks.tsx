import { MessageSquareText, Send, UserRoundCheck } from "lucide-react";

const steps = [
  {
    title: "Tell us what legal help you need",
    text: "Share a few details about your enquiry, including the area of law, your postcode, and the best way to contact you.",
    icon: MessageSquareText,
  },
  {
    title: "We review your enquiry",
    text: "We check the details and match your enquiry with a suitable solicitor partner where appropriate.",
    icon: Send,
  },
  {
    title: "A solicitor partner contacts you",
    text: "The solicitor firm or legal service provider can contact you. You are under no obligation to instruct them.",
    icon: UserRoundCheck,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[var(--cream)] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-[var(--gold)]">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
            A clear quote process, without pressure.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--gold)]">
                    0{index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--navy)] text-[var(--gold)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--navy)]">
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
